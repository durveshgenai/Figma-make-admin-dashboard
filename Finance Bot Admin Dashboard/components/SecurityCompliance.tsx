import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Download, 
  Trash2, 
  FileText, 
  User, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Key,
  Database,
  UserCheck,
  Settings,
  Search
} from 'lucide-react';

interface SecurityComplianceProps {
  useIST: boolean;
  userRole: string;
}

const mockAuditLogs = [
  {
    id: 'AUD-001',
    timestamp: '2024-01-07T14:30:00Z',
    user: 'admin@financebot.com',
    action: 'User Suspended',
    resource: 'User:USR-12847',
    details: 'Suspended user due to suspicious activity',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Chrome)',
    severity: 'High'
  },
  {
    id: 'AUD-002',
    timestamp: '2024-01-07T13:45:00Z',
    user: 'support@financebot.com',
    action: 'Data Export',
    resource: 'User:USR-11234',
    details: 'Exported user data for GDPR request',
    ip: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Chrome)',
    severity: 'Medium'
  },
  {
    id: 'AUD-003',
    timestamp: '2024-01-07T12:20:00Z',
    user: 'finance@financebot.com',
    action: 'Subscription Modified',
    resource: 'Subscription:SUB-5678',
    details: 'Changed plan from Basic to Pro',
    ip: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Firefox)',
    severity: 'Low'
  }
];

const mockDataRequests = [
  {
    id: 'REQ-001',
    type: 'Access Request',
    userId: 'USR-12847',
    userEmail: 'john.doe@example.com',
    status: 'Completed',
    requestedAt: '2024-01-05T10:30:00Z',
    completedAt: '2024-01-07T14:30:00Z',
    dataTypes: ['Profile', 'Conversations', 'Payments'],
    processorNotes: 'Standard GDPR access request processed'
  },
  {
    id: 'REQ-002',
    type: 'Erasure Request',
    userId: 'USR-11234',
    userEmail: 'jane.smith@example.com',
    status: 'In Progress',
    requestedAt: '2024-01-06T14:15:00Z',
    completedAt: null,
    dataTypes: ['Profile', 'Projects', 'Files'],
    processorNotes: 'Awaiting file deletion from S3'
  },
  {
    id: 'REQ-003',
    type: 'Access Request',
    userId: 'USR-98765',
    userEmail: 'mike.wilson@example.com',
    status: 'Pending',
    requestedAt: '2024-01-07T09:45:00Z',
    completedAt: null,
    dataTypes: ['Profile', 'Conversations'],
    processorNotes: 'Identity verification in progress'
  }
];

const mockRetentionPolicies = [
  {
    dataType: 'User Profiles',
    retentionPeriod: '7 years',
    deletionMethod: 'Soft Delete',
    status: 'Active',
    affectedRecords: 12847,
    lastReview: '2024-01-01T00:00:00Z'
  },
  {
    dataType: 'Chat Conversations',
    retentionPeriod: '2 years',
    deletionMethod: 'Hard Delete',
    status: 'Active',
    affectedRecords: 156789,
    lastReview: '2024-01-01T00:00:00Z'
  },
  {
    dataType: 'Payment Records',
    retentionPeriod: '10 years',
    deletionMethod: 'Archive',
    status: 'Active',
    affectedRecords: 45678,
    lastReview: '2024-01-01T00:00:00Z'
  },
  {
    dataType: 'PDF Files',
    retentionPeriod: '1 year',
    deletionMethod: 'S3 Lifecycle',
    status: 'Active',
    affectedRecords: 23456,
    lastReview: '2024-01-01T00:00:00Z'
  }
];

export function SecurityCompliance({ useIST, userRole }: SecurityComplianceProps) {
  const [piiVisible, setPiiVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const auditColumns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true, width: '150px' },
    { key: 'user', label: 'User', sortable: true, width: '200px' },
    { key: 'action', label: 'Action', sortable: true, width: '150px' },
    { key: 'resource', label: 'Resource', sortable: true, width: '150px' },
    { key: 'details', label: 'Details', sortable: false },
    { key: 'severity', label: 'Severity', sortable: true, filterable: true, width: '100px' },
    { key: 'ip', label: 'IP Address', sortable: false, width: '120px' }
  ];

  const dataRequestColumns = [
    { key: 'id', label: 'Request ID', sortable: true, width: '120px' },
    { key: 'type', label: 'Type', sortable: true, filterable: true, width: '150px' },
    { key: 'userEmail', label: 'User Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '120px' },
    { key: 'requestedAt', label: 'Requested', sortable: true, width: '150px' },
    { key: 'completedAt', label: 'Completed', sortable: true, width: '150px' },
    { key: 'dataTypes', label: 'Data Types', sortable: false, width: '200px' }
  ];

  const retentionColumns = [
    { key: 'dataType', label: 'Data Type', sortable: true, width: '200px' },
    { key: 'retentionPeriod', label: 'Retention Period', sortable: true, width: '150px' },
    { key: 'deletionMethod', label: 'Deletion Method', sortable: true, width: '150px' },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
    { key: 'affectedRecords', label: 'Records', sortable: true, width: '120px' },
    { key: 'lastReview', label: 'Last Review', sortable: true, width: '150px' }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'High': { variant: 'destructive', icon: AlertTriangle },
      'Medium': { variant: 'default', icon: Shield },
      'Low': { variant: 'secondary', icon: CheckCircle }
    };
    
    const config = variants[severity] || { variant: 'outline', icon: Shield };
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
      'Completed': { variant: 'secondary', icon: CheckCircle },
      'In Progress': { variant: 'default', icon: Clock },
      'Pending': { variant: 'destructive', icon: AlertTriangle },
      'Active': { variant: 'default', icon: CheckCircle }
    };
    
    const config = variants[status] || { variant: 'outline', icon: AlertTriangle };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getRequestTypeBadge = (type: string) => {
    const variants = {
      'Access Request': { variant: 'outline', icon: Download },
      'Erasure Request': { variant: 'destructive', icon: Trash2 },
      'Rectification Request': { variant: 'default', icon: FileText }
    };
    
    const config = variants[type] || { variant: 'outline', icon: FileText };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {type}
      </Badge>
    );
  };

  const maskEmail = (email: string) => {
    if (piiVisible) return email;
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const enhancedAuditData = mockAuditLogs.map(log => ({
    ...log,
    timestamp: <TimeDisplay timestamp={log.timestamp} useIST={useIST} format="full" />,
    user: maskEmail(log.user),
    severity: getSeverityBadge(log.severity)
  }));

  const enhancedDataRequestData = mockDataRequests.map(request => ({
    ...request,
    type: getRequestTypeBadge(request.type),
    status: getStatusBadge(request.status),
    userEmail: maskEmail(request.userEmail),
    requestedAt: <TimeDisplay timestamp={request.requestedAt} useIST={useIST} format="full" />,
    completedAt: request.completedAt ? (
      <TimeDisplay timestamp={request.completedAt} useIST={useIST} format="full" />
    ) : (
      <span className="text-muted-foreground">-</span>
    ),
    dataTypes: (
      <div className="flex flex-wrap gap-1">
        {request.dataTypes.map((type, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {type}
          </Badge>
        ))}
      </div>
    )
  }));

  const enhancedRetentionData = mockRetentionPolicies.map(policy => ({
    ...policy,
    status: getStatusBadge(policy.status),
    affectedRecords: policy.affectedRecords.toLocaleString(),
    lastReview: <TimeDisplay timestamp={policy.lastReview} useIST={useIST} format="date" />
  }));

  const auditFilters = [
    {
      key: 'severity',
      label: 'Severity',
      type: 'select' as const,
      options: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    }
  ];

  const dataRequestFilters = [
    {
      key: 'type',
      label: 'Request Type',
      type: 'select' as const,
      options: [
        { value: 'Access Request', label: 'Access Request' },
        { value: 'Erasure Request', label: 'Erasure Request' },
        { value: 'Rectification Request', label: 'Rectification Request' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Completed', label: 'Completed' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Pending', label: 'Pending' }
      ]
    }
  ];

  const dataRequestActions = [
    {
      key: 'view',
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: 'process',
      label: 'Process Request',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const handleDataRequestAction = (action: string, request: any) => {
    if (action === 'view') {
      setSelectedRequest(request);
    }
    console.log('Data request action:', action, request);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">Security & Compliance Center</span>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            SOC 2 Compliant
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">PII Visibility</span>
          <Switch
            checked={piiVisible}
            onCheckedChange={setPiiVisible}
            aria-label="Toggle PII visibility"
          />
          {piiVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </div>
      </div>

      <Tabs defaultValue="audit" className="w-full">
        <TabsList>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="data-requests">Data Requests</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-6">
          <EnhancedTable
            title="Audit Log"
            description="Immutable log of all administrative actions"
            columns={auditColumns}
            data={enhancedAuditData}
            searchPlaceholder="Search audit logs..."
            filters={auditFilters}
          />
        </TabsContent>

        <TabsContent value="data-requests" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Data Subject Requests</h3>
              <p className="text-sm text-muted-foreground">
                GDPR and privacy compliance requests
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Manual Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Manual Data Request</DialogTitle>
                  <DialogDescription>
                    Process a data request on behalf of a user
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium">Request Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="access">Access Request</SelectItem>
                        <SelectItem value="erasure">Erasure Request</SelectItem>
                        <SelectItem value="rectification">Rectification Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">User Email</label>
                    <Input placeholder="user@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Data Types</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Profile', 'Conversations', 'Projects', 'Files', 'Payments'].map(type => (
                        <label key={type} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Notes</label>
                    <Input placeholder="Additional processing notes" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Request</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <EnhancedTable
            title="Data Subject Requests"
            description="Privacy and compliance data requests"
            columns={dataRequestColumns}
            data={enhancedDataRequestData}
            onRowAction={handleDataRequestAction}
            searchPlaceholder="Search data requests..."
            filters={dataRequestFilters}
            actions={dataRequestActions}
          />
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Data Retention Policies</h3>
              <p className="text-sm text-muted-foreground">
                Automated data lifecycle management
              </p>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure Policies
            </Button>
          </div>

          <EnhancedTable
            title="Retention Policies"
            description="Data retention and deletion policies by data type"
            columns={retentionColumns}
            data={enhancedRetentionData}
            searchPlaceholder="Search retention policies..."
          />

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deletions</CardTitle>
              <CardDescription>Data scheduled for deletion in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Chat Conversations</p>
                    <p className="text-sm text-muted-foreground">1,234 conversations from Jan 2022</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Jan 15, 2024</p>
                    <Badge variant="secondary">7 days</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">PDF Files</p>
                    <p className="text-sm text-muted-foreground">567 files from Feb 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Jan 20, 2024</p>
                    <Badge variant="secondary">12 days</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-control" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: 'SuperAdmin', users: 3, permissions: 'Full Access' },
                  { role: 'Support', users: 12, permissions: 'Users, Tickets, Limited Analytics' },
                  { role: 'Finance', users: 5, permissions: 'Payments, Subscriptions, Revenue' },
                  { role: 'Analyst', users: 8, permissions: 'Analytics, Usage Data' }
                ].map((rbac, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{rbac.role}</p>
                      <p className="text-sm text-muted-foreground">{rbac.permissions}</p>
                    </div>
                    <Badge variant="outline">{rbac.users} users</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Failed Login Attempts</span>
                  </div>
                  <span className="font-bold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Active Sessions</span>
                  </div>
                  <span className="font-bold">147</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Data Exports (24h)</span>
                  </div>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Admin Actions (24h)</span>
                  </div>
                  <span className="font-bold">34</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Data Request Detail Modal */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Data Request Details - {selectedRequest.id}</DialogTitle>
              <DialogDescription>
                {selectedRequest.type} for {piiVisible ? selectedRequest.userEmail : maskEmail(selectedRequest.userEmail)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Request Type</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">User ID</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.userId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Requested At</label>
                  <TimeDisplay 
                    timestamp={selectedRequest.requestedAt} 
                    useIST={useIST} 
                    format="full"
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Data Types Requested</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRequest.dataTypes.map((type, index) => (
                    <Badge key={index} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Processor Notes</label>
                <p className="text-sm text-muted-foreground">{selectedRequest.processorNotes}</p>
              </div>
              {selectedRequest.status === 'Pending' && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reject</Button>
                  <Button>Approve & Process</Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}