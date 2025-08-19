@@ .. @@
   return (
-    <Sidebar className="border-r bg-sidebar">
+    <Sidebar className="border-r bg-sidebar shadow-sm">
       <SidebarHeader className="border-b border-sidebar-border p-4">
         <div className="flex items-center gap-3">
-          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
+          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
             <Bot className="h-5 w-5 text-sidebar-primary-foreground" />
           </div>
           <div>
             <h2 className="text-lg font-semibold text-sidebar-foreground">Finance Bot</h2>
             <p className="text-sm text-sidebar-foreground/70">Admin Console</p>
           </div>
         </div>
       </SidebarHeader>
       
-      <SidebarContent className="bg-sidebar">
+      <SidebarContent className="bg-sidebar p-2">
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
-                    w-full justify-start px-3 py-2 rounded-md transition-all duration-200
+                    w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 text-sm
                     ${isActive 
-                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
-                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
+                      ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
+                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                     }
                   `}
                 >
-                  <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-sidebar-primary' : ''}`} />
+                  <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
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