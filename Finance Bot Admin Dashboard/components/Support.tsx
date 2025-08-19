import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { 
  MessageSquare, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Plus,
  Send,
  Paperclip,
  Eye,
  MessageCircle,
  FileText,
  CreditCard,
  Zap
} from 'lucide-react';

interface SupportProps {
  useIST: boolean;
  userRole: string;
}

const mockTickets = [
  {
    id: 'TKT-001',
    title: 'Payment failed but amount deducted',
    type: 'Billing',
    priority: 'High',
    status: 'Open',
    assignee: 'John Support',
    requester: 'user@example.com',
    createdAt: '2024-01-07T10:30:00Z',
    lastUpdated: '2024-01-07T14:30:00Z',
    slaBreached: false,
    dueDate: '2024-01-08T10:30:00Z',
    messages: 3
  },
  {
    id: 'TKT-002',
    title: 'PDF processing stuck for 2 hours',
    type: 'Technical',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Jane Tech',
    requester: 'admin@company.com',
    createdAt: '2024-01-07T09:15:00Z',
    lastUpdated: '2024-01-07T13:45:00Z',
    slaBreached: true,
    dueDate: '2024-01-07T13:15:00Z',
    messages: 7
  },
  {
    id: 'TKT-003',
    title: 'How to upgrade subscription plan?',
    type: 'General',
    priority: 'Low',
    status: 'Resolved',
    assignee: 'Mike Support',
    requester: 'customer@startup.io',
    createdAt: '2024-01-06T16:20:00Z',
    lastUpdated: '2024-01-07T11:20:00Z',
    slaBreached: false,
    dueDate: '2024-01-09T16:20:00Z',
    messages: 4
  }
];

const cannedResponses = [
  {
    title: 'Payment Issue - Investigation',
    content: 'Thank you for reaching out. We are investigating the payment issue and will provide an update within 24 hours. In the meantime, please avoid making duplicate payments.'
  },
  {
    title: 'PDF Processing Delay',
    content: 'We apologize for the delay in PDF processing. Our system is currently experiencing high volume. Your document is in queue and will be processed shortly.'
  },
  {
    title: 'Subscription Upgrade Guide',
    content: 'To upgrade your subscription, please go to Settings > Billing > Change Plan. If you need assistance, I can help you through the process.'
  }
];

const kbSuggestions = [
  {
    title: 'Payment Troubleshooting Guide',
    url: '/kb/payments/troubleshooting',
    relevance: 0.95
  },
  {
    title: 'PDF Processing Best Practices',
    url: '/kb/pdfs/best-practices',
    relevance: 0.87
  },
  {
    title: 'Subscription Management',
    url: '/kb/subscriptions/management',
    relevance: 0.83
  }
];

export function Support({ useIST, userRole }: SupportProps) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCannedResponse, setSelectedCannedResponse] = useState('');

  const columns = [
    { key: 'id', label: 'Ticket ID', sortable: true, width: '120px' },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'type', label: 'Type', sortable: true, filterable: true, width: '100px' },
    { key: 'priority', label: 'Priority', sortable: true, filterable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '120px' },
    { key: 'assignee', label: 'Assignee', sortable: true, width: '140px' },
    { key: 'requester', label: 'Requester', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true, width: '150px' },
    { key: 'sla', label: 'SLA', sortable: false, width: '80px' }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Open': { variant: 'destructive', icon: AlertCircle },
      'In Progress': { variant: 'default', icon: Clock },
      'Resolved': { variant: 'secondary', icon: CheckCircle },
      'Closed': { variant: 'outline', icon: XCircle }
    };
    
    const config = variants[status] || { variant: 'outline', icon: AlertCircle };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <Badge className={colors[priority] || colors['Low']}>
        {priority}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const icons = {
      'Billing': CreditCard,
      'Technical': Zap,
      'General': MessageCircle
    };
    
    const Icon = icons[type] || MessageCircle;
    
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {type}
      </Badge>
    );
  };

  const enhancedTicketData = mockTickets.map(ticket => ({
    ...ticket,
    type: getTypeBadge(ticket.type),
    priority: getPriorityBadge(ticket.priority),
    status: getStatusBadge(ticket.status),
    createdAt: <TimeDisplay timestamp={ticket.createdAt} useIST={useIST} format="full" />,
    sla: ticket.slaBreached ? (
      <Badge variant="destructive" className="text-xs">
        Breached
      </Badge>
    ) : (
      <Badge variant="secondary" className="text-xs">
        On Time
      </Badge>
    )
  }));

  const filters = [
    {
      key: 'type',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: 'Billing', label: 'Billing' },
        { value: 'Technical', label: 'Technical' },
        { value: 'General', label: 'General' }
      ]
    },
    {
      key: 'priority',
      label: 'Priority',
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
        { value: 'Open', label: 'Open' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Resolved', label: 'Resolved' },
        { value: 'Closed', label: 'Closed' }
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
      key: 'assign',
      label: 'Assign to Me',
      icon: <User className="h-4 w-4" />
    },
    {
      key: 'close',
      label: 'Close Ticket',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const handleRowAction = (action: string, row: any) => {
    if (action === 'view') {
      setSelectedTicket(row);
    }
    console.log('Row action:', action, row);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const insertCannedResponse = () => {
    if (selectedCannedResponse) {
      const response = cannedResponses.find(r => r.title === selectedCannedResponse);
      if (response) {
        setNewMessage(response.content);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inbox" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="mytickets">My Tickets</TabsTrigger>
            <TabsTrigger value="sla">SLA Dashboard</TabsTrigger>
          </TabsList>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Support Ticket</DialogTitle>
                <DialogDescription>
                  Create a ticket on behalf of a user or for internal issues
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
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
                  <label className="text-sm font-medium">User Email</label>
                  <Input placeholder="user@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Brief description of the issue" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Detailed description of the issue"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Ticket</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="inbox" className="space-y-6">
          <EnhancedTable
            title="Support Tickets"
            description="All support tickets across the platform"
            columns={columns}
            data={enhancedTicketData}
            onRowAction={handleRowAction}
            searchPlaceholder="Search tickets..."
            filters={filters}
            actions={actions}
          />
        </TabsContent>

        <TabsContent value="mytickets" className="space-y-6">
          <EnhancedTable
            title="My Tickets"
            description="Tickets assigned to you"
            columns={columns}
            data={enhancedTicketData.filter(ticket => ticket.assignee?.includes('Support'))}
            onRowAction={handleRowAction}
            searchPlaceholder="Search my tickets..."
            filters={filters}
            actions={actions}
          />
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">SLA Compliance</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4h</div>
                <p className="text-xs text-muted-foreground">First response</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Tickets Today</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+5 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Customer Satisfaction</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7/5</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Ticket {selectedTicket.id}
                {selectedTicket.slaBreached && (
                  <Badge variant="destructive" className="text-xs">
                    SLA Breached
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>{selectedTicket.title}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                {/* Conversation Thread */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {/* Mock conversation messages */}
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Customer</span>
                          <TimeDisplay 
                            timestamp={selectedTicket.createdAt} 
                            useIST={useIST} 
                            format="full" 
                            className="text-xs text-muted-foreground"
                          />
                        </div>
                        <p className="text-sm">
                          I tried to make a payment for the Pro plan but it failed. However, 
                          the amount was deducted from my account. Can you please help?
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{selectedTicket.assignee}</span>
                          <TimeDisplay 
                            timestamp="2024-01-07T11:00:00Z" 
                            useIST={useIST} 
                            format="full" 
                            className="text-xs text-muted-foreground"
                          />
                        </div>
                        <p className="text-sm">
                          Thank you for contacting us. I can see the failed payment in our logs. 
                          Let me investigate this and get back to you within 2 hours.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reply Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reply</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Canned Responses */}
                    <div className="flex items-center gap-2">
                      <Select value={selectedCannedResponse} onValueChange={setSelectedCannedResponse}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select canned response" />
                        </SelectTrigger>
                        <SelectContent>
                          {cannedResponses.map((response, index) => (
                            <SelectItem key={index} value={response.title}>
                              {response.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" onClick={insertCannedResponse}>
                        Insert
                      </Button>
                    </div>

                    {/* Message Input */}
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={4}
                    />

                    <div className="flex items-center justify-between">
                      <Button variant="outline">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach File
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Ticket Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ticket Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <div className="mt-1">{getTypeBadge(selectedTicket.type)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Assignee</label>
                      <p className="text-sm text-muted-foreground">{selectedTicket.assignee}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <TimeDisplay 
                        timestamp={selectedTicket.dueDate} 
                        useIST={useIST} 
                        format="full"
                        className="text-sm text-muted-foreground"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Knowledge Base Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">KB Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {kbSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-2 border rounded hover:bg-muted cursor-pointer">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{suggestion.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(suggestion.relevance * 100)}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{suggestion.url}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}