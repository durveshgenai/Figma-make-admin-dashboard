export const FEEDBACK_DATA = [
  {
    id: 'FB-001',
    query: 'What was the revenue growth in Q3 2023?',
    botResponse: 'The revenue growth in Q3 2023 was 15.2% compared to Q3 2022...',
    rating: 'positive',
    comment: 'Very accurate and well-explained with proper context.',
    userId: 'user123@company.com',
    timestamp: '2024-01-07T14:30:00Z',
    category: 'Financial Analysis',
    responseTime: 1.2,
    helpful: true,
    flagged: false,
    documentRef: 'Q3-2023-Report.pdf'
  },
  {
    id: 'FB-002',
    query: 'Calculate the debt-to-equity ratio for our company',
    botResponse: 'Based on the latest balance sheet, the debt-to-equity ratio is 0.45...',
    rating: 'negative',
    comment: 'The calculation seems wrong. Should be 0.52 according to GAAP standards.',
    userId: 'finance.user@company.com',
    timestamp: '2024-01-07T13:45:00Z',
    category: 'Calculations',
    responseTime: 2.1,
    helpful: false,
    flagged: true,
    documentRef: 'Balance-Sheet-2023.pdf'
  },
  {
    id: 'FB-003',
    query: 'Show me the key performance indicators',
    botResponse: 'Here are the key performance indicators from the annual report...',
    rating: 'positive',
    comment: 'Good overview but could include more recent data.',
    userId: 'analyst@company.com',
    timestamp: '2024-01-07T12:15:00Z',
    category: 'Data Retrieval',
    responseTime: 0.8,
    helpful: true,
    flagged: false,
    documentRef: 'Annual-Report-2023.pdf'
  }
];

export const FEEDBACK_TRENDS = [
  { date: '2024-01-01', positive: 142, negative: 18, neutral: 23 },
  { date: '2024-01-02', positive: 156, negative: 22, neutral: 19 },
  { date: '2024-01-03', positive: 134, negative: 15, neutral: 31 },
  { date: '2024-01-04', positive: 167, negative: 28, neutral: 25 },
  { date: '2024-01-05', positive: 149, negative: 19, neutral: 22 },
  { date: '2024-01-06', positive: 178, negative: 16, neutral: 28 },
  { date: '2024-01-07', positive: 161, negative: 24, neutral: 17 }
];

export const CATEGORY_INSIGHTS = [
  { category: 'Financial Analysis', positive: 89, negative: 11, total: 456 },
  { category: 'Calculations', positive: 72, negative: 28, total: 234 },
  { category: 'Data Retrieval', positive: 94, negative: 6, total: 389 },
  { category: 'Compliance', positive: 78, negative: 22, total: 167 },
  { category: 'Document Search', positive: 91, negative: 9, total: 298 }
];

export const IMPROVEMENT_SUGGESTIONS = [
  {
    id: 'IMP-001',
    category: 'Calculations',
    issue: 'Inconsistent calculation methods',
    frequency: 28,
    priority: 'High',
    suggestion: 'Standardize calculation formulas according to GAAP/IFRS standards'
  },
  {
    id: 'IMP-002',
    category: 'Compliance',
    issue: 'Missing regulatory information',
    frequency: 22,
    priority: 'Medium',
    suggestion: 'Include comprehensive risk assessment coverage'
  },
  {
    id: 'IMP-003',
    category: 'Financial Analysis',
    issue: 'Lack of historical context',
    frequency: 15,
    priority: 'Medium',
    suggestion: 'Provide year-over-year comparisons where applicable'
  }
];