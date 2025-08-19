import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n🔄 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully`, 'green');
  } catch (error) {
    log(`❌ Error during ${description}: ${error.message}`, 'red');
    process.exit(1);
  }
}

function createEnvFile() {
  const envPath = join(process.cwd(), '.env.local');
  
  if (!existsSync(envPath)) {
    const envContent = `# Finance Bot Admin Dashboard Environment Variables
# Development Environment Configuration

# Application Settings
VITE_APP_NAME="Finance Bot Admin Dashboard"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENVIRONMENT="development"

# API Configuration (placeholder - replace with actual URLs)
VITE_API_BASE_URL="https://api.financebot.example.com"
VITE_WEBSOCKET_URL="wss://ws.financebot.example.com"

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MONITORING=true
VITE_ENABLE_DEBUG_MODE=true

# Rate Limiting
VITE_API_RATE_LIMIT=1000
VITE_WEBSOCKET_RECONNECT_INTERVAL=5000

# Development Settings
VITE_DEV_MOCK_DATA=true
VITE_DEV_API_DELAY=500

# External Services (replace with actual keys)
VITE_SENTRY_DSN="YOUR_SENTRY_DSN_HERE"
VITE_ANALYTICS_ID="YOUR_ANALYTICS_ID_HERE"

# Note: In production, never commit sensitive keys to version control
# Use proper environment variable management for production deployments
`;

    writeFileSync(envPath, envContent);
    log('📄 Created .env.local file with default configuration', 'cyan');
  } else {
    log('📄 .env.local file already exists', 'yellow');
  }
}

function main() {
  log('🚀 Setting up Finance Bot Admin Dashboard...', 'magenta');
  log('📦 This will install dependencies and configure the development environment\n', 'cyan');

  // Check Node.js version
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    log(`Node.js version: ${nodeVersion}`, 'green');
    
    const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);
    if (majorVersion < 18) {
      log('⚠️  Warning: Node.js 18+ is recommended for optimal performance', 'yellow');
    }
  } catch (error) {
    log('❌ Node.js is not installed or not in PATH', 'red');
    process.exit(1);
  }

  // Install dependencies
  runCommand('npm install', 'Installing dependencies');

  // Create environment file
  createEnvFile();

  // Initialize Tailwind if needed
  runCommand('npx tailwindcss init -p', 'Initializing Tailwind CSS configuration');

  // Type check
  runCommand('npm run type-check', 'Running TypeScript type check');

  log('\n🎉 Setup completed successfully!', 'green');
  log('\n📋 Next steps:', 'cyan');
  log('1. Review and update .env.local with your actual API endpoints', 'cyan');
  log('2. Run "npm run dev" to start the development server', 'cyan');
  log('3. Open http://localhost:5173 in your browser', 'cyan');
  log('4. Default role is SuperAdmin - you can switch roles in the header', 'cyan');
  
  log('\n🔧 Available commands:', 'yellow');
  log('  npm run dev     - Start development server', 'yellow');
  log('  npm run build   - Build for production', 'yellow');
  log('  npm run preview - Preview production build', 'yellow');
  log('  npm run lint    - Run ESLint', 'yellow');
  
  log('\n📚 Features included:', 'blue');
  log('  • Role-based access control (SuperAdmin, Support, Finance, Analyst)', 'blue');
  log('  • Dark/Light mode toggle', 'blue');
  log('  • IST/UTC time zone switching', 'blue');
  log('  • Responsive design with Tailwind CSS', 'blue');
  log('  • Interactive data tables with search and filters', 'blue');
  log('  • Real-time monitoring and analytics', 'blue');
  log('  • Error logging and feedback management', 'blue');
  
  log('\n🛠️  For issues or questions:', 'magenta');
  log('  • Check the README.md file', 'magenta');
  log('  • Review component documentation in /components', 'magenta');
  log('  • Ensure all dependencies are properly installed', 'magenta');
}

main();