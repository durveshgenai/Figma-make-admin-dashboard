# Finance Bot Admin Dashboard

A comprehensive admin console for managing users, projects, conversations, payments, and analytics for the Finance Bot platform. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Role-Based Access Control**: SuperAdmin, Support, Finance, and Analyst roles with different permissions
- **User Management**: Complete user lifecycle management with advanced filtering
- **Project & Document Management**: Handle PDFs, version control, and access rules
- **Conversation Monitoring**: Track bot interactions and user queries
- **Payment & Subscription Management**: Financial transaction oversight
- **Analytics & Reporting**: Comprehensive performance metrics and insights

### Enhanced Features  
- **Real-time Monitoring**: CloudWatch-style system monitoring with performance metrics
- **Error & Query Logging**: Comprehensive error tracking and resolution workflows
- **Feedback Integration**: User feedback management with sentiment analysis
- **Bot Configuration**: AI model settings and custom instruction management
- **Notification Management**: Multi-channel notification templates and campaigns
- **Security & Compliance**: Audit logs and data retention policies

### Technical Features
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Time Zone Support**: IST/UTC toggle with proper time display
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Advanced Tables**: Server-side search, filtering, sorting, and pagination
- **Data Visualization**: Interactive charts using Recharts
- **Modern UI Components**: Shadcn/ui component library

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot reload, TypeScript checking, ESLint

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd your-project-directory
   ```

2. **Run the setup script**:
   ```bash
   npm run setup
   ```
   
   This will:
   - Install all dependencies
   - Create environment configuration
   - Initialize Tailwind CSS
   - Run type checking
   - Display setup instructions

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   ```
   http://localhost:5173
   ```

### Manual Setup (Alternative)

If the setup script doesn't work, you can set up manually:

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript type checking
- `npm run setup` - Complete project setup (run once)

## 📁 Project Structure

```
├── components/           # React components
│   ├── ui/              # Shadcn/ui components
│   ├── constants/       # Component-specific constants
│   └── *.tsx           # Feature components
├── lib/                 # Utilities and types
│   ├── types.ts        # TypeScript type definitions
│   ├── constants.ts    # Application constants
│   ├── utils.ts        # Utility functions
│   └── app-utils.ts    # App-specific utilities
├── styles/             # Global styles
│   └── globals.css     # Tailwind and custom CSS
├── public/             # Static assets
└── scripts/            # Setup and build scripts
```

## 🎯 User Roles & Permissions

### SuperAdmin
- Full access to all features
- User and team management
- System configuration
- Security and compliance oversight

### Support  
- User support and query management
- Conversation monitoring
- Notification management
- Basic analytics access

### Finance
- Payment and subscription management
- Financial analytics and reporting
- Revenue tracking
- Billing oversight

### Analyst
- Analytics and reporting
- Performance monitoring
- Data visualization
- Usage metrics

## 🔧 Configuration

### Environment Variables

Create `.env.local` file in the root directory:

```env
# Application Settings
VITE_APP_NAME="Finance Bot Admin Dashboard"
VITE_APP_ENVIRONMENT="development"

# API Configuration
VITE_API_BASE_URL="https://api.financebot.example.com"
VITE_WEBSOCKET_URL="wss://ws.financebot.example.com"

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MONITORING=true
VITE_DEV_MOCK_DATA=true
```

### Theme Configuration

The app supports both light and dark themes:
- Auto-detects system preference
- Manual toggle available in header
- Persistent theme selection via localStorage
- Smooth transitions between themes

### Time Zone Support

- Toggle between IST and UTC display
- Consistent time formatting across components
- Timezone-aware relative time display
- Server-side time conversion support

## 📊 Key Components

### Dashboard Overview
- Real-time metrics and KPIs
- Performance monitoring charts
- Error logs and system alerts
- AI-powered insights

### Enhanced Tables
- Server-side search and filtering
- Column sorting and customization
- Export functionality
- Responsive design with mobile support

### Notification Management
- Template creation and management
- Campaign scheduling and tracking
- Multi-channel support (Email, SMS, In-App)
- Audience segmentation

### Analytics & Reporting
- Interactive charts and visualizations
- Custom date ranges and filters
- Export capabilities
- Real-time data updates

## 🔍 Development Notes

### Code Quality
- TypeScript for type safety
- ESLint for code consistency
- Proper component structure
- Comprehensive error handling

### Performance
- Lazy loading for better performance
- Optimized bundle size
- Efficient state management
- Responsive design patterns

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment-Specific Builds
- Development: `npm run dev`
- Staging: Update `.env.local` with staging URLs
- Production: Use environment-specific variables

## 🛟 Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure Node.js 18+ is installed
2. **Dependencies**: Run `npm install` if packages are missing
3. **Port Conflicts**: Change port in `vite.config.ts` if 5173 is occupied
4. **TypeScript Errors**: Run `npm run type-check` to identify issues
5. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Performance Optimization

1. **Large Datasets**: Use virtualization for large tables
2. **Image Optimization**: Optimize images and use appropriate formats
3. **Code Splitting**: Implement lazy loading for heavy components
4. **Caching**: Configure proper caching strategies

### Browser Support
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📝 Contributing

1. Follow TypeScript best practices
2. Use provided component patterns
3. Maintain consistent styling with Tailwind
4. Add proper error handling
5. Test across different user roles

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For technical support or questions:
1. Check this README for common solutions
2. Review component documentation
3. Ensure all dependencies are properly installed
4. Verify environment configuration

---

**Built with ❤️ for efficient finance bot administration**