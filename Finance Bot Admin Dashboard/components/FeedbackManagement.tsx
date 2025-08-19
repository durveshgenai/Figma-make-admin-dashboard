import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Flag,
  Target,
  BarChart3
} from 'lucide-react';
import { ComponentProps } from '../lib/types';
import { FEEDBACK_DATA, FEEDBACK_TRENDS, CATEGORY_INSIGHTS, IMPROVEMENT_SUGGESTIONS } from './feedback/constants';

export function FeedbackManagement({ useIST, userRole }: ComponentProps) {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  const getRatingBadge = (rating: string) => {
    const variants = {
      'positive': { className: 'bg-green-100 text-green-800 border-green-200', icon: ThumbsUp },
      'negative': { className: 'bg-red-100 text-red-800 border-red-200', icon: ThumbsDown },
      'neutral': { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: Star }
    };
    
    const config = variants[rating] || variants['neutral'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {rating}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: 'bg-red-100 text-red-800 border-red-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return <Badge className={colors[priority] || colors.Medium}>{priority}</Badge>;
  };

  const columns = [
    { key: 'id', label: 'ID', width: '100px' },
    { key: 'query', label: 'Query', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true, filterable: true, width: '100px' },
    { key: 'category', label: 'Category', sortable: true, filterable: true, width: '150px' },
    { key: 'responseTime', label: 'Time (s)', sortable: true, width: '80px' },
    { key: 'timestamp', label: 'Date', sortable: true, width: '130px' },
    { key: 'flagged', label: 'Flagged', width: '80px' }
  ];

  const enhancedData = FEEDBACK_DATA.map(feedback => ({
    ...feedback,
    query: (
      <div className="max-w-md">
        <p className="truncate font-medium">{feedback.query}</p>
        <p className="text-xs text-muted-foreground truncate">{feedback.comment}</p>
      </div>
    ),
    rating: getRatingBadge(feedback.rating),
    timestamp: <TimeDisplay timestamp={feedback.timestamp} useIST={useIST} format="relative" />,
    flagged: feedback.flagged ? (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        <Flag className="h-3 w-3" />
      </Badge>
    ) : (
      <Badge variant="outline">No</Badge>
    )
  }));

  const filters = [
    {
      key: 'rating',
      label: 'Rating',
      type: 'select' as const,
      options: [
        { value: 'positive', label: 'Positive' },
        { value: 'negative', label: 'Negative' },
        { value: 'neutral', label: 'Neutral' }
      ]
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'Financial Analysis', label: 'Financial Analysis' },
        { value: 'Calculations', label: 'Calculations' },
        { value: 'Data Retrieval', label: 'Data Retrieval' },
        { value: 'Compliance', label: 'Compliance' }
      ]
    }
  ];

  const actions = [
    {
      key: 'view',
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: 'flag',
      label: 'Flag for Review',
      icon: <Flag className="h-4 w-4" />
    }
  ];

  const handleAction = (action: string, feedback: any) => {
    if (action === 'view') {
      setSelectedFeedback(feedback);
    }
  };

  const totalFeedback = FEEDBACK_DATA.length;
  const positiveFeedback = FEEDBACK_DATA.filter(f => f.rating === 'positive').length;
  const negativeFeedback = FEEDBACK_DATA.filter(f => f.rating === 'negative').length;

  if (userRole !== 'SuperAdmin' && userRole !== 'Support') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Access Restricted</h3>
          <p className="text-muted-foreground">Only SuperAdmin and Support roles can access feedback management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <ThumbsUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{positiveFeedback}</p>
                <p className="text-sm text-muted-foreground">Positive Feedback</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ThumbsDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{negativeFeedback}</p>
                <p className="text-sm text-muted-foreground">Negative Feedback</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{Math.round((positiveFeedback / totalFeedback) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Priorities</CardTitle>
              <CardDescription>Areas requiring immediate attention based on user feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {IMPROVEMENT_SUGGESTIONS.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{suggestion.issue}</h4>
                        {getPriorityBadge(suggestion.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{suggestion.frequency} reports</p>
                      <Badge variant="outline" className="text-xs">{suggestion.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <EnhancedTable
            title="User Feedback"
            description="Review and analyze user feedback on bot responses"
            columns={columns}
            data={enhancedData}
            onRowAction={handleAction}
            searchPlaceholder="Search feedback, queries, or comments..."
            filters={filters}
            actions={actions}
          />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Feedback Trends</CardTitle>
                  <CardDescription>User satisfaction trends over time</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={FEEDBACK_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Satisfaction rates by query category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {CATEGORY_INSIGHTS.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">{category.positive}% positive</span>
                    </div>
                    <Progress value={category.positive} className="h-2" />
                    <p className="text-xs text-muted-foreground">{category.total} total queries</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feedback Details Dialog */}
      {selectedFeedback && (
        <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Feedback Details - {selectedFeedback.id}</DialogTitle>
              <DialogDescription>Detailed view of user feedback</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Rating</p>
                  {getRatingBadge(selectedFeedback.rating)}
                </div>
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{selectedFeedback.category}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Original Query</p>
                <div className="bg-muted p-3 rounded text-sm">{selectedFeedback.query}</div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Bot Response</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">{selectedFeedback.botResponse}</div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">User Comment</p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded text-sm">{selectedFeedback.comment}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}