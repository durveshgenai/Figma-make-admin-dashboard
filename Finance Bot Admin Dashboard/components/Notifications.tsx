import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Send, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface NotificationsProps {
  useIST: boolean;
  userRole: string;
}

const mockTemplates = [
  {
    id: 'TPL-001',
    name: 'Payment Failure - First Notice',
    type: 'Email',
    category: 'Billing',
    subject: 'Action Required: Payment Failed',
    status: 'Active',
    usage: 1247,
    lastUsed: '2024-01-07T14:30:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'TPL-002',
    name: 'Trial Expiry Reminder',
    type: 'Email',
    category: 'Subscription',
    subject: 'Your trial expires in 3 days',
    status: 'Active',
    usage: 456,
    lastUsed: '2024-01-07T12:15:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'TPL-003',
    name: 'Quota Threshold Alert',
    type: 'In-App',
    category: 'Usage',
    subject: 'Approaching usage limit',
    status: 'Active',
    usage: 234,
    lastUsed: '2024-01-07T09:45:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'TPL-004',
    name: 'KYC Document Request',
    type: 'SMS',
    category: 'Compliance',
    subject: 'Document verification required',
    status: 'Draft',
    usage: 0,
    lastUsed: null,
    createdAt: '2024-01-06T16:20:00Z'
  }
];

const mockCampaigns = [
  {
    id: 'CMP-001',
    name: 'January Feature Announcement',
    type: 'Broadcast',
    status: 'Sent',
    recipients: 12847,
    delivered: 12623,
    opened: 8945,
    clicked: 1234,
    scheduledAt: '2024-01-07T09:00:00Z',
    sentAt: '2024-01-07T09:02:00Z'
  },
  {
    id: 'CMP-002',
    name: 'Payment Dunning - Batch 1',
    type: 'Triggered',
    status: 'Active',
    recipients: 234,
    delivered: 231,
    opened: 156,
    clicked: 23,
    scheduledAt: '2024-01-07T10:00:00Z',
    sentAt: '2024-01-07T10:00:00Z'
  },
  {
    id: 'CMP-003',
    name: 'Pro Plan Upgrade Offer',
    type: 'Segment',
    status: 'Scheduled',
    recipients: 1567,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduledAt: '2024-01-08T14:00:00Z',
    sentAt: null
  }
];

export function Notifications({ useIST, userRole }: NotificationsProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'broadcast',
    template: '',
    segment: '',
    scheduleType: 'now'
  });

  const templateColumns = [
    { key: 'id', label: 'Template ID', sortable: true, width: '120px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true, filterable: true, width: '120px' },
    { key: 'category', label: 'Category', sortable: true, filterable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
    { key: 'usage', label: 'Usage', sortable: true, width: '80px' },
    { key: 'lastUsed', label: 'Last Used', sortable: true, width: '150px' }
  ];

  const campaignColumns = [
    { key: 'id', label: 'Campaign ID', sortable: true, width: '120px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true, filterable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
    { key: 'recipients', label: 'Recipients', sortable: true, width: '100px' },
    { key: 'delivered', label: 'Delivered', sortable: true, width: '100px' },
    { key: 'openRate', label: 'Open Rate', sortable: true, width: '100px' },
    { key: 'scheduledAt', label: 'Scheduled', sortable: true, width: '150px' }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': { variant: 'default', icon: CheckCircle },
      'Draft': { variant: 'secondary', icon: Edit },
      'Sent': { variant: 'secondary', icon: CheckCircle },
      'Scheduled': { variant: 'default', icon: Clock },
      'Failed': { variant: 'destructive', icon: AlertTriangle }
    };
    
    const config = variants[status] || { variant: 'outline', icon: AlertTriangle };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const icons = {
      'Email': Mail,
      'SMS': MessageSquare,
      'In-App': Bell,
      'Broadcast': Send,
      'Triggered': Clock,
      'Segment': Users
    };
    
    const Icon = icons[type] || Mail;
    
    return (
      <Badge variant="outline" className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {type}
      </Badge>
    );
  };

  const enhancedTemplateData = mockTemplates.map(template => ({
    ...template,
    type: getTypeBadge(template.type),
    status: getStatusBadge(template.status),
    lastUsed: template.lastUsed ? (
      <TimeDisplay timestamp={template.lastUsed} useIST={useIST} format="full" />
    ) : (
      <span className="text-muted-foreground">Never</span>
    )
  }));

  const enhancedCampaignData = mockCampaigns.map(campaign => ({
    ...campaign,
    type: getTypeBadge(campaign.type),
    status: getStatusBadge(campaign.status),
    openRate: campaign.delivered > 0 ? `${((campaign.opened / campaign.delivered) * 100).toFixed(1)}%` : '0%',
    scheduledAt: <TimeDisplay timestamp={campaign.scheduledAt} useIST={useIST} format="full" />
  }));

  const templateFilters = [
    {
      key: 'type',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: 'Email', label: 'Email' },
        { value: 'SMS', label: 'SMS' },
        { value: 'In-App', label: 'In-App' }
      ]
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'Billing', label: 'Billing' },
        { value: 'Subscription', label: 'Subscription' },
        { value: 'Usage', label: 'Usage' },
        { value: 'Compliance', label: 'Compliance' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Draft', label: 'Draft' }
      ]
    }
  ];

  const campaignFilters = [
    {
      key: 'type',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: 'Broadcast', label: 'Broadcast' },
        { value: 'Triggered', label: 'Triggered' },
        { value: 'Segment', label: 'Segment' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Sent', label: 'Sent' },
        { value: 'Active', label: 'Active' },
        { value: 'Scheduled', label: 'Scheduled' },
        { value: 'Failed', label: 'Failed' }
      ]
    }
  ];

  const templateActions = [
    {
      key: 'view',
      label: 'View',
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const
    }
  ];

  const campaignActions = [
    {
      key: 'view',
      label: 'View Report',
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: <Plus className="h-4 w-4" />
    }
  ];

  const handleTemplateAction = (action: string, template: any) => {
    if (action === 'view') {
      setSelectedTemplate(template);
    }
    console.log('Template action:', action, template);
  };

  const handleCampaignAction = (action: string, campaign: any) => {
    console.log('Campaign action:', action, campaign);
  };

  return (
    <div className="space-y-6 max-w-full">
      <Tabs defaultValue="templates" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Notification Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable template for notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Template Name</label>
                      <Input placeholder="e.g., Payment Reminder" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="in-app">In-App</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="usage">Usage</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject Line</label>
                    <Input placeholder="Email subject or notification title" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea 
                      placeholder="Use variables like {{user_name}}, {{amount}}, {{due_date}}"
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="active" />
                    <label htmlFor="active" className="text-sm font-medium">
                      Set as active template
                    </label>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Template</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Campaign</DialogTitle>
                  <DialogDescription>
                    Send targeted notifications to user segments
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Campaign Name</label>
                      <Input 
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., January Newsletter"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Campaign Type</label>
                      <Select 
                        value={newCampaign.type} 
                        onValueChange={(value) => setNewCampaign(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="broadcast">Broadcast (All Users)</SelectItem>
                          <SelectItem value="segment">Segment (Filtered)</SelectItem>
                          <SelectItem value="triggered">Triggered (Event-based)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Template</label>
                      <Select 
                        value={newCampaign.template}
                        onValueChange={(value) => setNewCampaign(prev => ({ ...prev, template: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTemplates.filter(t => t.status === 'Active').map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {newCampaign.type === 'segment' && (
                      <div>
                        <label className="text-sm font-medium">Target Segment</label>
                        <Select 
                          value={newCampaign.segment}
                          onValueChange={(value) => setNewCampaign(prev => ({ ...prev, segment: value }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select segment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trial_users">Trial Users</SelectItem>
                            <SelectItem value="pro_users">Pro Users</SelectItem>
                            <SelectItem value="enterprise_users">Enterprise Users</SelectItem>
                            <SelectItem value="churned_users">Churned Users</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Schedule</label>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="now"
                          checked={newCampaign.scheduleType === 'now'}
                          onCheckedChange={(checked) => 
                            setNewCampaign(prev => ({ ...prev, scheduleType: checked ? 'now' : 'later' }))
                          }
                        />
                        <label htmlFor="now" className="text-sm">Send now</label>
                      </div>
                      {newCampaign.scheduleType === 'later' && (
                        <div className="flex gap-2">
                          <Input type="date" className="w-auto" />
                          <Input type="time" className="w-auto" />
                        </div>
                      )}
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rate Limiting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Max emails per hour</label>
                          <Input type="number" defaultValue="1000" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Max SMS per hour</label>
                          <Input type="number" defaultValue="500" className="mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Save Draft</Button>
                    <Button>
                      {newCampaign.scheduleType === 'now' ? 'Send Now' : 'Schedule Campaign'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="templates" className="space-y-6">
          <div className="bg-card rounded-lg border">
            <EnhancedTable
              title="Notification Templates"
              description="Manage reusable notification templates"
              columns={templateColumns}
              data={enhancedTemplateData}
              onRowAction={handleTemplateAction}
              searchPlaceholder="Search templates..."
              filters={templateFilters}
              actions={templateActions}
            />
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="bg-card rounded-lg border">
            <EnhancedTable
              title="Notification Campaigns"
              description="Track and manage notification campaigns"
              columns={campaignColumns}
              data={enhancedCampaignData}
              onRowAction={handleCampaignAction}
              searchPlaceholder="Search campaigns..."
              filters={campaignFilters}
              actions={campaignActions}
            />
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Trial Users', count: 1247, description: 'Users in trial period' },
              { name: 'Pro Users', count: 8934, description: 'Active Pro subscribers' },
              { name: 'Enterprise Users', count: 234, description: 'Enterprise plan users' },
              { name: 'Churned Users', count: 456, description: 'Users who cancelled' },
              { name: 'High Usage', count: 123, description: 'Users near quota limits' },
              { name: 'Payment Issues', count: 67, description: 'Failed payment users' }
            ].map((segment, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    {segment.name}
                    <Badge variant="outline">{segment.count.toLocaleString()}</Badge>
                  </CardTitle>
                  <CardDescription>{segment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}