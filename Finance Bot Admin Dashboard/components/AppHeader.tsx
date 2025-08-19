import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { SidebarTrigger } from './ui/sidebar';
import { 
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import { UserRole, Environment } from '../lib/types';
import { getEnvironmentColor, getRoleColor } from '../lib/app-utils';

interface AppHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  useIST: boolean;
  setUseIST: (useIST: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  notifications: number;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setActiveSection: (section: string) => void;
}

export function AppHeader({
  searchQuery,
  setSearchQuery,
  environment,
  setEnvironment,
  useIST,
  setUseIST,
  isDarkMode,
  toggleDarkMode,
  notifications,
  userRole,
  setUserRole,
  setActiveSection
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-6 w-6" />
          
          {/* Global Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search across all data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 w-full bg-input-background border-border focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Environment Badge */}
          <Select value={environment} onValueChange={(value: Environment) => setEnvironment(value)}>
            <SelectTrigger className="w-auto h-8 border-0 shadow-none p-0">
              <Badge variant="outline" className={`px-2 py-1 text-xs font-medium ${getEnvironmentColor(environment)}`}>
                {environment}
              </Badge>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Production">Production</SelectItem>
              <SelectItem value="Staging">Staging</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
            </SelectContent>
          </Select>

          {/* IST/UTC Toggle */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/50">
            <span className="text-xs text-muted-foreground">UTC</span>
            <Switch
              checked={useIST}
              onCheckedChange={setUseIST}
              size="sm"
              aria-label="Toggle IST/UTC"
            />
            <span className="text-xs text-muted-foreground">IST</span>
          </div>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="h-8 w-8 p-0">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative h-8 w-8 p-0"
            onClick={() => setActiveSection('notifications')}
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-destructive text-destructive-foreground">
                {notifications > 9 ? '9+' : notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
                <Badge variant="outline" className={`px-2 py-1 text-xs font-medium ${getRoleColor(userRole)}`}>
                  {userRole}
                </Badge>
                <User className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-sm font-medium text-foreground">Switch Role</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setUserRole('SuperAdmin')}>
                SuperAdmin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserRole('Support')}>
                Support
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserRole('Finance')}>
                Finance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserRole('Analyst')}>
                Analyst
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveSection('settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}