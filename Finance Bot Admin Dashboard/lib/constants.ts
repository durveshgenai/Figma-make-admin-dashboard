import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  CreditCard, 
  BarChart3,
  Shield,
  Activity,
  HelpCircle,
  Mail,
  Settings,
  Plug,
  UserCog,
  Flag,
  Brain
} from 'lucide-react';
import { SidebarItem } from './types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['SuperAdmin', 'Support', 'Finance', 'Analyst'] },
  { id: 'users', label: 'User Management', icon: Users, roles: ['SuperAdmin', 'Support'] },
  { id: 'projects', label: 'Projects & PDFs', icon: FolderOpen, roles: ['SuperAdmin', 'Support', 'Analyst'] },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare, roles: ['SuperAdmin', 'Support'] },
  { id: 'payments', label: 'Payments & Subscriptions', icon: CreditCard, roles: ['SuperAdmin', 'Finance'] },
  { id: 'support', label: 'Support', icon: HelpCircle, roles: ['SuperAdmin', 'Support'] },
  { id: 'notifications', label: 'Notifications', icon: Mail, roles: ['SuperAdmin', 'Support'] },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, roles: ['SuperAdmin', 'Finance', 'Analyst'] },
  { id: 'query-flagging', label: 'Query Flagging', icon: Flag, roles: ['SuperAdmin', 'Support'] },
  { id: 'bot-settings', label: 'Bot Settings', icon: Brain, roles: ['SuperAdmin', 'Support'] },
  { id: 'security', label: 'Security & Compliance', icon: Shield, roles: ['SuperAdmin'] },
  { id: 'reliability', label: 'Reliability & Monitoring', icon: Activity, roles: ['SuperAdmin', 'Support'] },
  { id: 'integrations', label: 'Integrations', icon: Plug, roles: ['SuperAdmin', 'Support'] },
  { id: 'team', label: 'Team Management', icon: UserCog, roles: ['SuperAdmin'] },
  { id: 'settings', label: 'Account Settings', icon: Settings, roles: ['SuperAdmin', 'Support', 'Finance', 'Analyst'] },
];

export const DEFAULT_NOTIFICATIONS_COUNT = 3;
export const DEFAULT_SIDEBAR_WIDTH = 'w-64';