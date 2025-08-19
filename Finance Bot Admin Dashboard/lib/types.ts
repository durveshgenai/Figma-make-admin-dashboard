export type UserRole = 'SuperAdmin' | 'Support' | 'Finance' | 'Analyst';
export type Environment = 'Production' | 'Staging' | 'Development';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}

export interface AppState {
  activeSection: string;
  userRole: UserRole;
  environment: Environment;
  useIST: boolean;
  searchQuery: string;
  notifications: number;
  isDarkMode: boolean;
}

export interface ComponentProps {
  useIST: boolean;
  userRole: string;
}