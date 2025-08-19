import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { 
  UserPlus, 
  Mail, 
  Shield, 
  User, 
  Settings, 
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Send,
  Copy,
  RefreshCw
} from 'lucide-react';

interface TeamManagementProps {
  useIST: boolean;
  userRole: string;
}

const mockTeamMembers = [
  {
    id: 'TM-001',
    name: 'Rajesh Kumar',
    email: 'rajesh@financebot.com',
    role: 'SuperAdmin',
    status: 'Active',
    lastLogin: '2024-01-07T14:30:00Z',
    joinedAt: '2024-01-01T10:00:00Z',
    permissions: ['All Access'],
    avatar: null,
    mfaEnabled: true,
    loginCount: 847
  },
  {
    id: 'TM-002',
    name: 'Priya Sharma',
    email: 'priya@financebot.com',
    role: 'Support',
    status: 'Active',
    lastLogin: '2024-01-07T13:45:00Z',
    joinedAt: '2024-01-02T11:00:00Z',
    permissions: ['Users', 'Support', 'Analytics'],
    avatar: null,
    mfaEnabled: true,
    loginCount: 234
  },
  {
    id: 'TM-003',
    name: 'Amit Patel',
    email: 'amit@financebot.com',
    role: 'Finance',
    status: 'Active',
    lastLogin: '2024-01-07T12:15:00Z',
    joinedAt: '2024-01-03T09:30:00Z',
    permissions: ['Payments', 'Analytics', 'Reports'],
    avatar: null,
    mfaEnabled: false,
    loginCount: 156
  },
  {
    id: 'TM-004',
    name: 'Sarah Johnson',
    email: 'sarah@financebot.com',
    role: 'Analyst',
    status: 'Invited',
    lastLogin: null,
    joinedAt: '2024-01-06T16:20:00Z',
    permissions: ['Analytics', 'Reports'],
    avatar: null,
    mfaEnabled: false,
    loginCount: 0
  }
];

const mockInvitations = [
  {
    id: 'INV-001',
    email: 'dev@company.com',
    role: 'Support',
    status: 'Pending',
    invitedBy: 'Rajesh Kumar',
    invitedAt: '2024-01-06T14:30:00Z',
    expiresAt: '2024-01-13T14:30:00Z'
  },
  {
    id: 'INV-002',
    email: 'finance@company.com',
    role: 'Finance',
    status: 'Expired',
    invitedBy: 'Rajesh Kumar',
    invitedAt: '2024-01-01T10:00:00Z',
    expiresAt: '2024-01-08T10:00:00Z'
  }
];

const rolePermissions = {
  SuperAdmin: {
    description: 'Full access to all features and settings',
    permissions: [
      'User Management',
      'Security & Compliance',
      'Team Management',
      'System Configuration',
      'All Analytics',
      'Billing & Payments',
      'Support Management',
      'Integrations',
      'Audit Logs'
    ]
  },
  Support: {
    description: 'User support and basic analytics access',
    permissions: [
      'User Management',
      'Support Tickets',
      'Basic Analytics',
      'Conversations',
      'PDF Management'
    ]
  },
  Finance: {
    description: 'Financial data and payment management access',
    permissions: [
      'Payments & Subscriptions',
      'Financial Analytics',
      'Billing Management',
      'Revenue Reports'
    ]
  },
  Analyst: {
    description: 'Analytics and reporting access only',
    permissions: [
      'Analytics & Reports',
      'Usage Statistics',
      'Performance Metrics',
      'Data Export'
    ]
  }
};

export function TeamManagement({ useIST, userRole }: TeamManagementProps) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: '',
    role: 'Support',
    message: ''
  });

  const teamColumns = [
    { key: 'avatar', label: '', width: '60px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, filterable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
    { key: 'lastLogin', label: 'Last Login', sortable: true, width: '150px' },
    { key: 'mfaStatus', label: 'MFA', sortable: false, width: '80px' },
    { key: 'loginCount', label: 'Logins', sortable: true, width: '80px' }
  ];

  const invitationColumns = [
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
    { key: 'invitedBy', label: 'Invited By', sortable: true, width: '150px' },
    { key: 'invitedAt', label: 'Invited At', sortable: true, width: '150px' },
    { key: 'expiresAt', label: 'Expires At', sortable: true, width: '150px' }
  ];

  const getRoleBadge = (role: string) => {
    const colors = {
      'SuperAdmin': 'bg-purple-100 text-purple-800 border-purple-200',
      'Support': 'bg-blue-100 text-blue-800 border-blue-200',
      'Finance': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Analyst': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    
    const icon = role === 'SuperAdmin' ? <Crown className="h-3 w-3" /> : <User className="h-3 w-3" />;
    
    return (
      <Badge className={`${colors[role] || colors['Support']} flex items-center gap-1`}>
        {icon}
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': { className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      'Inactive': { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircle },
      'Invited': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      'Pending': { className: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
      'Expired': { className: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
    };
    
    const config = variants[status] || { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertTriangle };
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const enhancedTeamData = mockTeamMembers.map(member => ({
    ...member,
    avatar: (
      <Avatar className="h-8 w-8">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
    ),
    role: getRoleBadge(member.role),
    status: getStatusBadge(member.status),
    lastLogin: member.lastLogin ? (
      <TimeDisplay timestamp={member.lastLogin} useIST={useIST} format="relative" />
    ) : (
      <span className="text-muted-foreground">Never</span>
    ),
    mfaStatus: (
      <Badge variant={member.mfaEnabled ? 'default' : 'outline'} className="text-xs">
        {member.mfaEnabled ? 'On' : 'Off'}
      </Badge>
    )
  }));

  const enhancedInvitationData = mockInvitations.map(invitation => ({
    ...invitation,
    status: getStatusBadge(invitation.status),
    invitedAt: <TimeDisplay timestamp={invitation.invitedAt} useIST={useIST} format="relative" />,
    expiresAt: <TimeDisplay timestamp={invitation.expiresAt} useIST={useIST} format="relative" />
  }));

  const teamFilters = [
    {
      key: 'role',
      label: 'Role',
      type: 'select' as const,
      options: [
        { value: 'SuperAdmin', label: 'SuperAdmin' },
        { value: 'Support', label: 'Support' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Analyst', label: 'Analyst' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Invited', label: 'Invited' }
      ]
    }
  ];

  const invitationFilters = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Pending', label: 'Pending' },
        { value: 'Expired', label: 'Expired' }
      ]
    }
  ];

  const teamActions = [
    {
      key: 'view',
      label: 'View Profile',
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: 'edit',
      label: 'Edit User',
      icon: <Edit className="h-4 w-4" />
    },
    {
      key: 'delete',
      label: 'Remove User',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const
    }
  ];

  const invitationActions = [
    {
      key: 'resend',
      label: 'Resend Invitation',
      icon: <Send className="h-4 w-4" />
    },
    {
      key: 'copy',
      label: 'Copy Link',
      icon: <Copy className="h-4 w-4" />
    },
    {
      key: 'revoke',
      label: 'Revoke Invitation',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const
    }
  ];

  const handleTeamAction = (action: string, member: any) => {
    if (action === 'view') {
      setSelectedMember(member);
    }
    console.log('Team action:', action, member);
  };

  const handleInvitationAction = (action: string, invitation: any) => {
    console.log('Invitation action:', action, invitation);
  };

  const sendInvitation = () => {
    console.log('Sending invitation:', newInvite);
    setShowInviteDialog(false);
    setNewInvite({ email: '', role: 'Support', message: '' });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="team" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>
          
          <Button onClick={() => setShowInviteDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>

        <TabsContent value="team" className="space-y-6">
          {/* Team Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">MFA Enabled</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Pending Invites</p>
              </CardContent>
            </Card>
          </div>

          <EnhancedTable
            title="Team Members"
            description="Manage your admin team members and their access"
            columns={teamColumns}
            data={enhancedTeamData}
            onRowAction={handleTeamAction}
            searchPlaceholder="Search team members..."
            filters={teamFilters}
            actions={teamActions}
          />
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <EnhancedTable
            title="Team Invitations"
            description="Manage pending and expired team invitations"
            columns={invitationColumns}
            data={enhancedInvitationData}
            onRowAction={handleInvitationAction}
            searchPlaceholder="Search invitations..."
            filters={invitationFilters}
            actions={invitationActions}
          />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(rolePermissions).map(([role, details]) => (
              <Card key={role}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getRoleBadge(role)}
                    {role}
                  </CardTitle>
                  <CardDescription>{details.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permissions:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {details.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {permission}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Invite Team Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your admin team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email"
                placeholder="colleague@company.com"
                value={newInvite.email}
                onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Select value={newInvite.role} onValueChange={(value) => setNewInvite(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  {userRole === 'SuperAdmin' && (
                    <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {newInvite.role && (
                <p className="text-xs text-muted-foreground mt-1">
                  {rolePermissions[newInvite.role]?.description}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Personal Message (Optional)</label>
              <Input 
                placeholder="Welcome to the team!"
                value={newInvite.message}
                onChange={(e) => setNewInvite(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={sendInvitation} disabled={!newInvite.email}>
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team Member Profile Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Team Member Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedMember.name}</h3>
                  <p className="text-muted-foreground">{selectedMember.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getRoleBadge(selectedMember.role)}
                    {getStatusBadge(selectedMember.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Joined</p>
                  <p className="text-sm text-muted-foreground">
                    <TimeDisplay timestamp={selectedMember.joinedAt} useIST={useIST} format="date" />
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Login</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMember.lastLogin ? (
                      <TimeDisplay timestamp={selectedMember.lastLogin} useIST={useIST} format="relative" />
                    ) : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Logins</p>
                  <p className="text-sm text-muted-foreground">{selectedMember.loginCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">MFA Status</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMember.mfaEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => console.log('Edit user')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
                <Button variant="outline" onClick={() => console.log('Reset MFA')}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset MFA
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}