import React from 'react';
import { DashboardOverview } from './DashboardOverview';
import { UserManagement } from './UserManagement';
import { ProjectManagement } from './ProjectManagement';
import { ConversationsNotes } from './ConversationsNotes';
import { FileManagement } from './FileManagement';
import { PaymentSubscriptions } from './PaymentSubscriptions';
import { Analytics } from './Analytics';
import { Support } from './Support';
import { Notifications } from './Notifications';
import { SecurityCompliance } from './SecurityCompliance';
import { ReliabilityMonitoring } from './ReliabilityMonitoring';
import { AccountSettings } from './AccountSettings';
import { Integrations } from './Integrations';
import { TeamManagement } from './TeamManagement';
import { BotSettings } from './BotSettings';
import { QueryFlagging } from './QueryFlagging';
import { FeedbackManagement } from './FeedbackManagement';
import { ComponentProps } from '../lib/types';

interface ContentRouterProps extends ComponentProps {
  activeSection: string;
}

export function ContentRouter({ activeSection, useIST, userRole }: ContentRouterProps) {
  const commonProps = { useIST, userRole };

  switch (activeSection) {
    case 'overview':
      return <DashboardOverview {...commonProps} />;
    case 'users':
      return <UserManagement {...commonProps} />;
    case 'projects':
      return <ProjectManagement {...commonProps} />;
    case 'conversations':
      return <ConversationsNotes {...commonProps} />;
    case 'payments':
      return <PaymentSubscriptions {...commonProps} />;
    case 'support':
      return <Support {...commonProps} />;
    case 'notifications':
      return <Notifications {...commonProps} />;
    case 'analytics':
      return <Analytics {...commonProps} />;
    case 'query-flagging':
      return <QueryFlagging {...commonProps} />;
    case 'feedback':
      return <FeedbackManagement {...commonProps} />;
    case 'bot-settings':
      return <BotSettings {...commonProps} />;
    case 'security':
      return <SecurityCompliance {...commonProps} />;
    case 'reliability':
      return <ReliabilityMonitoring {...commonProps} />;
    case 'integrations':
      return <Integrations {...commonProps} />;
    case 'team':
      return <TeamManagement {...commonProps} />;
    case 'settings':
      return <AccountSettings {...commonProps} />;
    default:
      return <DashboardOverview {...commonProps} />;
  }
}