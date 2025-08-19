import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search, Eye, Edit, UserX, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const mockUsers = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    registrationDate: '15/01/2024, 10:30:00',
    lastLogin: '07/08/2024, 14:25:30',
    subscriptionStatus: 'Active',
    totalProjects: 12,
    totalSpent: '₹25,500',
    plan: 'Pro'
  },
  {
    id: 'USR002',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    registrationDate: '22/01/2024, 09:15:00',
    lastLogin: '06/08/2024, 16:45:20',
    subscriptionStatus: 'Active',
    totalProjects: 8,
    totalSpent: '₹18,200',
    plan: 'Basic'
  },
  {
    id: 'USR003',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    registrationDate: '03/02/2024, 11:20:00',
    lastLogin: '07/08/2024, 09:10:15',
    subscriptionStatus: 'Expired',
    totalProjects: 15,
    totalSpent: '₹42,800',
    plan: 'Enterprise'
  },
  {
    id: 'USR004',
    name: 'Anna Wilson',
    email: 'anna.wilson@example.com',
    registrationDate: '18/02/2024, 14:45:00',
    lastLogin: '05/08/2024, 12:30:45',
    subscriptionStatus: 'Active',
    totalProjects: 6,
    totalSpent: '₹12,900',
    plan: 'Pro'
  },
  {
    id: 'USR005',
    name: 'David Brown',
    email: 'david.brown@example.com',
    registrationDate: '25/02/2024, 08:30:00',
    lastLogin: '07/08/2024, 11:15:30',
    subscriptionStatus: 'Cancelled',
    totalProjects: 3,
    totalSpent: '₹7,500',
    plan: 'Basic'
  },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'Expired': 'destructive',
      'Cancelled': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage and monitor all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>Add New User</Button>
          </div>

          {/* Users Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-sm">{user.registrationDate}</TableCell>
                    <TableCell className="text-sm">{user.lastLogin}</TableCell>
                    <TableCell>{getStatusBadge(user.subscriptionStatus)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.plan}</Badge>
                    </TableCell>
                    <TableCell>{user.totalProjects}</TableCell>
                    <TableCell>{user.totalSpent}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>User Details - {user.name}</DialogTitle>
                                <DialogDescription>Complete user information and activity</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium">User ID</label>
                                    <p className="text-sm text-muted-foreground">{user.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <p className="text-sm text-muted-foreground">{user.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Registration Date</label>
                                    <p className="text-sm text-muted-foreground">{user.registrationDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Last Login</label>
                                    <p className="text-sm text-muted-foreground">{user.lastLogin}</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium">Subscription Status</label>
                                    <div className="mt-1">{getStatusBadge(user.subscriptionStatus)}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Current Plan</label>
                                    <div className="mt-1">
                                      <Badge variant="outline">{user.plan}</Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Total Projects</label>
                                    <p className="text-sm text-muted-foreground">{user.totalProjects}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Total Spent</label>
                                    <p className="text-sm text-muted-foreground">{user.totalSpent}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
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
    </div>
  );
}