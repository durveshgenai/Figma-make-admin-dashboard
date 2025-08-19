import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { TimeDisplay } from './TimeDisplay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Crown, 
  Zap, 
  Users, 
  FileText, 
  MessageSquare, 
  Database,
  CreditCard,
  Calendar,
  Settings,
  Bell,
  Shield,
  Eye,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface AccountSettingsProps {
  useIST: boolean;
  userRole: string;
}

const usageData = [
  { date: '2024-01-01', users: 12500, chats: 145000, pdfs: 2300 },
  { date: '2024-01-02', users: 12600, chats: 152000, pdfs: 2450 },
  { date: '2024-01-03', users: 12700, chats: 148000, pdfs: 2380 },
  { date: '2024-01-04', users: 12800, chats: 167000, pdfs: 2650 },
  { date: '2024-01-05', users: 12850, chats: 159000, pdfs: 2520 },
  { date: '2024-01-06', users: 12900, chats: 171000, pdfs: 2780 },
  { date: '2024-01-07', users: 13000, chats: 156000, pdfs: 2560 }
];

const currentPlan = {
  name: 'Enterprise Plan',
  status: 'Active',
  billingCycle: 'Monthly',
  nextBilling: '2024-02-07T00:00:00Z',
  cost: '₹2,50,000',
  features: [
    'Unlimited users',
    'Advanced analytics',
    'Priority support',
    '99.9% SLA guarantee',
    'Custom integrations'
  ]
};

const usageLimits = {
  users: { current: 13000, limit: 25000, unit: 'users' },
  chats: { current: 156789, limit: 500000, unit: 'chats/month' },
  pdfs: { current: 24592, limit: 100000, unit: 'PDFs/month' },
  storage: { current: 2.4, limit: 10, unit: 'TB' },
  apiCalls: { current: 2890000, limit: 5000000, unit: 'calls/month' }
};

const billingHistory = [
  {
    id: 'INV-2024-001',
    date: '2024-01-07T00:00:00Z',
    amount: '₹2,50,000',
    status: 'Paid',
    description: 'Enterprise Plan - January 2024'
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-07T00:00:00Z',
    amount: '₹2,50,000',
    status: 'Paid',
    description: 'Enterprise Plan - December 2023'
  },
  {
    id: 'INV-2023-011',
    date: '2023-11-07T00:00:00Z',
    amount: '₹2,50,000',
    status: 'Paid',
    description: 'Enterprise Plan - November 2023'
  }
];

export function AccountSettings({ useIST, userRole }: AccountSettingsProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [usageAlertsEnabled, setUsageAlertsEnabled] = useState(true);

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': { variant: 'default', className: 'bg-green-100 text-green-800 border-green-200' },
      'Paid': { variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-200' },
      'Pending': { variant: 'default', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
    };
    
    const config = variants[status] || { variant: 'outline', className: '' };
    
    return (
      <Badge className={config.className}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plan">Plan & Usage</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Account Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  {currentPlan.name}
                  {getStatusBadge(currentPlan.status)}
                </CardTitle>
                <CardDescription>
                  Your current subscription plan and usage overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-2xl font-bold">{currentPlan.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing</p>
                    <p className="text-base font-medium">
                      <TimeDisplay timestamp={currentPlan.nextBilling} useIST={useIST} format="date" />
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Plan Features</p>
                  <ul className="space-y-1">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Subscription
                </Button>
                <Button className="w-full" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upgrade Your Plan</DialogTitle>
                      <DialogDescription>
                        Choose a plan that fits your growing needs
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { name: 'Professional', price: '₹50,000', features: ['10K users', 'Basic analytics'] },
                          { name: 'Enterprise', price: '₹2,50,000', features: ['25K users', 'Advanced analytics'], current: true },
                          { name: 'Enterprise+', price: '₹5,00,000', features: ['Unlimited users', 'Custom features'] }
                        ].map((plan, index) => (
                          <Card key={index} className={plan.current ? 'border-primary' : ''}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{plan.name}</h4>
                                <p className="font-bold">{plan.price}/mo</p>
                                {plan.current && <Badge>Current</Badge>}
                              </div>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {plan.features.map((feature, i) => (
                                  <li key={i}>• {feature}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Usage Analytics */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Track your platform usage over time</CardDescription>
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
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis yAxisId="users" orientation="left" tickFormatter={(value) => `${value / 1000}K`} />
                  <YAxis yAxisId="activity" orientation="right" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'users' ? `${value.toLocaleString()} users` : `${value.toLocaleString()} ${name}`,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Line yAxisId="users" type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                  <Line yAxisId="activity" type="monotone" dataKey="chats" stroke="#82ca9d" strokeWidth={2} />
                  <Line yAxisId="activity" type="monotone" dataKey="pdfs" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          {/* Usage Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Usage & Limits</CardTitle>
              <CardDescription>Monitor your current usage against plan limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(usageLimits).map(([key, usage]) => {
                  const percentage = getUsagePercentage(usage.current, usage.limit);
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium capitalize">{key}</p>
                        <span className={`text-sm font-bold ${getUsageColor(percentage)}`}>
                          {percentage}%
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {usage.current.toLocaleString()} / {usage.limit.toLocaleString()} {usage.unit}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Usage-Based Pricing Alert */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800">Usage-Based Pricing</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your plan includes usage-based pricing. Additional charges may apply if you exceed your allocated limits. 
                    Monitor your usage to avoid unexpected charges.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Enable Usage Alerts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {/* Billing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentPlan.cost}</div>
                <p className="text-sm text-muted-foreground">
                  Next billing: <TimeDisplay timestamp={currentPlan.nextBilling} useIST={useIST} format="date" />
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Year to Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹7,50,000</div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  +20% from last year
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">•••• •••• •••• 4242</span>
                </div>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </CardContent>
            </Card>
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">
                        <TimeDisplay timestamp={invoice.date} useIST={useIST} format="date" />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when approaching limits</p>
                </div>
                <Switch checked={usageAlertsEnabled} onCheckedChange={setUsageAlertsEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Time Zone Display</label>
                <Select defaultValue="ist">
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                    <SelectItem value="local">Local Time Zone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Date Format</label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">API Keys</p>
                  <p className="text-sm text-muted-foreground">Manage API access keys</p>
                </div>
                <Button variant="outline">Manage Keys</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Management</p>
                  <p className="text-sm text-muted-foreground">View and manage active sessions</p>
                </div>
                <Button variant="outline">View Sessions</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Security Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'Login from new device', time: '2024-01-07T14:30:00Z', location: 'Mumbai, India' },
                  { action: 'API key created', time: '2024-01-06T10:15:00Z', location: 'System' },
                  { action: 'Password changed', time: '2024-01-05T16:45:00Z', location: 'Delhi, India' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.location}</p>
                    </div>
                    <TimeDisplay timestamp={activity.time} useIST={useIST} format="relative" className="text-sm text-muted-foreground" />
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