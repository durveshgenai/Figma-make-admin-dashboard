import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search, Eye, Edit, Trash2, MoreHorizontal, FolderOpen } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const mockProjects = [
  {
    id: 'PRJ001',
    name: 'Q4 Financial Analysis',
    userId: 'USR001',
    userName: 'John Doe',
    createdDate: '18/01/2024, 11:30:00',
    lastUpdated: '05/08/2024, 14:20:15',
    status: 'Active',
    totalConversations: 24,
    totalNotes: 12,
    description: 'Comprehensive financial analysis for Q4 2023 performance review'
  },
  {
    id: 'PRJ002',
    name: 'Investment Portfolio Review',
    userId: 'USR002',
    userName: 'Sarah Smith',
    createdDate: '25/01/2024, 09:45:00',
    lastUpdated: '06/08/2024, 16:30:45',
    status: 'Active',
    totalConversations: 18,
    totalNotes: 8,
    description: 'Monthly investment portfolio performance analysis and recommendations'
  },
  {
    id: 'PRJ003',
    name: 'Budget Planning 2024',
    userId: 'USR003',
    userName: 'Mike Johnson',
    createdDate: '02/02/2024, 14:15:00',
    lastUpdated: '30/07/2024, 10:45:20',
    status: 'Completed',
    totalConversations: 31,
    totalNotes: 15,
    description: 'Annual budget planning and forecasting for 2024 fiscal year'
  },
  {
    id: 'PRJ004',
    name: 'Expense Optimization',
    userId: 'USR004',
    userName: 'Anna Wilson',
    createdDate: '10/02/2024, 16:20:00',
    lastUpdated: '07/08/2024, 13:15:30',
    status: 'Active',
    totalConversations: 15,
    totalNotes: 7,
    description: 'Analysis of current expenses and optimization strategies'
  },
  {
    id: 'PRJ005',
    name: 'Risk Assessment Model',
    userId: 'USR001',
    userName: 'John Doe',
    createdDate: '20/02/2024, 12:00:00',
    lastUpdated: '04/08/2024, 11:30:45',
    status: 'On Hold',
    totalConversations: 9,
    totalNotes: 4,
    description: 'Development of comprehensive risk assessment framework'
  },
];

export function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'Completed': 'secondary',
      'On Hold': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
          <CardDescription>Monitor and manage all user projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>Create Project</Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Conversations</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        {project.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.userName}</p>
                        <p className="text-sm text-muted-foreground">{project.userId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{project.createdDate}</TableCell>
                    <TableCell className="text-sm">{project.lastUpdated}</TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="text-center">{project.totalConversations}</TableCell>
                    <TableCell className="text-center">{project.totalNotes}</TableCell>
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
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Project Details - {project.name}</DialogTitle>
                                <DialogDescription>Complete project information and statistics</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium">Project ID</label>
                                      <p className="text-sm text-muted-foreground">{project.id}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Project Name</label>
                                      <p className="text-sm text-muted-foreground">{project.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Owner</label>
                                      <p className="text-sm text-muted-foreground">{project.userName} ({project.userId})</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Created Date</label>
                                      <p className="text-sm text-muted-foreground">{project.createdDate}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium">Last Updated</label>
                                      <p className="text-sm text-muted-foreground">{project.lastUpdated}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <div className="mt-1">{getStatusBadge(project.status)}</div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Conversations</label>
                                      <p className="text-sm text-muted-foreground">{project.totalConversations}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Notes</label>
                                      <p className="text-sm text-muted-foreground">{project.totalNotes}</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Project
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