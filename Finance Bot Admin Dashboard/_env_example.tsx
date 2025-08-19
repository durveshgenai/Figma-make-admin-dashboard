# Finance Bot Admin Dashboard Environment Variables

# Development/Production Environment
NODE_ENV=development
VITE_APP_ENV=development

# API Configuration
VITE_API_BASE_URL=https://api.financebot.com
VITE_API_VERSION=v1

# Database Configuration (if needed)
VITE_DB_HOST=localhost
VITE_DB_PORT=5432
VITE_DB_NAME=financebot_admin

# Authentication (if implementing real auth)
VITE_JWT_SECRET=your-jwt-secret-here
VITE_AUTH_PROVIDER=local

# External Service APIs
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
VITE_GITHUB_CLIENT_ID=your-github-client-id
VITE_SLACK_CLIENT_ID=your-slack-client-id

# Analytics
VITE_ANALYTICS_ID=your-analytics-id

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_REAL_TIME=false

# Monitoring
VITE_SENTRY_DSN=your-sentry-dsn
VITE_LOG_LEVEL=info

# File Upload
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=pdf,doc,docx,txt

# Rate Limiting
VITE_API_RATE_LIMIT=1000
VITE_UPLOAD_RATE_LIMIT=10