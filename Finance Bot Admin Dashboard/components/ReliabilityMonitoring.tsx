import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { mockAlarms, mockJobs, mockMetrics, heartbeatChecks } from './constants/monitoring-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Database, 
  Server, 
  RefreshCw, 
  Play, 
  Pause, 
  Trash2,
  Eye
} from 'lucide-react';

interface ReliabilityMonitoringProps {
  useIST: boolean;
  userRole: string;
}

export function ReliabilityMonitoring({ useIST, userRole }: ReliabilityMonitoringProps) {
  const [timeRange, setTimeRange] = useState('1h');

  const alarmColumns = [
    { key: 'name', label: 'Alarm Name', sortable: true },
    { key: 'severity', label: 'Severity', sortable: true, filterable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
    { key: 'currentValue', label: 'Current Value', sortable: false, width: '120px' },
    { key: 'threshold', label: 'Threshold', sortable: false, width: '100px' },
    { key: 'duration', label: 'Duration', sortable: false, width: '120px' },
    { key: 'triggeredAt', label: 'Triggered At', sortable: true, width: '150px' }
  ];

  const jobColumns = [
    { key: 'name', label: 'Job Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true, filterable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
    { key: 'queueDepth', label: 'Queue Depth', sortable: true, width: '100px' },
    { key: 'processed', label: 'Processed', sortable: true, width: '100px' },
    { key: 'failed', label: 'Failed', sortable: true, width: '80px' },
    { key: 'lastRun', label: 'Last Run', sortable: true, width: '150px' }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'High': { variant: 'destructive', icon: AlertTriangle },
      'Medium': { variant: 'default', icon: AlertTriangle },
      'Low': { variant: 'secondary', icon: CheckCircle }
    };
    
    const config = variants[severity] || { variant: 'outline', icon: AlertTriangle };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {severity}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Triggered': { variant: 'destructive', icon: XCircle },
      'Warning': { variant: 'default', icon: AlertTriangle },
      'Resolved': { variant: 'secondary', icon: CheckCircle },
      'Running': { variant: 'default', icon: Activity },
      'Paused': { variant: 'secondary', icon: Pause },
      'Failed': { variant: 'destructive', icon: XCircle }
    };
    
    const config = variants[status] || { variant: 'outline', icon: Clock };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getHealthStatus = (status: string) => {
    const variants = {
      'Healthy': { color: 'text-green-600', icon: CheckCircle },
      'Warning': { color: 'text-yellow-600', icon: AlertTriangle },
      'Critical': { color: 'text-red-600', icon: XCircle }
    };
    
    const config = variants[status] || { color: 'text-gray-600', icon: Clock };
    const Icon = config.icon;
    
    return (
      <div className={`flex items-center gap-2 ${config.color}`}>
        <Icon className="h-4 w-4" />
        {status}
      </div>
    );
  };

  const enhancedAlarmData = mockAlarms.map(alarm => ({
    ...alarm,
    severity: getSeverityBadge(alarm.severity),
    status: getStatusBadge(alarm.status),
    triggeredAt: <TimeDisplay timestamp={alarm.triggeredAt} useIST={useIST} format="full" />
  }));

  const enhancedJobData = mockJobs.map(job => ({
    ...job,
    status: getStatusBadge(job.status),
    lastRun: <TimeDisplay timestamp={job.lastRun} useIST={useIST} format="full" />,
    failed: job.failed > 0 ? (
      <Badge variant="destructive">{job.failed}</Badge>
    ) : (
      <Badge variant="secondary">0</Badge>
    )
  }));

  const alarmFilters = [
    {
      key: 'severity',
      label: 'Severity',
      type: 'select' as const,
      options: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Triggered', label: 'Triggered' },
        { value: 'Warning', label: 'Warning' },
        { value: 'Resolved', label: 'Resolved' }
      ]
    }
  ];

  const jobFilters = [
    {
      key: 'type',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: 'Processing', label: 'Processing' },
        { value: 'Notification', label: 'Notification' },
        { value: 'Maintenance', label: 'Maintenance' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Running', label: 'Running' },
        { value: 'Paused', label: 'Paused' },
        { value: 'Failed', label: 'Failed' }
      ]
    }
  ];

  const jobActions = [
    {
      key: 'view',
      label: 'View Logs',
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: 'restart',
      label: 'Restart',
      icon: <RefreshCw className="h-4 w-4" />
    },
    {
      key: 'pause',
      label: 'Pause',
      icon: <Pause className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">API Response Time</p>
              <p className="text-2xl font-bold">245ms</p>
            </div>
            <Zap className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">Database Load</p>
              <p className="text-2xl font-bold">23%</p>
            </div>
            <Database className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">Queue Depth</p>
              <p className="text-2xl font-bold">47</p>
            </div>
            <Activity className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">Error Rate</p>
              <p className="text-2xl font-bold">0.02%</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alarms" className="w-full">
        <TabsList>
          <TabsTrigger value="alarms">CloudWatch Alarms</TabsTrigger>
          <TabsTrigger value="jobs">Background Jobs</TabsTrigger>
          <TabsTrigger value="heartbeat">Synthetic Monitoring</TabsTrigger>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="alarms" className="space-y-6">
          <EnhancedTable
            title="CloudWatch Alarms"
            description="AWS CloudWatch alarms and monitoring alerts"
            columns={alarmColumns}
            data={enhancedAlarmData}
            searchPlaceholder="Search alarms..."
            filters={alarmFilters}
          />
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <EnhancedTable
            title="Background Jobs"
            description="Queue depths, retries, and job status monitoring"
            columns={jobColumns}
            data={enhancedJobData}
            searchPlaceholder="Search jobs..."
            filters={jobFilters}
            actions={jobActions}
          />
        </TabsContent>

        <TabsContent value="heartbeat" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heartbeatChecks.map((check, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {check.name}
                    {getHealthStatus(check.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="text-sm font-medium">{check.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium">{check.successRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Check</span>
                    <TimeDisplay 
                      timestamp={check.lastCheck} 
                      useIST={useIST} 
                      format="relative"
                      className="text-sm text-muted-foreground"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Metrics</CardTitle>
              <CardDescription>Real-time system performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="apiResponse" stroke="#8884d8" name="API Response (ms)" />
                  <Line yAxisId="left" type="monotone" dataKey="queueDepth" stroke="#82ca9d" name="Queue Depth" />
                  <Line yAxisId="right" type="monotone" dataKey="dbLoad" stroke="#ffc658" name="DB Load (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}