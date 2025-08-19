import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Download, TrendingUp, Users, FileText, MessageSquare, IndianRupee } from 'lucide-react';

const userGrowthData = [
  { month: 'Jan', newUsers: 180, totalUsers: 1200 },
  { month: 'Feb', newUsers: 250, totalUsers: 1450 },
  { month: 'Mar', newUsers: 230, totalUsers: 1680 },
  { month: 'Apr', newUsers: 240, totalUsers: 1920 },
  { month: 'May', newUsers: 180, totalUsers: 2100 },
  { month: 'Jun', newUsers: 280, totalUsers: 2380 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, subscriptions: 85 },
  { month: 'Feb', revenue: 52000, subscriptions: 98 },
  { month: 'Mar', revenue: 48000, subscriptions: 92 },
  { month: 'Apr', revenue: 61000, subscriptions: 115 },
  { month: 'May', revenue: 55000, subscriptions: 105 },
  { month: 'Jun', revenue: 67000, subscriptions: 128 },
];

const usageData = [
  { feature: 'Project Creation', usage: 1245, growth: '+12%' },
  { feature: 'Conversations', usage: 8765, growth: '+23%' },
  { feature: 'PDF Uploads', usage: 2340, growth: '+8%' },
  { feature: 'Notes Created', usage: 3456, growth: '+15%' },
  { feature: 'API Calls', usage: 45670, growth: '+18%' },
];

const planDistributionData = [
  { name: 'Basic', value: 45, users: 1071, color: '#0088FE' },
  { name: 'Pro', value: 35, users: 833, color: '#00C49F' },
  { name: 'Enterprise', value: 20, users: 476, color: '#FFBB28' },
];

const activityData = [
  { day: 'Mon', projects: 45, conversations: 234, notes: 123 },
  { day: 'Tue', projects: 52, conversations: 267, notes: 145 },
  { day: 'Wed', projects: 49, conversations: 298, notes: 156 },
  { day: 'Thu', projects: 63, conversations: 312, notes: 178 },
  { day: 'Fri', projects: 58, conversations: 276, notes: 134 },
  { day: 'Sat', projects: 41, conversations: 189, notes: 98 },
  { day: 'Sun', projects: 35, conversations: 156, notes: 87 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Monthly Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              User acquisition growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Revenue Per User</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹28.2</div>
            <p className="text-xs text-muted-foreground">
              Average monthly revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Retention Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.3%</div>
            <p className="text-xs text-muted-foreground">
              Monthly user retention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8%</div>
            <p className="text-xs text-muted-foreground">
              Free to paid conversion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
            <CardDescription>New users vs total users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="totalUsers" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="newUsers" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue & Subscriptions</CardTitle>
            <CardDescription>Monthly revenue and subscription trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="subscriptions" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Usage Statistics and Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Feature Usage Statistics</CardTitle>
            <CardDescription>Popular features and their usage trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.feature === 'Project Creation' && <FileText className="h-4 w-4 text-blue-500" />}
                    {item.feature === 'Conversations' && <MessageSquare className="h-4 w-4 text-green-500" />}
                    {item.feature === 'PDF Uploads' && <FileText className="h-4 w-4 text-red-500" />}
                    {item.feature === 'Notes Created' && <FileText className="h-4 w-4 text-purple-500" />}
                    {item.feature === 'API Calls' && <TrendingUp className="h-4 w-4 text-orange-500" />}
                    <div>
                      <p className="font-medium">{item.feature}</p>
                      <p className="text-sm text-muted-foreground">{item.usage.toLocaleString()} total</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {item.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Current subscription breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={planDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {planDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {planDistributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.users} users</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity Overview</CardTitle>
          <CardDescription>Daily activity breakdown for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="#8884d8" name="Projects" />
              <Bar dataKey="conversations" fill="#82ca9d" name="Conversations" />
              <Bar dataKey="notes" fill="#ffc658" name="Notes" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download detailed analytics reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              User Analytics
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Revenue Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Usage Statistics
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Full Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}