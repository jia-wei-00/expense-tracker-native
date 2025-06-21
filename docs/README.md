# Expense Tracker Native

A comprehensive personal finance management application built with React Native, Expo, and Supabase, featuring multilingual support, biometric authentication, and real-time data synchronization.

## 📱 Overview

**Expense Tracker Native** is a modern, feature-rich mobile application designed to help users manage their personal finances effectively. The app supports both income and expense tracking, category management, data visualization, and advanced security features.

### ✨ Key Features

- **📊 Financial Tracking**: Track income and expenses with detailed categorization
- **📈 Data Visualization**: Interactive charts and analytics for spending patterns
- **🔐 Advanced Security**: Biometric authentication (Face ID/Fingerprint) and secure credential management
- **🌍 Multilingual Support**: Full i18n support (English, Chinese Simplified, Chinese Traditional)
- **☁️ Cloud Sync**: Real-time data synchronization with Supabase backend
- **📱 Cross-Platform**: Runs on iOS, Android, and Web
- **🎨 Modern UI**: Beautiful, responsive design with dark/light theme support
- **💰 Loan Management**: Track loans and loan payments
- **🔄 Real-time Updates**: Live data updates across devices
- **📄 Pagination**: Efficient data loading for large datasets

## 🏗️ Technical Architecture

### Technology Stack

| Category                 | Technology                                 | Purpose                                     |
| ------------------------ | ------------------------------------------ | ------------------------------------------- |
| **Frontend**             | React Native + Expo                        | Cross-platform mobile development           |
| **Navigation**           | Expo Router                                | File-based routing system                   |
| **Backend**              | Supabase                                   | Database, Authentication, Real-time updates |
| **State Management**     | Redux Toolkit                              | Centralized state management                |
| **Styling**              | Tailwind CSS via NativeWind + Gluestack UI | Utility-first CSS + Component library       |
| **Forms**                | React Hook Form + Yup                      | Form handling and validation                |
| **Charts**               | React Native Gifted Charts                 | Data visualization                          |
| **Storage**              | MMKV                                       | High-performance local storage              |
| **Authentication**       | Supabase Auth + Biometrics                 | Secure user authentication                  |
| **Internationalization** | react-i18next                              | Multi-language support                      |

### Project Structure

```
expense-tracker-native/
├── app/                          # Main application code (Expo Router)
│   ├── (auth)/                   # Authentication screens
│   │   ├── sign-in.tsx          # Login screen
│   │   └── local-authenticate.tsx # Biometric authentication
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home screen (expense tracking)
│   │   ├── history.tsx          # Analytics and charts
│   │   └── (settings)/          # Settings section
│   │       ├── settings.tsx     # Main settings screen
│   │       └── category.tsx     # Category management
│   ├── screen-component/         # Reusable screen components
│   │   ├── home/                # Home screen components
│   │   ├── history/             # History/analytics components
│   │   ├── category/            # Category management components
│   │   └── settings/            # Settings components
│   └── _layout.tsx              # Root layout configuration
├── store/                        # Redux store configuration
│   ├── features/                # Feature-based slices
│   │   ├── authentication/      # Auth state management
│   │   ├── database-store/      # Data management slices
│   │   │   ├── expense-slice/   # Expense CRUD operations
│   │   │   ├── category-slice/  # Category management
│   │   │   ├── loan-slice/      # Loan tracking
│   │   │   └── loan-record-slice/ # Loan payment records
│   │   ├── settings/            # App settings state
│   │   └── supabase/           # Supabase integration
│   └── index.ts                 # Store configuration
├── components/                   # Reusable UI components
│   ├── ui/                      # Gluestack UI components
│   ├── Text/                    # Typography components
│   └── [various components]     # Form controls, navigation, etc.
├── i18n/                        # Internationalization
│   ├── locales/                 # Translation files
│   │   ├── en-US/              # English translations
│   │   ├── zh-CN/              # Chinese Simplified
│   │   └── zh-TW/              # Chinese Traditional
│   └── index.ts                 # i18n configuration
├── utils/                       # Utility functions
│   ├── auth-function/           # Authentication helpers
│   └── toast-helpers.ts         # Toast notification utilities
├── modules/                     # Custom native modules
│   └── credential-manager/      # Biometric authentication module
├── assets/                      # Static assets
│   ├── Icons/                   # SVG icon components
│   ├── images/                  # App images and branding
│   └── fonts/                   # Custom fonts
├── hooks/                       # Custom React hooks
├── constants/                   # App constants and configuration
├── features/                    # Feature-specific logic
└── types/                       # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd expense-tracker-native
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
   EXPO_PUBLIC_GOOGLE_SERVER_CLIENT_ID=your_google_server_client_id
   ```

4. **Run the application**

   ```bash
   # Start the development server
   npm start

   # Run on specific platforms
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

### Database Setup

The application uses Supabase as the backend. The database schema includes:

#### Tables

1. **expense** - Main expense/income records

   - `id` (Primary Key)
   - `user_id` (Foreign Key to auth.users)
   - `name` (Transaction description)
   - `amount` (Transaction amount)
   - `is_expense` (Boolean: true for expense, false for income)
   - `category` (Foreign Key to expense_category)
   - `spend_date` (Transaction date)
   - `created_at` (Record creation timestamp)

2. **expense_category** - Categories for transactions

   - `id` (Primary Key)
   - `user_id` (Foreign Key to auth.users)
   - `name` (Category name)
   - `is_expense` (Boolean: expense or income category)
   - `created_at` (Record creation timestamp)

3. **loan** - Loan records

   - `id` (Primary Key)
   - `user_id` (Foreign Key to auth.users)
   - `name` (Loan description)
   - `total_amount` (Total loan amount)
   - `interest_rate` (Interest rate percentage)
   - `created_at` (Record creation timestamp)

4. **loan_record** - Loan payment records
   - `id` (Primary Key)
   - `user_id` (Foreign Key to auth.users)
   - `loan` (Foreign Key to loan)
   - `amount` (Payment amount)
   - `pay_date` (Payment date)
   - `created_at` (Record creation timestamp)

## 📱 Features Deep Dive

### 1. Authentication System

The app implements a multi-layered authentication system:

#### Supabase Authentication

- Email/password authentication
- Google OAuth integration
- Secure session management
- Automatic token refresh

#### Biometric Authentication

- Face ID (iOS) / Fingerprint (Android)
- Local device authentication
- Credential Manager integration
- Fallback to device PIN/Pattern

#### Implementation Details

```typescript
// Authentication flow
1. User opens app
2. Check for existing session
3. If no session → redirect to sign-in
4. If session exists → check biometric settings
5. If biometric enabled → require biometric auth
6. Grant access to main app
```

### 2. Expense Tracking

#### Core Functionality

- **Add Transactions**: Quick expense/income entry with category selection
- **Edit/Delete**: Full CRUD operations on transactions
- **Category Management**: Create custom categories for better organization
- **Date Selection**: Flexible date picker for transaction dates
- **Search**: Real-time search across transaction names and amounts

#### Data Flow

```typescript
// Transaction creation flow
1. User fills form (validated with Yup schema)
2. Data sent to Redux action
3. API call to Supabase
4. Real-time update via Supabase subscription
5. UI updates automatically
```

### 3. Data Visualization

#### Charts and Analytics

- **Pie Charts**: Category-wise expense breakdown
- **Balance Overview**: Current financial status
- **Historical Data**: Month-wise transaction history
- **Interactive Elements**: Clickable chart segments

#### Implementation

- Uses `react-native-gifted-charts` for performance
- Real-time data updates
- Responsive design for different screen sizes

### 4. Internationalization (i18n)

#### Supported Languages

- **English (en-US)**: Default language
- **Chinese Simplified (zh-CN)**: Mainland China
- **Chinese Traditional (zh-TW)**: Taiwan/Hong Kong

#### Translation Structure

```json
{
  "Home": "Home",
  "Settings": "Settings",
  "Schema": {
    "Name is required": "Name is required"
  },
  "Toast": {
    "Welcome": "Welcome, {{name}}!"
  }
}
```

#### Dynamic Schema Validation

```typescript
// Schemas use translation functions
const createSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t("Schema.Name is required")),
  });
```

### 5. State Management

#### Redux Store Structure

```typescript
interface RootState {
  auth: AuthState; // User authentication
  expense: ExpenseState; // Transaction data
  category: CategoryState; // Categories
  loan: LoanState; // Loan management
  loanRecord: LoanRecordState; // Loan payments
  settings: SettingsState; // App preferences
  scroll: ScrollState; // UI scroll positions
}
```

#### Real-time Subscriptions

```typescript
// Supabase real-time integration
useEffect(() => {
  const subscription = supabase
    .channel("expense_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "expense" },
      (payload) => dispatch(updateExpenseData(payload))
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, []);
```

## 🔧 Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Expense Tracker",
    "slug": "expense-tracker-native",
    "version": "1.0.0",
    "platforms": ["ios", "android", "web"],
    "plugins": [
      "expo-router",
      "@react-native-google-signin/google-signin",
      "expo-localization"
    ]
  }
}
```

### Build Configuration (`eas.json`)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

## 🎨 UI/UX Design

### Design System

- **Colors**: Consistent color palette with theme support
- **Typography**: Custom text components with size variants
- **Spacing**: Uniform spacing system
- **Components**: Reusable UI components

### Theme Support

- **Light Theme**: Default bright theme
- **Dark Theme**: Dark mode support
- **System Theme**: Follows device theme settings

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for larger screens
- **Web Compatible**: Works across all platforms

## 🔒 Security Features

### Data Security

- **Supabase RLS**: Row Level Security policies
- **Encrypted Storage**: Sensitive data encryption
- **Secure API**: Protected API endpoints
- **Session Management**: Secure token handling

### Privacy Features

- **Local Authentication**: Biometric protection
- **Data Isolation**: User data separation
- **Secure Transmission**: HTTPS/WSS protocols

## 📊 Performance Optimizations

### Data Management

- **Pagination**: Efficient data loading (20 items per page)
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo optimizations
- **Real-time Subscriptions**: Efficient data synchronization

### Storage Optimization

- **MMKV**: High-performance local storage
- **Image Optimization**: Compressed assets
- **Bundle Splitting**: Code splitting for better load times

## 🧪 Testing

### Testing Strategy

```typescript
// Component testing
describe("ExpenseForm", () => {
  it("should validate required fields", () => {
    // Test form validation
  });
});

// Hook testing
describe("usePagination", () => {
  it("should handle page changes correctly", () => {
    // Test pagination logic
  });
});
```

### Testing Tools

- **Jest**: Unit and integration testing
- **React Native Testing Library**: Component testing
- **Detox** (planned): E2E testing

## 🚀 Deployment

### Build Process

```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform all --profile production

# Local build
npm run build
```

### Deployment Targets

- **Google Play Store**: Android distribution
- **Apple App Store**: iOS distribution
- **Web Hosting**: Web version deployment

## 🔮 Future Enhancements

### Planned Features

- [ ] **Budgeting**: Monthly/yearly budget planning
- [ ] **Recurring Transactions**: Automatic recurring entries
- [ ] **Export/Import**: Data backup and restore
- [ ] **Multi-currency**: Support for different currencies
- [ ] **Receipt Scanning**: OCR for receipt processing
- [ ] **Financial Goals**: Savings and spending goals
- [ ] **Advanced Analytics**: More detailed financial insights
- [ ] **Family Accounts**: Shared expense tracking
- [ ] **Bank Integration**: Connect to bank accounts
- [ ] **Investment Tracking**: Portfolio management

### Technical Improvements

- [ ] **Offline Support**: Full offline functionality
- [ ] **Performance Monitoring**: Crash reporting and analytics
- [ ] **Advanced Caching**: Improved data caching strategies
- [ ] **Push Notifications**: Spending alerts and reminders
- [ ] **Widget Support**: Home screen widgets
- [ ] **Accessibility**: Enhanced accessibility features

## 📚 API Documentation

### Authentication Endpoints

```typescript
// Sign in
POST /auth/v1/token?grant_type=password
Body: { email, password }

// Sign out
POST /auth/v1/logout

// Refresh token
POST /auth/v1/token?grant_type=refresh_token
```

### Data Endpoints

```typescript
// Expenses
GET /rest/v1/expense?user_id=eq.{userId}
POST /rest/v1/expense
PATCH /rest/v1/expense?id=eq.{id}
DELETE /rest/v1/expense?id=eq.{id}

// Categories
GET /rest/v1/expense_category?user_id=eq.{userId}
POST /rest/v1/expense_category
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Development Commands

```bash
npm start          # Start development server
npm run test       # Run tests
npm run lint       # Lint code
npm run type-check # TypeScript checking
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, please contact [your-email] or create an issue in the repository.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **Supabase Team**: For the powerful backend services
- **React Native Community**: For the amazing ecosystem
- **Open Source Contributors**: For the libraries and tools used

---

_Last updated: [Current Date]_
_Version: 1.0.0_
