import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TimeDisplay } from './TimeDisplay';
import { 
  Github, 
  MessageSquare, 
  Zap, 
  Mail, 
  Database, 
  Cloud, 
  Webhook,
  Key,
  Settings,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  RefreshCw,
  Activity
} from 'lucide-react';

interface IntegrationsProps {
  useIST: boolean;
  userRole: string;
}

const integrationCategories = [
  {
    id: 'development',
    name: 'Development',
    icon: Github,
    integrations: [
      {
        id: 'github',
        name: 'GitHub',
        description: 'Connect to GitHub for background agents, issue management',
        icon: Github,
        status: 'connected',
        connectedAt: '2024-01-01T10:00:00Z',
        features: ['Issue tracking', 'PR management', 'Code analysis'],
        webhooks: 3,
        apiCalls: 1245
      },
      {
        id: 'gitlab',
        name: 'GitLab',
        description: 'GitLab integration for CI/CD and project management',
        icon: Database,
        status: 'available',
        features: ['Pipeline integration', 'Issue management', 'Code review']
      }
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: MessageSquare,
    integrations: [
      {
        id: 'slack',
        name: 'Slack',
        description: 'Work with background agents from Slack',
        icon: MessageSquare,
        status: 'connected',
        connectedAt: '2024-01-02T14:30:00Z',
        features: ['Bot notifications', 'Command interface', 'Channel integration'],
        webhooks: 5,
        apiCalls: 2341
      },
      {
        id: 'discord',
        name: 'Discord',
        description: 'Discord bot integration for team communication',
        icon: MessageSquare,
        status: 'available',
        features: ['Server integration', 'Bot commands', 'Voice alerts']
      },
      {
        id: 'teams',
        name: 'Microsoft Teams',
        description: 'Teams integration for enterprise communication',
        icon: MessageSquare,
        status: 'available',
        features: ['Team notifications', 'Meeting integration', 'File sharing']
      }
    ]
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: Zap,
    integrations: [
      {
        id: 'linear',
        name: 'Linear',
        description: 'Sync up background agents to work on linear issues',
        icon: Zap,
        status: 'connected',
        connectedAt: '2024-01-03T09:15:00Z',
        features: ['Issue sync', 'Progress tracking', 'Team coordination'],
        webhooks: 2,
        apiCalls: 892
      },
      {
        id: 'notion',
        name: 'Notion',
        description: 'Notion workspace integration for documentation',
        icon: Database,
        status: 'available',
        features: ['Database sync', 'Page creation', 'Content management']
      },
      {
        id: 'jira',
        name: 'Jira',
        description: 'Atlassian Jira integration for project management',
        icon: Settings,
        status: 'error',
        connectedAt: '2024-01-04T11:20:00Z',
        features: ['Ticket management', 'Sprint tracking', 'Reporting'],
        error: 'Authentication expired'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics & Monitoring',
    icon: Activity,
    integrations: [
      {
        id: 'datadog',
        name: 'Datadog',
        description: 'Application monitoring and analytics',
        icon: Activity,
        status: 'available',
        features: ['APM', 'Log management', 'Infrastructure monitoring']
      },
      {
        id: 'newrelic',
        name: 'New Relic',
        description: 'Performance monitoring and observability',
        icon: Activity,
        status: 'available',
        features: ['Performance monitoring', 'Error tracking', 'Custom dashboards']
      }
    ]
  },
  {
    id: 'storage',
    name: 'Storage & Database',
    icon: Database,
    integrations: [
      {
        id: 's3',
        name: 'Amazon S3',
        description: 'Cloud storage for files and backups',
        icon: Cloud,
        status: 'connected',
        connectedAt: '2024-01-01T00:00:00Z',
        features: ['File storage', 'Backup management', 'CDN integration'],
        webhooks: 1,
        apiCalls: 5678
      },
      {
        id: 'gcs',
        name: 'Google Cloud Storage',
        description: 'Google cloud storage integration',
        icon: Cloud,
        status: 'available',
        features: ['Object storage', 'Data archival', 'Multi-region']
      }
    ]
  }
];

const webhookLogs = [
  {
    id: 'wh-001',
    integration: 'GitHub',
    event: 'push',
    status: 'success',
    timestamp: '2024-01-07T14:30:00Z',
    response: '200 OK',
    payload: '{"ref":"refs/heads/main","commits":[...]}'
  },
  {
    id: 'wh-002',
    integration: 'Slack',
    event: 'message',
    status: 'success',
    timestamp: '2024-01-07T14:25:00Z',
    response: '200 OK',
    payload: '{"channel":"general","text":"Hello world"}'
  },
  {
    id: 'wh-003',
    integration: 'Linear',
    event: 'issue.updated',
    status: 'failed',
    timestamp: '2024-01-07T14:20:00Z',
    response: '401 Unauthorized',
    payload: '{"issue":{"id":"ISS-123"}}'
  }
];

export function Integrations({ useIST, userRole }: IntegrationsProps) {
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'available':
        return <Settings className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'connected': { className: 'bg-green-100 text-green-800 border-green-200' },
      'error': { className: 'bg-red-100 text-red-800 border-red-200' },
      'available': { className: 'bg-gray-100 text-gray-800 border-gray-200' }
    };
    
    const config = variants[status] || { className: 'bg-gray-100 text-gray-800 border-gray-200' };
    
    return (
      <Badge className={config.className}>
        {status === 'connected' ? 'Connected' : status === 'error' ? 'Error' : 'Available'}
      </Badge>
    );
  };

  const handleConnect = (integration: any) => {
    console.log('Connecting to:', integration.name);
    // Implementation for OAuth/API key connection
  };

  const handleDisconnect = (integration: any) => {
    console.log('Disconnecting from:', integration.name);
    // Implementation for disconnection
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          {integrationCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CategoryIcon className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    Connect your {category.name.toLowerCase()} tools and services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.integrations.map((integration) => {
                      const IntegrationIcon = integration.icon;
                      return (
                        <Card key={integration.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <IntegrationIcon className="h-6 w-6" />
                                <h4 className="font-medium">{integration.name}</h4>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(integration.status)}
                                {getStatusBadge(integration.status)}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {integration.description}
                            </p>

                            <div className="space-y-2 mb-3">
                              <p className="text-xs font-medium text-muted-foreground">Features:</p>
                              <div className="flex flex-wrap gap-1">
                                {integration.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {integration.status === 'connected' && (
                              <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                                <p>Connected: <TimeDisplay timestamp={integration.connectedAt} useIST={useIST} format="relative" /></p>
                                {integration.webhooks && <p>Webhooks: {integration.webhooks}</p>}
                                {integration.apiCalls && <p>API Calls: {integration.apiCalls.toLocaleString()}/month</p>}
                              </div>
                            )}

                            {integration.error && (
                              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                                {integration.error}
                              </div>
                            )}

                            <div className="flex gap-2">
                              {integration.status === 'connected' ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => setSelectedIntegration(integration)}
                                  >
                                    <Settings className="h-3 w-3 mr-1" />
                                    Configure
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleDisconnect(integration)}
                                  >
                                    Disconnect
                                  </Button>
                                </>
                              ) : integration.status === 'error' ? (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleConnect(integration)}
                                >
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Reconnect
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleConnect(integration)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Connect
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhook Management</CardTitle>
                  <CardDescription>Configure and monitor webhook endpoints</CardDescription>
                </div>
                <Button onClick={() => setShowWebhookDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold">11</p>
                      <p className="text-sm text-muted-foreground">Active Webhooks</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">8.9K</p>
                      <p className="text-sm text-muted-foreground">Successful Deliveries</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-red-600">23</p>
                      <p className="text-sm text-muted-foreground">Failed Deliveries</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Webhook Activity</h4>
                  {webhookLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        {log.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{log.integration} - {log.event}</p>
                          <p className="text-sm text-muted-foreground">{log.response}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <TimeDisplay 
                          timestamp={log.timestamp} 
                          useIST={useIST} 
                          format="relative"
                          className="text-sm text-muted-foreground"
                        />
                        <Button size="sm" variant="ghost" onClick={() => console.log(log.payload)}>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API keys for external integrations</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        Generate a new API key for external service integration
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium">Key Name</label>
                        <Input placeholder="e.g., Production API Key" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea placeholder="Describe the purpose of this API key" rows={3} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Permissions</label>
                        <div className="space-y-2 mt-2">
                          {['Read Users', 'Write Users', 'Read Analytics', 'Write Analytics'].map(permission => (
                            <label key={permission} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Create Key</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Production API Key', key: 'fb_pk_1234...5678', created: '2024-01-01T10:00:00Z', lastUsed: '2024-01-07T14:30:00Z' },
                  { name: 'Development API Key', key: 'fb_dk_8765...4321', created: '2024-01-02T11:00:00Z', lastUsed: '2024-01-06T09:15:00Z' },
                  { name: 'Integration API Key', key: 'fb_ik_9876...1234', created: '2024-01-03T12:00:00Z', lastUsed: 'Never' }
                ].map((apiKey, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="font-medium">{apiKey.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{apiKey.key}</code>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(apiKey.key)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: <TimeDisplay timestamp={apiKey.created} useIST={useIST} format="date" />
                        {' '} | Last used: {apiKey.lastUsed === 'Never' ? 'Never' : <TimeDisplay timestamp={apiKey.lastUsed} useIST={useIST} format="relative" />}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Revoke</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Webhook Creation Dialog */}
      <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Webhook</DialogTitle>
            <DialogDescription>
              Set up a new webhook endpoint to receive real-time events
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Webhook URL</label>
              <Input placeholder="https://your-app.com/webhook" />
            </div>
            <div>
              <label className="text-sm font-medium">Events</label>
              <div className="space-y-2 mt-2">
                {['user.created', 'user.updated', 'payment.succeeded', 'payment.failed'].map(event => (
                  <label key={event} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm font-mono">{event}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Secret Key</label>
              <Input placeholder="Optional webhook secret for verification" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowWebhookDialog(false)}>Cancel</Button>
              <Button>Create Webhook</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}