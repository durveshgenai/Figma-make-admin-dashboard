@@ .. @@
 function Card({ className, ...props }: React.ComponentProps<"div">) {
   return (
     <div
       data-slot="card"
       className={cn(
-        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
+        "bg-white text-gray-900 flex flex-col gap-6 rounded-lg border border-gray-200 shadow-sm",
         className,
       )}
       {...props}
     />
   );
 }