import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import { Bot } from 'lucide-react';
import { UserRole } from '../lib/types';
import { SIDEBAR_ITEMS } from '../lib/constants';
import { filterSidebarItemsByRole } from '../lib/app-utils';

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userRole: UserRole;
}

export function AppSidebar({ activeSection, setActiveSection, userRole }: AppSidebarProps) {
  const filteredSidebarItems = filterSidebarItemsByRole(SIDEBAR_ITEMS, userRole);

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Bot className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">Finance Bot</h2>
            <p className="text-sm text-sidebar-foreground/70">Admin Console</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-sidebar">
        <SidebarMenu className="p-2 space-y-1">
          {filteredSidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveSection(item.id)}
                  isActive={isActive}
                  className={`
                    w-full justify-start px-3 py-2 rounded-md transition-all duration-200
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-sidebar-primary' : ''}`} />
                  <span className="text-sm">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}