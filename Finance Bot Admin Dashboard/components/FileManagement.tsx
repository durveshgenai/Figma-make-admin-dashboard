import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  Edit, 
  Lock, 
  Unlock,
  Users,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  History,
  Settings,
  Calendar,
  Archive,
  UserCheck,
  Globe,
  ChevronRight
} from 'lucide-react';

interface FileManagementProps {
  useIST: boolean;
  userRole: string;
}

const mockDocuments = [
  {
    id: 'DOC-001',
    name: 'Annual Report 2023.pdf',
    size: '4.2 MB',
    type: 'PDF',
    uploadedBy: 'admin@company.com',
    uploadedAt: '2024-01-01T10:00:00Z',
    lastModified: '2024-01-05T14:30:00Z',
    version: '2.1',
    status: 'Active',
    accessLevel: 'Public',
    downloads: 1247,
    queries: 3456,
    retentionPolicy: 'Keep 7 years',
    expiresAt: '2031-01-01T00:00:00Z',
    tags: ['Annual Report', 'Financial', '2023'],
    userGroups: ['Finance Team', 'Management', 'Auditors'],
    versions: [
      { version: '2.1', uploadedAt: '2024-01-05T14:30:00Z', uploadedBy: 'admin@company.com', changes: 'Updated Q4 financial data' },
      { version: '2.0', uploadedAt: '2024-01-03T09:15:00Z', uploadedBy: 'finance@company.com', changes: 'Added executive summary' },
      { version: '1.0', uploadedAt: '2024-01-01T10:00:00Z', uploadedBy: 'admin@company.com', changes: 'Initial upload' }
    ]
  },
  {
    id: 'DOC-002',
    name: 'Q3 2023 Financial Statement.pdf',
    size: '2.8 MB',
    type: 'PDF',
    uploadedBy: 'finance@company.com',
    uploadedAt: '2023-10-15T11:30:00Z',
    lastModified: '2023-10-15T11:30:00Z',
    version: '1.0',
    status: 'Archived',
    accessLevel: 'Restricted',
    downloads: 543,
    queries: 1234,
    retentionPolicy: 'Delete after 5 years',
    expiresAt: '2028-10-15T00:00:00Z',
    tags: ['Q3', 'Financial Statement', '2023'],
    userGroups: ['Finance Team', 'Management'],
    versions: [
      { version: '1.0', uploadedAt: '2023-10-15T11:30:00Z', uploadedBy: 'finance@company.com', changes: 'Initial upload' }
    ]
  },
  {
    id: 'DOC-003',
    name: 'Budget Planning 2024.xlsx',
    size: '1.5 MB',
    type: 'Excel',
    uploadedBy: 'planning@company.com',
    uploadedAt: '2023-11-20T16:45:00Z',
    lastModified: '2024-01-07T10:20:00Z',
    version: '3.2',
    status: 'Expiring Soon',
    accessLevel: 'Restricted',
    downloads: 89,
    queries: 456,
    retentionPolicy: 'Delete after 2 years',
    expiresAt: '2024-01-20T00:00:00Z',
    tags: ['Budget', 'Planning', '2024'],
    userGroups: ['Finance Team', 'Planning Team'],
    versions: [
      { version: '3.2', uploadedAt: '2024-01-07T10:20:00Z', uploadedBy: 'admin@company.com', changes: 'Updated departmental allocations' },
      { version: '3.1', uploadedAt: '2023-12-15T14:30:00Z', uploadedBy: 'planning@company.com', changes: 'Revised Q1 projections' },
      { version: '3.0', uploadedAt: '2023-12-01T09:00:00Z', uploadedBy: 'planning@company.com', changes: 'Major restructure of budget categories' }
    ]
  }
];

const userGroups = [
  { id: 'finance', name: 'Finance Team', members: 12 },
  { id: 'management', name: 'Management', members: 8 },
  { id: 'auditors', name: 'Auditors', members: 5 },
  { id: 'planning', name: 'Planning Team', members: 6 },
  { id: 'legal', name: 'Legal Team', members: 4 }
];

const retentionPolicies = [
  { id: 'keep-1y', name: 'Keep 1 year', description: 'Delete after 1 year' },
  { id: 'keep-2y', name: 'Keep 2 years', description: 'Delete after 2 years' },
  { id: 'keep-5y', name: 'Keep 5 years', description: 'Delete after 5 years' },
  { id: 'keep-7y', name: 'Keep 7 years', description: 'Delete after 7 years (compliance)' },
  { id: 'keep-10y', name: 'Keep 10 years', description: 'Delete after 10 years (legal)' },
  { id: 'keep-forever', name: 'Keep forever', description: 'Never delete automatically' }
];

export function FileManagement({ useIST, userRole }: FileManagementProps) {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAccessRules, setShowAccessRules] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showRetentionSettings, setShowRetentionSettings] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': { className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      'Archived': { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: Archive },
      'Expiring Soon': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      'Expired': { className: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle }
    };
    
    const config = variants[status] || variants['Active'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getAccessBadge = (level: string) => {
    const variants = {
      'Public': { className: 'bg-blue-100 text-blue-800 border-blue-200', icon: Globe },
      'Restricted': { className: 'bg-orange-100 text-orange-800 border-orange-200', icon: Lock },
      'Private': { className: 'bg-red-100 text-red-800 border-red-200', icon: Shield }
    };
    
    const config = variants[level] || variants['Public'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {level}
      </Badge>
    );
  };

  const columns = [
    { key: 'name', label: 'Document', sortable: true },
    { key: 'version', label: 'Version', sortable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '120px' },
    { key: 'accessLevel', label: 'Access', sortable: true, filterable: true, width: '100px' },
    { key: 'size', label: 'Size', sortable: true, width: '80px' },
    { key: 'queries', label: 'Queries', sortable: true, width: '80px' },
    { key: 'lastModified', label: 'Modified', sortable: true, width: '130px' },
    { key: 'expiresAt', label: 'Expires', sortable: true, width: '130px' }
  ];

  const enhancedData = mockDocuments.map(doc => ({
    ...doc,
    name: (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-blue-500" />
        <div>
          <p className="font-medium">{doc.name}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {doc.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
    status: getStatusBadge(doc.status),
    accessLevel: getAccessBadge(doc.accessLevel),
    lastModified: <TimeDisplay timestamp={doc.lastModified} useIST={useIST} format="relative" />,
    expiresAt: <TimeDisplay timestamp={doc.expiresAt} useIST={useIST} format="date" />
  }));

  const filters = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Archived', label: 'Archived' },
        { value: 'Expiring Soon', label: 'Expiring Soon' },
        { value: 'Expired', label: 'Expired' }
      ]
    },
    {
      key: 'accessLevel',
      label: 'Access Level',
      type: 'select' as const,
      options: [
        { value: 'Public', label: 'Public' },
        { value: 'Restricted', label: 'Restricted' },
        { value: 'Private', label: 'Private' }
      ]
    },
    {
      key: 'type',
      label: 'File Type',
      type: 'select' as const,
      options: [
        { value: 'PDF', label: 'PDF' },
        { value: 'Excel', label: 'Excel' },
        { value: 'Word', label: 'Word' },
        { value: 'PowerPoint', label: 'PowerPoint' }
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
      key: 'history',
      label: 'Version History',
      icon: <History className="h-4 w-4" />
    },
    {
      key: 'replace',
      label: 'Replace Version',
      icon: <Upload className="h-4 w-4" />
    },
    {
      key: 'access',
      label: 'Access Rules',
      icon: <Users className="h-4 w-4" />
    },
    {
      key: 'download',
      label: 'Download',
      icon: <Download className="h-4 w-4" />
    }
  ];

  const handleAction = (action: string, document: any) => {
    const originalDoc = mockDocuments.find(d => d.id === document.id);
    setSelectedDocument(originalDoc);
    
    switch (action) {
      case 'view':
        // View details handled by selectedDocument state
        break;
      case 'history':
        setShowVersionHistory(true);
        break;
      case 'replace':
        setShowReplaceDialog(true);
        break;
      case 'access':
        setShowAccessRules(true);
        break;
      case 'download':
        console.log('Downloading:', document.name);
        break;
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowReplaceDialog(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="access">Access Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <EnhancedTable
            title="Document Library"
            description="Manage documents with version control and access permissions"
            columns={columns}
            data={enhancedData}
            onRowAction={handleAction}
            searchPlaceholder="Search documents, tags, or content..."
            filters={filters}
            actions={actions}
          />
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Archive className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Trash2 className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">145</p>
                <p className="text-sm text-muted-foreground">Auto-Deleted (30d)</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Retention Policies</CardTitle>
                  <CardDescription>Automatic document lifecycle management</CardDescription>
                </div>
                <Button onClick={() => setShowRetentionSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Policies
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retentionPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{policy.name}</p>
                      <p className="text-sm text-muted-foreground">{policy.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {policy.id === 'keep-7y' ? '1,247' : policy.id === 'keep-5y' ? '543' : '89'} docs
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deletions</CardTitle>
              <CardDescription>Documents scheduled for automatic deletion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDocuments
                  .filter(doc => doc.status === 'Expiring Soon')
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded bg-yellow-50 dark:bg-yellow-900/20">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Expires: <TimeDisplay timestamp={doc.expiresAt} useIST={useIST} format="date" />
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Extend
                        </Button>
                        <Button size="sm" variant="outline">
                          Archive Now
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Groups</CardTitle>
              <CardDescription>Manage access groups for document permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userGroups.map((group) => (
                  <Card key={group.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{group.name}</h4>
                        <UserCheck className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">{group.members} members</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full">
                        Manage Group
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Permissions Summary</CardTitle>
              <CardDescription>Overview of document access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>Public Access</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1,247 documents</p>
                    <p className="text-sm text-muted-foreground">Available to all users</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-orange-500" />
                    <span>Restricted Access</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1,089 documents</p>
                    <p className="text-sm text-muted-foreground">Limited to specific groups</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <span>Private Access</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">511 documents</p>
                    <p className="text-sm text-muted-foreground">Admin only</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Audit Trail</CardTitle>
              <CardDescription>Track all document operations and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'Document Deleted', document: 'Old Budget 2022.xlsx', user: 'system@company.com', timestamp: '2024-01-07T15:00:00Z', reason: 'Retention policy: Keep 2 years' },
                  { action: 'Access Changed', document: 'Annual Report 2023.pdf', user: 'admin@company.com', timestamp: '2024-01-07T14:45:00Z', reason: 'Changed from Restricted to Public' },
                  { action: 'Version Replaced', document: 'Q3 Financial Statement.pdf', user: 'finance@company.com', timestamp: '2024-01-07T14:30:00Z', reason: 'Version 2.1 uploaded' },
                  { action: 'Document Downloaded', document: 'Budget Planning 2024.xlsx', user: 'john.doe@company.com', timestamp: '2024-01-07T14:15:00Z', reason: 'User download' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.document}</p>
                      <p className="text-xs text-muted-foreground">{log.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.user}</p>
                      <p className="text-xs text-muted-foreground">
                        <TimeDisplay timestamp={log.timestamp} useIST={useIST} format="relative" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Version History Dialog */}
      <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Version History - {selectedDocument?.name}</DialogTitle>
            <DialogDescription>View and manage document versions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedDocument?.versions.map((version, index) => (
              <div key={version.version} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <Badge variant={index === 0 ? 'default' : 'outline'}>
                    v{version.version}
                  </Badge>
                  <div>
                    <p className="font-medium">{version.changes}</p>
                    <p className="text-sm text-muted-foreground">
                      by {version.uploadedBy} • <TimeDisplay timestamp={version.uploadedAt} useIST={useIST} format="relative" />
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {index !== 0 && (
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Replace Document Dialog */}
      <Dialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace Document Version</DialogTitle>
            <DialogDescription>Upload a new version of {selectedDocument?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
            </div>
            
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Version Notes</label>
              <Input placeholder="Describe what changed in this version..." className="mt-1" />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReplaceDialog(false)}>
                Cancel
              </Button>
              <Button onClick={simulateUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Version
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Access Rules Dialog */}
      <Dialog open={showAccessRules} onOpenChange={setShowAccessRules}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Access Rules - {selectedDocument?.name}</DialogTitle>
            <DialogDescription>Configure who can access this document</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Access Level</label>
              <Select defaultValue={selectedDocument?.accessLevel.toLowerCase()}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Available to all users</SelectItem>
                  <SelectItem value="restricted">Restricted - Limited to specific groups</SelectItem>
                  <SelectItem value="private">Private - Admin only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Authorized User Groups</label>
              <div className="space-y-2">
                {userGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={selectedDocument?.userGroups.includes(group.name)}
                        readOnly
                      />
                      <span>{group.name}</span>
                      <Badge variant="outline" className="text-xs">{group.members} members</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAccessRules(false)}>
                Cancel
              </Button>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Save Access Rules
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}