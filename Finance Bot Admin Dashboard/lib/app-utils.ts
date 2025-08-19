import { UserRole, Environment } from './types';

export function getEnvironmentColor(env: Environment): string {
  switch (env) {
    case 'Production':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Staging':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Development':
      return 'bg-green-100 text-green-800 border-green-200';
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'SuperAdmin':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Support':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Finance':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Analyst':
      return 'bg-orange-100 text-orange-800 border-orange-200';
  }
}

export function toggleDarkMode(): void {
  document.documentElement.classList.toggle('dark');
}

export function filterSidebarItemsByRole(items: any[], userRole: UserRole) {
  return items.filter(item => item.roles.includes(userRole));
}