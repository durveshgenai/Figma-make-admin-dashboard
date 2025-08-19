import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Settings, 
  Brain, 
  MessageSquare, 
  FileText, 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit,
  Info,
  BookOpen,
  Target,
  Zap,
  Clock,
  AlertCircle
} from 'lucide-react';

interface BotSettingsProps {
  useIST: boolean;
  userRole: string;
}

const botConfiguration = {
  responseLength: 150, // words
  maxResponseLength: 500,
  minResponseLength: 50,
  referenceFormat: 'detailed', // detailed, brief, none
  includePageNumbers: true,
  includeDocumentTitles: true,
  confidenceThreshold: 0.8,
  maxDocumentsPerQuery: 5,
  enableFollowUpQuestions: true,
  responseTimeout: 30, // seconds
  retryAttempts: 3
};

const customInstructions = [
  {
    id: 'CI-001',
    category: 'Financial Terms',
    term: 'ROI',
    definition: 'Return on Investment - a performance measure used to evaluate the efficiency of an investment',
    instructions: 'Always provide the calculation formula and context when mentioning ROI',
    active: true,
    priority: 'High'
  },
  {
    id: 'CI-002',
    category: 'Response Style',
    term: 'Executive Summary',
    definition: 'Brief overview of key points for leadership consumption',
    instructions: 'Limit to 3-4 bullet points with quantitative data when possible',
    active: true,
    priority: 'Medium'
  },
  {
    id: 'CI-003',
    category: 'Financial Terms',
    term: 'EBITDA',
    definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization',
    instructions: 'Explain components and use in financial analysis context',
    active: true,
    priority: 'High'
  },
  {
    id: 'CI-004',
    category: 'Compliance',
    term: 'Regulatory Compliance',
    definition: 'Adherence to laws, regulations, guidelines and specifications',
    instructions: 'Always mention applicable regulations (SOX, GAAP, IFRS) when relevant',
    active: false,
    priority: 'Medium'
  }
];

const responseTemplates = [
  {
    id: 'RT-001',
    name: 'Financial Analysis',
    template: 'Based on the analysis of {document_name}, the key findings are:\n\n• {finding_1}\n• {finding_2}\n• {finding_3}\n\nSource: Page {page_number} of {document_title}',
    variables: ['document_name', 'finding_1', 'finding_2', 'finding_3', 'page_number', 'document_title'],
    active: true
  },
  {
    id: 'RT-002',
    name: 'Data Query Response',
    template: 'The requested data shows:\n\n{data_summary}\n\nThis information is from {source_reference} and was last updated on {date}.',
    variables: ['data_summary', 'source_reference', 'date'],
    active: true
  },
  {
    id: 'RT-003',
    name: 'Calculation Result',
    template: 'Calculation: {calculation_name}\nResult: {result}\nFormula: {formula}\n\nBased on data from {source_document}, Page {page_number}',
    variables: ['calculation_name', 'result', 'formula', 'source_document', 'page_number'],
    active: false
  }
];

export function BotSettings({ useIST, userRole }: BotSettingsProps) {
  const [config, setConfig] = useState(botConfiguration);
  const [instructions, setInstructions] = useState(customInstructions);
  const [templates, setTemplates] = useState(responseTemplates);
  const [newInstruction, setNewInstruction] = useState({
    category: '',
    term: '',
    definition: '',
    instructions: '',
    priority: 'Medium'
  });
  const [showAddInstructionDialog, setShowAddInstructionDialog] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const saveConfiguration = () => {
    console.log('Saving bot configuration:', config);
    setHasUnsavedChanges(false);
    // Implement API call to save configuration
  };

  const resetToDefaults = () => {
    setConfig(botConfiguration);
    setHasUnsavedChanges(false);
  };

  const addCustomInstruction = () => {
    const instruction = {
      id: `CI-${Date.now()}`,
      ...newInstruction,
      active: true
    };
    setInstructions(prev => [...prev, instruction]);
    setNewInstruction({ category: '', term: '', definition: '', instructions: '', priority: 'Medium' });
    setShowAddInstructionDialog(false);
  };

  const toggleInstruction = (id: string) => {
    setInstructions(prev => 
      prev.map(inst => 
        inst.id === id ? { ...inst, active: !inst.active } : inst
      )
    );
  };

  const deleteInstruction = (id: string) => {
    setInstructions(prev => prev.filter(inst => inst.id !== id));
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: 'bg-red-100 text-red-800 border-red-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <Badge className={colors[priority] || colors.Medium}>
        {priority}
      </Badge>
    );
  };

  if (userRole !== 'SuperAdmin' && userRole !== 'Support') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Access Restricted</h3>
          <p className="text-muted-foreground">Only SuperAdmin and Support roles can access bot settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasUnsavedChanges && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have unsaved changes. Don't forget to save your configuration.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="instructions">Custom Instructions</TabsTrigger>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Response Configuration
              </CardTitle>
              <CardDescription>
                Configure how the bot generates and formats responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Response Length: {config.responseLength} words
                  </label>
                  <Slider
                    value={[config.responseLength]}
                    onValueChange={([value]) => updateConfig('responseLength', value)}
                    max={config.maxResponseLength}
                    min={config.minResponseLength}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{config.minResponseLength} words</span>
                    <span>{config.maxResponseLength} words</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Reference Format</label>
                    <Select 
                      value={config.referenceFormat} 
                      onValueChange={(value) => updateConfig('referenceFormat', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detailed">Detailed (Page 12 of Annual Report 2024)</SelectItem>
                        <SelectItem value="brief">Brief (p. 12, AR 2024)</SelectItem>
                        <SelectItem value="none">No References</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Max Documents per Query</label>
                    <Select 
                      value={config.maxDocumentsPerQuery.toString()} 
                      onValueChange={(value) => updateConfig('maxDocumentsPerQuery', parseInt(value))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Documents</SelectItem>
                        <SelectItem value="5">5 Documents</SelectItem>
                        <SelectItem value="10">10 Documents</SelectItem>
                        <SelectItem value="15">15 Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Include Page Numbers</p>
                      <p className="text-xs text-muted-foreground">Show page references in responses</p>
                    </div>
                    <Switch
                      checked={config.includePageNumbers}
                      onCheckedChange={(checked) => updateConfig('includePageNumbers', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Include Document Titles</p>
                      <p className="text-xs text-muted-foreground">Show document names in responses</p>
                    </div>
                    <Switch
                      checked={config.includeDocumentTitles}
                      onCheckedChange={(checked) => updateConfig('includeDocumentTitles', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enable Follow-up Questions</p>
                      <p className="text-xs text-muted-foreground">Suggest related questions to users</p>
                    </div>
                    <Switch
                      checked={config.enableFollowUpQuestions}
                      onCheckedChange={(checked) => updateConfig('enableFollowUpQuestions', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance Settings
              </CardTitle>
              <CardDescription>
                Configure performance and quality thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Confidence Threshold: {Math.round(config.confidenceThreshold * 100)}%
                </label>
                <Slider
                  value={[config.confidenceThreshold]}
                  onValueChange={([value]) => updateConfig('confidenceThreshold', value)}
                  max={1}
                  min={0.5}
                  step={0.05}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum confidence required to provide an answer
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Response Timeout (seconds)</label>
                  <Input
                    type="number"
                    value={config.responseTimeout}
                    onChange={(e) => updateConfig('responseTimeout', parseInt(e.target.value))}
                    min={10}
                    max={120}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Retry Attempts</label>
                  <Input
                    type="number"
                    value={config.retryAttempts}
                    onChange={(e) => updateConfig('retryAttempts', parseInt(e.target.value))}
                    min={1}
                    max={5}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={saveConfiguration} disabled={!hasUnsavedChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="instructions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Custom Instructions
                  </CardTitle>
                  <CardDescription>
                    Define financial domain-specific terms and response rules
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddInstructionDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Instruction
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instructions.map((instruction) => (
                  <div key={instruction.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{instruction.category}</Badge>
                        {getPriorityBadge(instruction.priority)}
                        <Switch
                          checked={instruction.active}
                          onCheckedChange={() => toggleInstruction(instruction.id)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteInstruction(instruction.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="font-medium mb-2">{instruction.term}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{instruction.definition}</p>
                    <div className="bg-muted p-3 rounded text-sm">
                      <strong>Instructions:</strong> {instruction.instructions}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Response Templates
                  </CardTitle>
                  <CardDescription>
                    Pre-defined response formats for common query types
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Switch
                          checked={template.active}
                          onCheckedChange={() => {
                            setTemplates(prev => 
                              prev.map(t => 
                                t.id === template.id ? { ...t, active: !t.active } : t
                              )
                            );
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded text-sm font-mono mb-3">
                      {template.template}
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {'{' + variable + '}'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>
                Advanced settings for experienced administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  These settings can significantly impact bot performance. Please test thoroughly before applying to production.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Custom Model Parameters</label>
                  <Textarea
                    placeholder="Enter JSON configuration for model parameters..."
                    className="mt-1 font-mono text-sm"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">API Endpoints</label>
                  <div className="space-y-2 mt-1">
                    <Input placeholder="Primary endpoint URL" />
                    <Input placeholder="Fallback endpoint URL" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Debug Mode</p>
                    <p className="text-xs text-muted-foreground">Enable detailed logging for troubleshooting</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Experimental Features</p>
                    <p className="text-xs text-muted-foreground">Enable beta features and optimizations</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Custom Instruction Dialog */}
      <Dialog open={showAddInstructionDialog} onOpenChange={setShowAddInstructionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Instruction</DialogTitle>
            <DialogDescription>
              Define a new financial term or response rule for the bot
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newInstruction.category} onValueChange={(value) => setNewInstruction(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financial Terms">Financial Terms</SelectItem>
                    <SelectItem value="Response Style">Response Style</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Calculations">Calculations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select value={newInstruction.priority} onValueChange={(value) => setNewInstruction(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Term/Concept</label>
              <Input
                value={newInstruction.term}
                onChange={(e) => setNewInstruction(prev => ({ ...prev, term: e.target.value }))}
                placeholder="e.g., EBITDA, ROI, Executive Summary"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Definition</label>
              <Textarea
                value={newInstruction.definition}
                onChange={(e) => setNewInstruction(prev => ({ ...prev, definition: e.target.value }))}
                placeholder="Brief definition of the term..."
                className="mt-1"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instructions for Bot</label>
              <Textarea
                value={newInstruction.instructions}
                onChange={(e) => setNewInstruction(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="How should the bot handle this term or concept..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddInstructionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addCustomInstruction} disabled={!newInstruction.term || !newInstruction.definition}>
                Add Instruction
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}