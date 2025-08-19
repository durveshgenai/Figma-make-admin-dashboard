import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search, Eye, Edit, Trash2, MoreHorizontal, MessageSquare, StickyNote } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const mockConversations = [
  {
    id: 'CONV001',
    projectId: 'PRJ001',
    projectName: 'Q4 Financial Analysis',
    userName: 'John Doe',
    createdDate: '20/01/2024, 10:30:00',
    lastMessage: '07/08/2024, 14:25:30',
    messageCount: 15,
    hasNotes: true
  },
  {
    id: 'CONV002',
    projectId: 'PRJ002',
    projectName: 'Investment Portfolio Review',
    userName: 'Sarah Smith',
    createdDate: '28/01/2024, 11:45:00',
    lastMessage: '06/08/2024, 16:20:15',
    messageCount: 8,
    hasNotes: false
  },
  {
    id: 'CONV003',
    projectId: 'PRJ001',
    projectName: 'Q4 Financial Analysis',
    userName: 'John Doe',
    createdDate: '05/02/2024, 09:15:00',
    lastMessage: '05/08/2024, 12:40:45',
    messageCount: 22,
    hasNotes: true
  },
  {
    id: 'CONV004',
    projectId: 'PRJ004',
    projectName: 'Expense Optimization',
    userName: 'Anna Wilson',
    createdDate: '12/02/2024, 14:20:00',
    lastMessage: '07/08/2024, 13:15:30',
    messageCount: 12,
    hasNotes: true
  },
  {
    id: 'CONV005',
    projectId: 'PRJ003',
    projectName: 'Budget Planning 2024',
    userName: 'Mike Johnson',
    createdDate: '18/02/2024, 16:00:00',
    lastMessage: '30/07/2024, 10:45:20',
    messageCount: 6,
    hasNotes: false
  },
];

const mockNotes = [
  {
    id: 'NOTE001',
    conversationId: 'CONV001',
    userId: 'USR001',
    userName: 'John Doe',
    content: 'Key insights from Q4 analysis: Revenue increased by 15%, but operating costs also rose significantly. Need to focus on cost optimization strategies.',
    createdDate: '22/01/2024, 15:30:00'
  },
  {
    id: 'NOTE002',
    conversationId: 'CONV003',
    userId: 'USR001',
    userName: 'John Doe',
    content: 'Follow-up action items: 1. Review marketing spend efficiency 2. Analyze competitor pricing strategies 3. Prepare recommendations for Q1 2024',
    createdDate: '08/02/2024, 11:20:00'
  },
  {
    id: 'NOTE003',
    conversationId: 'CONV004',
    userId: 'USR004',
    userName: 'Anna Wilson',
    content: 'Expense optimization opportunities identified: Office supplies (12% reduction possible), Software subscriptions (consolidation needed), Travel expenses (remote meeting alternatives)',
    createdDate: '15/02/2024, 13:45:00'
  },
  {
    id: 'NOTE004',
    conversationId: 'CONV001',
    userId: 'USR001',
    userName: 'John Doe',
    content: 'Updated financial projections based on latest market data. Conservative growth estimate: 8-10% for next quarter.',
    createdDate: '25/02/2024, 10:15:00'
  },
];

export function ConversationsNotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notesSearchTerm, setNotesSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotes = mockNotes.filter(note =>
    note.content.toLowerCase().includes(notesSearchTerm.toLowerCase()) ||
    note.userName.toLowerCase().includes(notesSearchTerm.toLowerCase()) ||
    note.id.toLowerCase().includes(notesSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="conversations" className="w-full">
        <TabsList>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations">
          <Card>
            <CardHeader>
              <CardTitle>Conversations Management</CardTitle>
              <CardDescription>Monitor all user conversations across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Conversation ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Last Message</TableHead>
                      <TableHead>Message Count</TableHead>
                      <TableHead>Has Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConversations.map((conversation) => (
                      <TableRow key={conversation.id}>
                        <TableCell className="font-medium">{conversation.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{conversation.projectName}</p>
                            <p className="text-sm text-muted-foreground">{conversation.projectId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{conversation.userName}</TableCell>
                        <TableCell className="text-sm">{conversation.createdDate}</TableCell>
                        <TableCell className="text-sm">{conversation.lastMessage}</TableCell>
                        <TableCell className="text-center">{conversation.messageCount}</TableCell>
                        <TableCell>
                          {conversation.hasNotes ? (
                            <Badge variant="default">
                              <StickyNote className="h-3 w-3 mr-1" />
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="secondary">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                View Chat
                              </DropdownMenuItem>
                              {conversation.hasNotes && (
                                <DropdownMenuItem>
                                  <StickyNote className="h-4 w-4 mr-2" />
                                  View Notes
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

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes Management</CardTitle>
              <CardDescription>View and manage all user notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    value={notesSearchTerm}
                    onChange={(e) => setNotesSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Note ID</TableHead>
                      <TableHead>Conversation ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Content Preview</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">{note.id}</TableCell>
                        <TableCell>{note.conversationId}</TableCell>
                        <TableCell>{note.userName}</TableCell>
                        <TableCell className="max-w-md">
                          <p className="truncate">{note.content}</p>
                        </TableCell>
                        <TableCell className="text-sm">{note.createdDate}</TableCell>
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
                                    View Full Note
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Note Details - {note.id}</DialogTitle>
                                    <DialogDescription>Complete note content and information</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Note ID</label>
                                        <p className="text-sm text-muted-foreground">{note.id}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Conversation ID</label>
                                        <p className="text-sm text-muted-foreground">{note.conversationId}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">User</label>
                                        <p className="text-sm text-muted-foreground">{note.userName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Created Date</label>
                                        <p className="text-sm text-muted-foreground">{note.createdDate}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Full Content</label>
                                      <div className="mt-2 p-3 bg-muted rounded-md">
                                        <p className="text-sm">{note.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Note
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Note
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
      </Tabs>
    </div>
  );
}