@@ .. @@
 const buttonVariants = cva(
-  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
+  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
   {
     variants: {
       variant: {
-        default: "bg-primary text-primary-foreground hover:bg-primary/90",
+        default: "bg-gray-900 text-white hover:bg-gray-800 shadow-sm",
         destructive:
-          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
+          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
         outline:
-          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
+          "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
         secondary:
-          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
+          "bg-gray-100 text-gray-700 hover:bg-gray-200",
         ghost:
-          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
+          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-accent/50",
         link: "text-primary underline-offset-4 hover:underline",
       },
       size: {
         default: "h-9 px-4 py-2 has-[>svg]:px-3",
         sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
         icon: "size-9 rounded-md",
       },
     },
     defaultVariants: {
       variant: "default",
       size: "default",
     },
   },
 );