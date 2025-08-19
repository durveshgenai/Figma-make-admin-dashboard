export const mockAlarms = [
  {
    id: 'ALM-001',
    name: 'DynamoDB Throttling',
    description: 'DynamoDB read throttling exceeded threshold',
    severity: 'High',
    status: 'Triggered',
    metric: 'ThrottledRequests',
    threshold: '10/min',
    currentValue: '23/min',
    triggeredAt: '2024-01-07T14:30:00Z',
    duration: '15 minutes'
  },
  {
    id: 'ALM-002',
    name: 'Lambda Function Errors',
    description: 'PDF processing Lambda error rate high',
    severity: 'Medium',
    status: 'Warning',
    metric: 'ErrorRate',
    threshold: '5%',
    currentValue: '7.3%',
    triggeredAt: '2024-01-07T13:45:00Z',
    duration: '45 minutes'
  },
  {
    id: 'ALM-003',
    name: 'Webhook Delivery Failure',
    description: 'Webhook delivery success rate below 95%',
    severity: 'Medium',
    status: 'Resolved',
    metric: 'DeliveryRate',
    threshold: '95%',
    currentValue: '98.2%',
    triggeredAt: '2024-01-07T11:20:00Z',
    duration: '2 hours 15 minutes'
  }
];

export const mockJobs = [
  {
    id: 'JOB-001',
    name: 'PDF Processing Queue',
    type: 'Processing',
    status: 'Running',
    queueDepth: 23,
    processed: 1247,
    failed: 3,
    retries: 8,
    lastRun: '2024-01-07T14:30:00Z',
    nextRun: '2024-01-07T14:31:00Z'
  },
  {
    id: 'JOB-002',
    name: 'Webhook Delivery',
    type: 'Notification',
    status: 'Running',
    queueDepth: 12,
    processed: 456,
    failed: 1,
    retries: 2,
    lastRun: '2024-01-07T14:29:00Z',
    nextRun: '2024-01-07T14:30:00Z'
  },
  {
    id: 'JOB-003',
    name: 'Data Cleanup',
    type: 'Maintenance',
    status: 'Paused',
    queueDepth: 0,
    processed: 89,
    failed: 0,
    retries: 0,
    lastRun: '2024-01-07T02:00:00Z',
    nextRun: '2024-01-08T02:00:00Z'
  }
];

export const mockMetrics = [
  { time: '14:00', apiResponse: 245, dbLoad: 23, queueDepth: 47, errorRate: 0.02 },
  { time: '14:05', apiResponse: 267, dbLoad: 28, queueDepth: 52, errorRate: 0.03 },
  { time: '14:10', apiResponse: 234, dbLoad: 25, queueDepth: 38, errorRate: 0.01 },
  { time: '14:15', apiResponse: 289, dbLoad: 31, queueDepth: 61, errorRate: 0.04 },
  { time: '14:20', apiResponse: 256, dbLoad: 27, queueDepth: 45, errorRate: 0.02 },
  { time: '14:25', apiResponse: 278, dbLoad: 29, queueDepth: 54, errorRate: 0.03 },
  { time: '14:30', apiResponse: 245, dbLoad: 23, queueDepth: 47, errorRate: 0.02 }
];

export const heartbeatChecks = [
  {
    name: 'PDF Upload & Processing',
    status: 'Healthy',
    lastCheck: '2024-01-07T14:30:00Z',
    responseTime: '1.2s',
    successRate: '100%'
  },
  {
    name: 'Chat API Response',
    status: 'Healthy',
    lastCheck: '2024-01-07T14:30:00Z',
    responseTime: '0.8s',
    successRate: '100%'
  },
  {
    name: 'Payment Processing',
    status: 'Warning',
    lastCheck: '2024-01-07T14:29:00Z',
    responseTime: '2.4s',
    successRate: '98%'
  }
];