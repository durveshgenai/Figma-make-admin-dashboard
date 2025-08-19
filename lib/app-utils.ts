@@ .. @@
 export function getEnvironmentColor(env: Environment): string {
   switch (env) {
     case 'Production':
-      return 'bg-red-100 text-red-800 border-red-200';
+      return 'bg-red-50 text-red-700 border-red-200';
     case 'Staging':
-      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
+      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
     case 'Development':
-      return 'bg-green-100 text-green-800 border-green-200';
+      return 'bg-green-50 text-green-700 border-green-200';
   }
 }
 
 export function getRoleColor(role: UserRole): string {
   switch (role) {
     case 'SuperAdmin':
-      return 'bg-purple-100 text-purple-800 border-purple-200';
+      return 'bg-purple-50 text-purple-700 border-purple-200';
     case 'Support':
-      return 'bg-blue-100 text-blue-800 border-blue-200';
+      return 'bg-blue-50 text-blue-700 border-blue-200';
     case 'Finance':
-      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
+      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
     case 'Analyst':
-      return 'bg-orange-100 text-orange-800 border-orange-200';
+      return 'bg-orange-50 text-orange-700 border-orange-200';
   }
-}
-
-export function toggleDarkMode(): void {
-  document.documentElement.classList.toggle('dark');
 }