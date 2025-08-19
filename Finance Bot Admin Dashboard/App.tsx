import React, { useState } from 'react';
import { SidebarProvider } from './components/ui/sidebar';
import { AppHeader } from './components/AppHeader';
import { AppSidebar } from './components/AppSidebar';
import { ContentRouter } from './components/ContentRouter';
import { UserRole, Environment } from './lib/types';
import { DEFAULT_NOTIFICATIONS_COUNT } from './lib/constants';
import { toggleDarkMode as utilToggleDarkMode, filterSidebarItemsByRole } from './lib/app-utils';
import { SIDEBAR_ITEMS } from './lib/constants';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [userRole, setUserRole] = useState<UserRole>('SuperAdmin');
  const [environment, setEnvironment] = useState<Environment>('Production');
  const [useIST, setUseIST] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(DEFAULT_NOTIFICATIONS_COUNT);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    utilToggleDarkMode();
  };

  const getPageTitle = () => {
    const filteredItems = filterSidebarItemsByRole(SIDEBAR_ITEMS, userRole);
    return filteredItems.find(item => item.id === activeSection)?.label || 'Overview';
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            userRole={userRole}
          />
          
          <div className="flex-1 flex flex-col">
            <AppHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              environment={environment}
              setEnvironment={setEnvironment}
              useIST={useIST}
              setUseIST={setUseIST}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              notifications={notifications}
              userRole={userRole}
              setUserRole={setUserRole}
              setActiveSection={setActiveSection}
            />

            <main className="flex-1 overflow-auto p-6 bg-background">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-foreground">{getPageTitle()}</h1>
              </div>
              <ContentRouter 
                activeSection={activeSection}
                useIST={useIST}
                userRole={userRole}
              />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}