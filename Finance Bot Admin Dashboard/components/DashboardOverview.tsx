import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TimeDisplay } from './TimeDisplay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Timer,
  Target,
  Zap,
  Brain,
  Filter,
  RefreshCw,
  Eye,
  Search
} from 'lucide-react';

interface DashboardOverviewProps {
  useIST: boolean;
  userRole: string;
}

const mockMetrics = {
  totalUsers: 25840,
  totalQueries: 1560340,
  totalDocuments: 4250,
  activeConversations: 1842,
  totalRevenue: 8934500,
  avgResponseTime: 1.2,
  accuracyRate: 94.7,
  userSatisfaction: 4.3,
  uptime: 99.97
};

const responseTimeData = [
  { date: '2024-01-01', avgTime: 1.1, p95Time: 2.3, p99Time: 4.1 },
  { date: '2024-01-02', avgTime: 1.3, p95Time: 2.6, p99Time: 4.5 },
  { date: '2024-01-03', avgTime: 1.0, p95Time: 2.1, p99Time: 3.8 },
  { date: '2024-01-04', avgTime: 1.4, p95Time: 2.8, p99Time: 4.9 },
  { date: '2024-01-05', avgTime: 1.2, p95Time: 2.4, p99Time: 4.2 },
  { date: '2024-01-06', avgTime: 1.1, p95Time: 2.2, p99Time: 3.9 },
  { date: '2024-01-07', avgTime: 1.2, p95Time: 2.5, p99Time: 4.3 }
];

const accuracyData = [
  { date: '2024-01-01', accuracy: 94.2, thumbsUp: 1420, thumbsDown: 87, total: 1507 },
  { date: '2024-01-02', accuracy: 93.8, thumbsUp: 1380, thumbsDown: 91, total: 1471 },
  { date: '2024-01-03', accuracy: 95.1, thumbsUp: 1520, thumbsDown: 78, total: 1598 },
  { date: '2024-01-04', accuracy: 94.5, thumbsUp: 1450, thumbsDown: 84, total: 1534 },
  { date: '2024-01-05', accuracy: 94.9, thumbsUp: 1480, thumbsDown: 80, total: 1560 },
  { date: '2024-01-06', accuracy: 93.6, thumbsUp: 1390, thumbsDown: 95, total: 1485 },
  { date: '2024-01-07', accuracy: 94.7, thumbsUp: 1470, thumbsDown: 82, total: 1552 }
];

const errorLogs = [
  {
    id: 'ERR-001',
    timestamp: '2024-01-07T14:30:00Z',
    query: 'What is the ROI for Q3 2023?',
    error: 'Document parsing failed',
    severity: 'High',
    status: 'Unresolved',
    userId: 'USR-1234',
    documentId: 'DOC-567'
  },
  {
    id: 'ERR-002',
    timestamp: '2024-01-07T14:25:00Z',
    query: 'Show me cash flow statement',
    error: 'Timeout - document too large',
    severity: 'Medium',
    status: 'Retry Available',
    userId: 'USR-2345',
    documentId: 'DOC-890'
  },
  {
    id: 'ERR-003',
    timestamp: '2024-01-07T14:20:00Z',
    query: 'Calculate debt-to-equity ratio',
    error: 'Ambiguous query - multiple interpretations',
    severity: 'Low',
    status: 'Flagged for Review',
    userId: 'USR-3456',
    documentId: 'DOC-123'
  }
];

const feedbackSummary = {
  totalFeedback: 15234,
  positiveRating: 14442,
  negativeRating: 792,
  averageRating: 4.3,
  topIssues: [
    { issue: 'Incomplete information', count: 245 },
    { issue: 'Wrong document reference', count: 187 },
    { issue: 'Slow response time', count: 156 },
    { issue: 'Unclear explanation', count: 134 },
    { issue: 'Missing calculations', count: 98 }
  ]
};

const queryCategories = [
  { name: 'Financial Analysis', value: 35, color: '#8b5cf6' },
  { name: 'Document Search', value: 28, color: '#06b6d4' },
  { name: 'Calculations', value: 20, color: '#10b981' },
  { name: 'Comparisons', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 5, color: '#ef4444' }
];

export function DashboardOverview({ useIST, userRole }: DashboardOverviewProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [errorFilter, setErrorFilter] = useState('all');
  const [selectedErrorLog, setSelectedErrorLog] = useState(null);

  const getChangeIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const isPositive = change > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const color = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-3 w-3" />
        <span className="text-xs font-medium">{Math.abs(change).toFixed(1)}%</span>
      </div>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      High: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
      Low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
    };
    
    return (
      <Badge variant="outline" className={colors[severity] || colors.Low}>
        {severity}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Unresolved': { className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800', icon: XCircle },
      'Retry Available': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800', icon: RefreshCw },
      'Flagged for Review': { className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800', icon: AlertTriangle },
      'Resolved': { className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800', icon: CheckCircle }
    };
    
    const config = variants[status] || variants['Unresolved'];
    const Icon = config.icon;
    
    return (
      <Badge variant="outline" className={`${config.className} flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const filteredErrorLogs = errorLogs.filter(log => {
    if (errorFilter === 'all') return true;
    return log.severity.toLowerCase() === errorFilter;
  });

  return (
    <div className="space-y-6 max-w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-foreground">{mockMetrics.totalUsers.toLocaleString()}</p>
                    {getChangeIndicator(mockMetrics.totalUsers, 24650)}
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Queries</p>
                    <p className="text-2xl font-bold text-foreground">{(mockMetrics.totalQueries / 1000000).toFixed(1)}M</p>
                    {getChangeIndicator(mockMetrics.totalQueries, 1456890)}
                  </div>
                  <MessageSquare className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold text-foreground">{mockMetrics.avgResponseTime}s</p>
                    {getChangeIndicator(1.2, 1.45)}
                  </div>
                  <Timer className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Accuracy Rate</p>
                    <p className="text-2xl font-bold text-foreground">{mockMetrics.accuracyRate}%</p>
                    {getChangeIndicator(94.7, 93.2)}
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-muted-foreground">User Satisfaction</p>
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-xl font-bold text-foreground">{mockMetrics.userSatisfaction}/5.0</p>
                <Progress value={(mockMetrics.userSatisfaction / 5) * 100} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-xl font-bold text-foreground">{mockMetrics.uptime}%</p>
                <Progress value={mockMetrics.uptime} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="text-xl font-bold text-foreground">{mockMetrics.activeConversations.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Currently online</p>
              </CardContent>
            </Card>
          </div>

          {/* Query Categories Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Query Categories</CardTitle>
              <CardDescription>Distribution of query types over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={queryCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {queryCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Recent Errors
                </CardTitle>
                <CardDescription>Latest system errors requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {errorLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{log.query}</p>
                        <p className="text-xs text-muted-foreground">{log.error}</p>
                        <p className="text-xs text-muted-foreground">
                          <TimeDisplay timestamp={log.timestamp} useIST={useIST} format="relative" />
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        {getSeverityBadge(log.severity)}
                        {getStatusBadge(log.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI Insights
                </CardTitle>
                <CardDescription>System performance insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      ✓ Response time improved by 12% this week
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      ℹ Peak usage: 2-4 PM IST (Financial Analysis queries)
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      ⚠ Document parsing errors increased by 8%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time Metrics */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Response Time Analytics</CardTitle>
                    <CardDescription>Average, P95, and P99 response times</CardDescription>
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24h</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }}
                      className="text-muted-foreground"
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value}s`, name === 'avgTime' ? 'Average' : name === 'p95Time' ? 'P95' : 'P99']}
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                    />
                    <Line type="monotone" dataKey="avgTime" stroke="#8b5cf6" strokeWidth={2} name="Average" />
                    <Line type="monotone" dataKey="p95Time" stroke="#06b6d4" strokeWidth={2} name="P95" />
                    <Line type="monotone" dataKey="p99Time" stroke="#ef4444" strokeWidth={2} name="P99" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Accuracy Metrics */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Accuracy & Feedback Trends</CardTitle>
                <CardDescription>User feedback and accuracy metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      yAxisId="accuracy" 
                      domain={[90, 100]} 
                      label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft' }}
                      className="text-muted-foreground"
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'accuracy' ? `${value}%` : value,
                        name === 'accuracy' ? 'Accuracy' : name === 'thumbsUp' ? 'Thumbs Up' : 'Thumbs Down'
                      ]}
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                    />
                    <Area yAxisId="accuracy" type="monotone" dataKey="accuracy" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Error & Failed Query Logs
                  </CardTitle>
                  <CardDescription>Monitor and resolve system errors</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={errorFilter} onValueChange={setErrorFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredErrorLogs.map((log) => (
                  <div key={log.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors bg-background">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{log.id}</Badge>
                          {getSeverityBadge(log.severity)}
                          {getStatusBadge(log.status)}
                        </div>
                        <p className="font-medium mb-1 text-foreground">{log.query}</p>
                        <p className="text-sm text-red-600 dark:text-red-400 mb-2">{log.error}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>User: {log.userId}</span>
                          <span>Document: {log.documentId}</span>
                          <span>
                            <TimeDisplay timestamp={log.timestamp} useIST={useIST} format="relative" />
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {log.status === 'Retry Available' && (
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Retry
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setSelectedErrorLog(log)}>
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <ThumbsUp className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{feedbackSummary.positiveRating.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Positive Feedback</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <ThumbsDown className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{feedbackSummary.negativeRating.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Negative Feedback</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{feedbackSummary.averageRating}/5.0</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Top Issues Requiring Attention</CardTitle>
              <CardDescription>Most common problems reported by users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feedbackSummary.topIssues.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
                    <div>
                      <p className="font-medium text-foreground">{issue.issue}</p>
                      <p className="text-sm text-muted-foreground">{issue.count} reports</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={(issue.count / feedbackSummary.topIssues[0].count) * 100} className="w-24" />
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}