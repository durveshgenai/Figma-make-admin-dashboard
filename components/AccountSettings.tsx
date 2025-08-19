@@ .. @@
             <main className="flex-1 overflow-auto p-6 bg-background">
               <div className="mb-6">
-                <h1 className="text-2xl font-semibold text-foreground">{getPageTitle()}</h1>
+                <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
               </div>
               <ContentRouter 
                 activeSection={activeSection}
                 useIST={useIST}
                 userRole={userRole}
               />
             </main>