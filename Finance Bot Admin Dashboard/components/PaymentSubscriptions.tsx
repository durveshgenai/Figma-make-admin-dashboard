import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search, Eye, CreditCard, Receipt, MoreHorizontal, IndianRupee } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const mockSubscriptions = [
  {
    id: 'SUB001',
    userId: 'USR001',
    userName: 'John Doe',
    planName: 'Pro',
    startDate: '15/01/2024, 10:30:00',
    endDate: '15/02/2024, 10:30:00',
    status: 'Active',
    amount: '₹1,999'
  },
  {
    id: 'SUB002',
    userId: 'USR002',
    userName: 'Sarah Smith',
    planName: 'Basic',
    startDate: '22/01/2024, 09:15:00',
    endDate: '22/02/2024, 09:15:00',
    status: 'Active',
    amount: '₹999'
  },
  {
    id: 'SUB003',
    userId: 'USR003',
    userName: 'Mike Johnson',
    planName: 'Enterprise',
    startDate: '03/02/2024, 11:20:00',
    endDate: '03/03/2024, 11:20:00',
    status: 'Expired',
    amount: '₹4,999'
  },
  {
    id: 'SUB004',
    userId: 'USR004',
    userName: 'Anna Wilson',
    planName: 'Pro',
    startDate: '18/02/2024, 14:45:00',
    endDate: '18/03/2024, 14:45:00',
    status: 'Active',
    amount: '₹1,999'
  },
  {
    id: 'SUB005',
    userId: 'USR005',
    userName: 'David Brown',
    planName: 'Basic',
    startDate: '25/02/2024, 08:30:00',
    endDate: '25/03/2024, 08:30:00',
    status: 'Cancelled',
    amount: '₹999'
  },
];

const mockTransactions = [
  {
    id: 'TXN001',
    userId: 'USR001',
    userName: 'John Doe',
    amount: '₹1,999',
    paymentMethod: 'Credit Card',
    status: 'Success',
    date: '15/01/2024, 10:35:00',
    subscriptionId: 'SUB001'
  },
  {
    id: 'TXN002',
    userId: 'USR002',
    userName: 'Sarah Smith',
    amount: '₹999',
    paymentMethod: 'UPI',
    status: 'Success',
    date: '22/01/2024, 09:20:00',
    subscriptionId: 'SUB002'
  },
  {
    id: 'TXN003',
    userId: 'USR003',
    userName: 'Mike Johnson',
    amount: '₹4,999',
    paymentMethod: 'Net Banking',
    status: 'Success',
    date: '03/02/2024, 11:25:00',
    subscriptionId: 'SUB003'
  },
  {
    id: 'TXN004',
    userId: 'USR004',
    userName: 'Anna Wilson',
    amount: '₹1,999',
    paymentMethod: 'Credit Card',
    status: 'Success',
    date: '18/02/2024, 14:50:00',
    subscriptionId: 'SUB004'
  },
  {
    id: 'TXN005',
    userId: 'USR005',
    userName: 'David Brown',
    amount: '₹999',
    paymentMethod: 'UPI',
    status: 'Failed',
    date: '25/02/2024, 08:35:00',
    subscriptionId: null
  },
];

const mockPlans = [
  {
    id: 'PLAN001',
    name: 'Basic',
    price: '₹999',
    duration: '1 Month',
    features: ['5 Projects', '50 Conversations', '1GB Storage', 'Email Support'],
    activeUsers: 45
  },
  {
    id: 'PLAN002',
    name: 'Pro',
    price: '₹1,999',
    duration: '1 Month',
    features: ['20 Projects', '200 Conversations', '10GB Storage', 'Priority Support', 'Advanced Analytics'],
    activeUsers: 35
  },
  {
    id: 'PLAN003',
    name: 'Enterprise',
    price: '₹4,999',
    duration: '1 Month',
    features: ['Unlimited Projects', 'Unlimited Conversations', '100GB Storage', '24/7 Support', 'Custom Integration', 'API Access'],
    activeUsers: 20
  },
];

export function PaymentSubscriptions() {
  const [subscriptionSearch, setSubscriptionSearch] = useState('');
  const [transactionSearch, setTransactionSearch] = useState('');

  const filteredSubscriptions = mockSubscriptions.filter(sub =>
    sub.userName.toLowerCase().includes(subscriptionSearch.toLowerCase()) ||
    sub.planName.toLowerCase().includes(subscriptionSearch.toLowerCase()) ||
    sub.id.toLowerCase().includes(subscriptionSearch.toLowerCase())
  );

  const filteredTransactions = mockTransactions.filter(txn =>
    txn.userName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    txn.paymentMethod.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    txn.id.toLowerCase().includes(transactionSearch.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'Expired': 'destructive',
      'Cancelled': 'secondary',
      'Success': 'default',
      'Failed': 'destructive',
      'Pending': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="plans">Payment Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Subscriptions Management</CardTitle>
              <CardDescription>Monitor all user subscriptions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subscriptions..."
                    value={subscriptionSearch}
                    onChange={(e) => setSubscriptionSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscription ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">{subscription.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{subscription.userName}</p>
                            <p className="text-sm text-muted-foreground">{subscription.userId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{subscription.planName}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{subscription.startDate}</TableCell>
                        <TableCell className="text-sm">{subscription.endDate}</TableCell>
                        <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                        <TableCell className="font-medium">{subscription.amount}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Cancel Subscription
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions Management</CardTitle>
              <CardDescription>Monitor all payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={transactionSearch}
                    onChange={(e) => setTransactionSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{transaction.userName}</p>
                            <p className="text-sm text-muted-foreground">{transaction.userId}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.amount}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="text-sm">{transaction.date}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Receipt className="h-4 w-4 mr-2" />
                                View Receipt
                              </DropdownMenuItem>
                              {transaction.status === 'Success' && (
                                <DropdownMenuItem className="text-destructive">
                                  <IndianRupee className="h-4 w-4 mr-2" />
                                  Process Refund
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Payment Plans Management</CardTitle>
              <CardDescription>Manage subscription plans and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Button>Create New Plan</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlans.map((plan) => (
                  <Card key={plan.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <Badge variant="outline">{plan.activeUsers} users</Badge>
                      </div>
                      <CardDescription>
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.duration}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Features:</label>
                          <ul className="mt-2 space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit Plan
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Disable
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}