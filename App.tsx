@@ .. @@
 export default function App() {
   const [activeSection, setActiveSection] = useState('overview');
   const [userRole, setUserRole] = useState<UserRole>('SuperAdmin');
   const [environment, setEnvironment] = useState<Environment>('Production');
   const [useIST, setUseIST] = useState(true);
   const [searchQuery, setSearchQuery] = useState('');
   const [notifications] = useState(DEFAULT_NOTIFICATIONS_COUNT);
-  const [isDarkMode, setIsDarkMode] = useState(false);
+  const [isDarkMode, setIsDarkMode] = useState(false);
+
+  // Force light mode on initial load to match Figma design
+  React.useEffect(() => {
+    document.documentElement.classList.remove('dark');
+    setIsDarkMode(false);
+  }, []);
 
   const toggleDarkMode = () => {
     setIsDarkMode(!isDarkMode);
-    utilToggleDarkMode();
+    if (!isDarkMode) {
+      document.documentElement.classList.add('dark');
+    } else {
+      document.documentElement.classList.remove('dark');
+    }
   };