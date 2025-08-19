@@ .. @@
   return (
   )
-    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
+    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
-              className="pl-9 h-9 w-full bg-input-background border-border focus:border-primary"
+              className="pl-9 h-9 w-full bg-white border-gray-200 focus:border-primary shadow-sm"
             />
           </div>
         </div>
 
         <div className="flex items-center gap-3">
           {/* Environment Badge */}
           <Select value={environment} onValueChange={(value: Environment) => setEnvironment(value)}>
             <SelectTrigger className="w-auto h-8 border-0 shadow-none p-0">
-              <Badge variant="outline" className={`px-2 py-1 text-xs font-medium ${getEnvironmentColor(environment)}`}>
+              <Badge variant="outline" className={`px-3 py-1 text-xs font-medium ${getEnvironmentColor(environment)} rounded-md`}>
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
-          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/50">
+          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100">
             <span className="text-xs text-muted-foreground">UTC</span>
             <Switch
               checked={useIST}
               onCheckedChange={setUseIST}
               size="sm"
               aria-label="Toggle IST/UTC"
             />
             <span className="text-xs text-muted-foreground">IST</span>
           </div>