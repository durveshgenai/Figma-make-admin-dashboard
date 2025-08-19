import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { EnhancedTable } from './EnhancedTable';
import { TimeDisplay } from './TimeDisplay';
import { 
  Flag, 
  MessageSquare, 
  ThumbsDown, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Save,
  Search,
  Filter,
  TrendingDown,
  Brain,
  Target,
  Clock,
  User,
  FileText
} from 'lucide-react';

interface QueryFlaggingProps {
  useIST: boolean;
  userRole: string;
}

const flaggedQueries = [
  {
    id: 'FQ-001',
    query: 'What is our company\'s revenue growth for the last quarter?',
    botResponse: 'Based on the financial statements, the revenue growth appears to be approximately 15% for Q3 2023.',
    userFeedback: 'This is incorrect. The actual growth was 12.5% according to our internal reports.',
    flaggedBy: 'john.doe@company.com',
    flaggedAt: '2024-01-07T14:30:00Z',
    severity: 'High',
    status: 'Under Review',
    category: 'Financial Data',
    documentRef: 'Q3-2023-Report.pdf',
    votes: { up: 2, down: 8 },
    correctedResponse: null,
    reviewedBy: null,
    reviewedAt: null
  },
  {
    id: 'FQ-002',
    query: 'Calculate the debt-to-equity ratio for our company',
    botResponse: 'The debt-to-equity ratio is 0.45 based on the latest balance sheet data.',
    userFeedback: 'The calculation method seems wrong. Should include long-term lease obligations.',
    flaggedBy: 'sarah.finance@company.com',
    flaggedAt: '2024-01-07T13:45:00Z',
    severity: 'Medium',
    status: 'Corrected',
    category: 'Calculations',
    documentRef: 'Balance-Sheet-2023.pdf',
    votes: { up: 12, down: 5 },
    correctedResponse: 'The debt-to-equity ratio is 0.52, including long-term lease obligations as per GAAP standards. This includes total debt of $45M and shareholders equity of $87M.',
    reviewedBy: 'admin@company.com',
    reviewedAt: '2024-01-07T15:20:00Z'
  },
  {
    id: 'FQ-003',
    query: 'What are the key risks mentioned in our annual report?',
    botResponse: 'The main risks include market volatility, regulatory changes, and competitive pressures.',
    userFeedback: 'Missing cybersecurity risks which were prominently mentioned in section 4.',
    flaggedBy: 'mike.compliance@company.com',
    flaggedAt: '2024-01-07T12:15:00Z',
    severity: 'Low',
    status: 'Pending Review',
    category: 'Content Completeness',
    documentRef: 'Annual-Report-2023.pdf',
    votes: { up: 6, down: 3 },
    correctedResponse: null,
    reviewedBy: null,
    reviewedAt: null
  }
];

const reviewStats = {
  totalFlagged: 145,
  underReview: 23,
  corrected: 89,
  dismissed: 33,
  averageResolutionTime: 2.4, // days
  topCategories: [
    { category: 'Financial Data', count: 45 },
    { category: 'Calculations', count: 32 },
    { category: 'Content Completeness', count: 28 },
    { category: 'Document References', count: 21 },
    { category: 'Interpretation', count: 19 }
  ]
};

export function QueryFlagging({ useIST, userRole }: QueryFlaggingProps) {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [correctionText, setCorrectionText] = useState('');
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const getSeverityBadge = (severity: string) => {
    const colors = {
      High: 'bg-red-100 text-red-800 border-red-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return <Badge className={colors[severity] || colors.Low}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Under Review': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      'Pending Review': { className: 'bg-blue-100 text-blue-800 border-blue-200', icon: AlertTriangle },
      'Corrected': { className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      'Dismissed': { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircle }
    };
    
    const config = variants[status] || variants['Pending Review'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const columns = [
    { key: 'id', label: 'ID', width: '100px' },
    { key: 'query', label: 'Query', sortable: true },
    { key: 'category', label: 'Category', sortable: true, filterable: true, width: '150px' },
    { key: 'severity', label: 'Severity', sortable: true, filterable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '130px' },
    { key: 'flaggedBy', label: 'Flagged By', sortable: true, width: '150px' },
    { key: 'flaggedAt', label: 'Flagged At', sortable: true, width: '130px' },
    { key: 'votes', label: 'Votes', width: '80px' }
  ];

  const enhancedData = flaggedQueries.map(query => ({
    ...query,
    query: (
      <div className="max-w-md">
        <p className="truncate font-medium">{query.query}</p>
        <p className="text-xs text-muted-foreground truncate">{query.userFeedback}</p>
      </div>
    ),
    severity: getSeverityBadge(query.severity),
    status: getStatusBadge(query.status),
    flaggedAt: <TimeDisplay timestamp={query.flaggedAt} useIST={useIST} format="relative" />,
    votes: (
      <div className="flex items-center gap-1">
        <span className="text-green-600 text-sm">{query.votes.up}</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-red-600 text-sm">{query.votes.down}</span>
      </div>
    )
  }));

  const filters = [
    {
      key: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'Financial Data', label: 'Financial Data' },
        { value: 'Calculations', label: 'Calculations' },
        { value: 'Content Completeness', label: 'Content Completeness' },
        { value: 'Document References', label: 'Document References' },
        { value: 'Interpretation', label: 'Interpretation' }
      ]
    },
    {
      key: 'severity',
      label: 'Severity',
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
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Pending Review', label: 'Pending Review' },
        { value: 'Corrected', label: 'Corrected' },
        { value: 'Dismissed', label: 'Dismissed' }
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
      key: 'correct',
      label: 'Add Correction',
      icon: <Edit className="h-4 w-4" />
    },
    {
      key: 'dismiss',
      label: 'Dismiss Flag',
      icon: <XCircle className="h-4 w-4" />,
      variant: 'destructive' as const
    }
  ];

  const handleAction = (action: string, query: any) => {
    if (action === 'view') {
      setSelectedQuery(query);
    } else if (action === 'correct') {
      setSelectedQuery(query);
      setShowCorrectionDialog(true);
    } else if (action === 'dismiss') {
      console.log('Dismissing flag for:', query.id);
    }
  };

  const saveCorrection = () => {
    console.log('Saving correction for:', selectedQuery?.id, correctionText);
    setShowCorrectionDialog(false);
    setCorrectionText('');
    setSelectedQuery(null);
  };

  if (userRole !== 'SuperAdmin' && userRole !== 'Support') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Access Restricted</h3>
          <p className="text-muted-foreground">Only SuperAdmin and Support roles can access query flagging.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="flagged" className="w-full">
        <TabsList>
          <TabsTrigger value="flagged">Flagged Queries</TabsTrigger>
          <TabsTrigger value="statistics">Review Statistics</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
        </TabsList>

        <TabsContent value="flagged" className="space-y-6">
          <EnhancedTable
            title="Flagged Bot Responses"
            description="Review and correct flagged bot responses for improved accuracy"
            columns={columns}
            data={enhancedData}
            onRowAction={handleAction}
            searchPlaceholder="Search flagged queries..."
            filters={filters}
            actions={actions}
          />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Flag className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{reviewStats.totalFlagged}</p>
                <p className="text-sm text-muted-foreground">Total Flagged</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{reviewStats.underReview}</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{reviewStats.corrected}</p>
                <p className="text-sm text-muted-foreground">Corrected</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{reviewStats.averageResolutionTime}d</p>
                <p className="text-sm text-muted-foreground">Avg Resolution</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Flag Categories</CardTitle>
              <CardDescription>Most common types of flagged responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reviewStats.topCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{category.category}</p>
                      <p className="text-sm text-muted-foreground">{category.count} flags</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{Math.round((category.count / reviewStats.totalFlagged) * 100)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Training Data Export
              </CardTitle>
              <CardDescription>
                Export corrected responses for model retraining
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Export Format</label>
                  <Select defaultValue="json">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date Range</label>
                  <Select defaultValue="30d">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Export Corrected Responses
                </Button>
                <Button variant="outline">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Export Negative Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Query Details Dialog */}
      {selectedQuery && !showCorrectionDialog && (
        <Dialog open={!!selectedQuery} onOpenChange={() => setSelectedQuery(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Query Details - {selectedQuery.id}</DialogTitle>
              <DialogDescription>
                Review flagged query and provide corrections
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{selectedQuery.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Severity</p>
                  {getSeverityBadge(selectedQuery.severity)}
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  {getStatusBadge(selectedQuery.status)}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Original Query</p>
                <div className="bg-muted p-3 rounded text-sm">
                  {selectedQuery.query}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Bot Response</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                  {selectedQuery.botResponse}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">User Feedback</p>
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm">
                  {selectedQuery.userFeedback}
                </div>
              </div>

              {selectedQuery.correctedResponse && (
                <div>
                  <p className="text-sm font-medium mb-2">Corrected Response</p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
                    {selectedQuery.correctedResponse}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Flagged By</p>
                  <p className="text-sm text-muted-foreground">{selectedQuery.flaggedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Document Reference</p>
                  <p className="text-sm text-muted-foreground">{selectedQuery.documentRef}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedQuery(null)}>
                  Close
                </Button>
                <Button onClick={() => setShowCorrectionDialog(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Add Correction
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Correction Dialog */}
      <Dialog open={showCorrectionDialog} onOpenChange={setShowCorrectionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Corrected Response</DialogTitle>
            <DialogDescription>
              Provide the correct response for future training
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium mb-2">Original Query</p>
              <div className="bg-muted p-3 rounded text-sm">
                {selectedQuery?.query}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Corrected Response</label>
              <Textarea
                value={correctionText}
                onChange={(e) => setCorrectionText(e.target.value)}
                placeholder="Enter the correct response that should be provided for this query..."
                className="mt-1"
                rows={6}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCorrectionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveCorrection} disabled={!correctionText.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Save Correction
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}