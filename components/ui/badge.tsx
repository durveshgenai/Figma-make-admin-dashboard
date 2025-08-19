@@ .. @@
 const badgeVariants = cva(
-  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
+  "inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
   {
     variants: {
       variant: {
         default:
-          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
+          "border-transparent bg-gray-900 text-white [a&]:hover:bg-gray-800",
         secondary:
-          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
+          "border-transparent bg-gray-100 text-gray-700 [a&]:hover:bg-gray-200",
         destructive:
-          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
+          "border-transparent bg-red-500 text-white [a&]:hover:bg-red-600 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
         outline:
-          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
+          "text-gray-700 border-gray-200 [a&]:hover:bg-gray-50 [a&]:hover:text-gray-900",
       },
     },
     defaultVariants: {
       variant: "default",
     },
   },
 );