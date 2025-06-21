# Development Guide

This document provides comprehensive information for developers working on the Expense Tracker Native application, including setup, workflow, testing, deployment, and troubleshooting procedures.

## 🚀 Quick Start

### Prerequisites

Before starting development, ensure you have the following installed:

```bash
# Required versions
Node.js >= 18.0.0
npm >= 8.0.0 (or yarn >= 1.22.0)
Git >= 2.30.0

# Development tools
Expo CLI >= 6.0.0
Android Studio (for Android development)
Xcode >= 14.0 (for iOS development, macOS only)
```

### Initial Setup

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd expense-tracker-native
   npm install

   # Install Expo CLI globally if not already installed
   npm install -g @expo/cli
   ```

2. **Environment Configuration**

   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit environment variables
   nano .env
   ```

   Required environment variables:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_client_id
   EXPO_PUBLIC_GOOGLE_SERVER_CLIENT_ID=your_google_server_id
   ```

3. **Database Setup**

   ```sql
   -- Run in Supabase SQL editor
   -- Create tables and set up RLS policies
   -- (See database schema in API.md)
   ```

4. **Start Development Server**
   ```bash
   npm start
   # or
   expo start
   ```

## 🏗️ Development Workflow

### Branch Strategy

```
main                    # Production-ready code
├── develop             # Integration branch
├── feature/user-auth   # Feature branches
├── feature/expense-ui  # Feature branches
├── hotfix/bug-fix      # Emergency fixes
└── release/v1.1.0      # Release preparation
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>[optional scope]: <description>

# Examples
feat(auth): add biometric authentication
fix(expense): resolve category selection bug
docs(api): update authentication endpoints
style(ui): improve button component styling
refactor(store): optimize expense slice logic
test(components): add unit tests for forms
chore(deps): update dependencies to latest versions
```

### Development Process

1. **Create Feature Branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/expense-categories
   ```

2. **Development Cycle**

   ```bash
   # Make changes
   npm run lint          # Check code style
   npm run type-check    # TypeScript validation
   npm test             # Run tests
   npm start            # Test locally
   ```

3. **Commit and Push**

   ```bash
   git add .
   git commit -m "feat(categories): add category CRUD operations"
   git push origin feature/expense-categories
   ```

4. **Create Pull Request**
   - Target: `develop` branch
   - Include description of changes
   - Add screenshots for UI changes
   - Request code review

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Components are tested
- [ ] Documentation is updated
- [ ] Performance considerations addressed
- [ ] Accessibility guidelines followed
- [ ] Security best practices implemented

## 🧪 Testing Strategy

### Testing Pyramid

```
                🔺 E2E Tests (Few)
               🔺🔺 Integration Tests (Some)
            🔺🔺🔺 Unit Tests (Many)
```

### Unit Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- AddRecordForm.test.tsx
```

#### Test Structure

```typescript
// __tests__/components/AddRecordForm.test.tsx
import { render, screen, userEvent } from "@testing-library/react-native";
import { AddRecordForm } from "../AddRecordForm";

describe("AddRecordForm", () => {
  const mockProps = {
    allFormMethods: createMockFormMethods(),
    category: mockCategories,
    loading: false,
    setShowModal: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Form Rendering", () => {
    it("should render all required fields", () => {
      render(<AddRecordForm {...mockProps} />);

      expect(screen.getByLabelText("Name")).toBeOnTheScreen();
      expect(screen.getByLabelText("Amount")).toBeOnTheScreen();
      expect(screen.getByLabelText("Category")).toBeOnTheScreen();
    });
  });

  describe("Form Validation", () => {
    it("should show error for empty required fields", async () => {
      const user = userEvent.setup();
      render(<AddRecordForm {...mockProps} />);

      await user.press(screen.getByText("Submit"));

      expect(screen.getByText("Name is required")).toBeOnTheScreen();
    });
  });

  describe("Form Submission", () => {
    it("should call onSubmit with correct data", async () => {
      const user = userEvent.setup();
      render(<AddRecordForm {...mockProps} />);

      await user.type(screen.getByLabelText("Name"), "Coffee");
      await user.type(screen.getByLabelText("Amount"), "5.50");
      await user.press(screen.getByText("Submit"));

      expect(mockProps.onSubmit).toHaveBeenCalledWith({
        name: "Coffee",
        amount: 5.5,
        // ... other expected fields
      });
    });
  });
});
```

### Integration Testing

```typescript
// __tests__/integration/ExpenseFlow.test.tsx
describe("Expense Flow Integration", () => {
  it("should create, edit, and delete expense", async () => {
    const { store } = renderWithProviders(<App />);

    // Navigate to home screen
    await navigateToHome();

    // Add new expense
    await addExpense({
      name: "Test Expense",
      amount: 100,
      category: "Food",
    });

    // Verify expense appears in list
    expect(screen.getByText("Test Expense")).toBeOnTheScreen();

    // Edit expense
    await editExpense("Test Expense", { amount: 150 });

    // Verify updated amount
    expect(screen.getByText("150")).toBeOnTheScreen();

    // Delete expense
    await deleteExpense("Test Expense");

    // Verify expense is removed
    expect(screen.queryByText("Test Expense")).not.toBeOnTheScreen();
  });
});
```

### E2E Testing (Planned)

```typescript
// e2e/expense-management.e2e.ts
describe("Expense Management E2E", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("should complete full expense workflow", async () => {
    // Login
    await element(by.id("email-input")).typeText("test@example.com");
    await element(by.id("password-input")).typeText("password123");
    await element(by.id("login-button")).tap();

    // Add expense
    await element(by.id("add-expense-fab")).tap();
    await element(by.id("expense-name")).typeText("Coffee");
    await element(by.id("expense-amount")).typeText("5.50");
    await element(by.id("submit-button")).tap();

    // Verify expense appears
    await expect(element(by.text("Coffee"))).toBeVisible();
  });
});
```

## 🔧 Development Tools

### VS Code Configuration

Recommended extensions:

```json
// .vscode/extensions.json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "expo.vscode-expo-tools",
    "ms-vscode.vscode-react-native"
  ]
}
```

Workspace settings:

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["className.*?=.*?[\"'`]([^\"'`]*)[\"'`]"]
  ]
}
```

### Debugging Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Android",
      "type": "reactnative",
      "request": "attach",
      "platform": "android"
    },
    {
      "name": "Debug iOS",
      "type": "reactnative",
      "request": "attach",
      "platform": "ios"
    }
  ]
}
```

### Useful Scripts

```json
// package.json scripts
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "build:all": "eas build --platform all",
    "clean": "expo r -c",
    "prebuild": "expo prebuild --clean"
  }
}
```

## 📦 Build and Deployment

### Development Builds

```bash
# Local development build
expo run:android --device
expo run:ios --device

# EAS development build
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Preview Builds

```bash
# Internal testing builds
eas build --profile preview --platform all
```

### Production Builds

```bash
# Production builds for app stores
eas build --profile production --platform all
```

### EAS Configuration

```json
// eas.json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "buildConfiguration": "Debug"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "../path/to/api-key.json",
        "track": "internal"
      },
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      }
    }
  }
}
```

### Environment-Specific Configurations

```typescript
// app.config.ts
export default ({ config }) => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    ...config,
    name: isProduction ? "Expense Tracker" : "Expense Tracker (Dev)",
    slug: "expense-tracker-native",
    version: "1.0.0",
    extra: {
      ...config.extra,
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
    android: {
      ...config.android,
      package: isProduction
        ? "com.jia011.expensetrackernative"
        : "com.jia011.expensetrackernative.dev",
    },
    ios: {
      ...config.ios,
      bundleIdentifier: isProduction
        ? "com.jia011.expensetrackernative"
        : "com.jia011.expensetrackernative.dev",
    },
  };
};
```

## 🔍 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npx expo export --dump-sourcemap
npx react-native-bundle-visualizer

# Optimize images
npx expo optimize

# Check for unused dependencies
npx depcheck
```

### Performance Monitoring

```typescript
// utils/performance.ts
import { performance } from "react-native-performance";

export const trackPerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Usage in components
const ExpensiveComponent = () => {
  React.useEffect(() => {
    trackPerformance("Data Processing", () => {
      // Expensive operation
    });
  }, []);
};
```

### Memory Optimization

```typescript
// hooks/useMemoryOptimization.ts
export const useMemoryOptimization = () => {
  React.useEffect(() => {
    return () => {
      // Cleanup subscriptions
      // Clear intervals
      // Remove event listeners
    };
  }, []);
};
```

## 🐛 Debugging and Troubleshooting

### Common Issues and Solutions

#### Build Issues

**Metro bundler issues:**

```bash
# Clear Metro cache
npx expo r -c

# Reset node modules
rm -rf node_modules
npm install

# Clear Expo cache
expo r -c
```

**Android build failures:**

```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset Android project
expo run:android --clear
```

**iOS build failures:**

```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reset iOS project
expo run:ios --clear
```

#### Runtime Issues

**Network requests failing:**

```typescript
// Debug network requests
import { NetworkingModule } from "react-native";

if (__DEV__) {
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;
}
```

**State management issues:**

```typescript
// Redux DevTools integration
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: __DEV__,
});
```

### Debugging Tools

#### React Native Debugger

```bash
# Install React Native Debugger
brew install react-native-debugger

# Enable debugging
npx expo start
# Press 'j' to open debugger
```

#### Flipper Integration

```typescript
// flipper.ts
import { logger } from "flipper";

export const logToFlipper = (message: string, data?: any) => {
  if (__DEV__) {
    logger.info(message, data);
  }
};
```

#### Performance Profiling

```typescript
// performance/profiler.ts
import { Profiler } from "react";

const onRenderCallback = (id, phase, actualDuration) => {
  console.log("Profiler:", { id, phase, actualDuration });
};

export const ProfiledComponent = ({ children }) => (
  <Profiler id="ExpenseList" onRender={onRenderCallback}>
    {children}
  </Profiler>
);
```

### Error Handling

#### Global Error Boundary

```typescript
// components/ErrorBoundary.tsx
import React from "react";
import { View, Text, Button } from "react-native";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error Boundary caught an error:", error, errorInfo);
    // Log to crash reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            Something went wrong
          </Text>
          <Button
            title="Reload App"
            onPress={() => this.setState({ hasError: false })}
          />
        </View>
      );
    }

    return this.props.children;
  }
}
```

#### Async Error Handling

```typescript
// utils/errorHandler.ts
export const handleAsyncError = async <T>(
  operation: () => Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const result = await operation();
    return [result, null];
  } catch (error) {
    console.error("Async operation failed:", error);
    return [null, error as Error];
  }
};

// Usage
const [data, error] = await handleAsyncError(() => fetchExpenses(userId));

if (error) {
  showErrorToast(error.message);
  return;
}

// Use data safely
```

## 📝 Documentation

### Code Documentation

````typescript
/**
 * Calculates the user's current balance based on expenses and income
 * @param expenses - Array of expense/income records
 * @param options - Configuration options
 * @returns The calculated balance
 *
 * @example
 * ```typescript
 * const balance = calculateBalance(expenses, {
 *   includeCategories: ['food', 'transport']
 * });
 * ```
 */
export const calculateBalance = (
  expenses: Expense[],
  options: BalanceOptions = {}
): number => {
  // Implementation
};
````

### Component Documentation

````typescript
/**
 * AddRecordForm component for creating and editing expense/income records
 *
 * @component
 * @example
 * ```tsx
 * <AddRecordForm
 *   allFormMethods={formMethods}
 *   category={categories}
 *   loading={false}
 *   onClose={handleClose}
 * />
 * ```
 */
interface AddRecordFormProps {
  /** React Hook Form methods for form management */
  allFormMethods: UseFormReturn<AddRecordSchema>;
  /** Available categories for selection */
  category: Category[];
  /** Loading state indicator */
  loading: boolean;
  /** Form read-only mode */
  isReadOnly?: boolean;
  /** Modal close handler */
  setShowModal: (show: boolean) => void;
  /** Form close callback */
  onClose: () => void;
}
````

## 🔒 Security Guidelines

### Environment Variables

```bash
# Never commit sensitive data
echo ".env" >> .gitignore
echo "*.env.local" >> .gitignore

# Use different keys for different environments
EXPO_PUBLIC_SUPABASE_URL_DEV=dev_url
EXPO_PUBLIC_SUPABASE_URL_PROD=prod_url
```

### API Security

```typescript
// Validate all inputs
import * as yup from "yup";

const validateInput = (data: unknown, schema: yup.ObjectSchema) => {
  try {
    return schema.validateSync(data);
  } catch (error) {
    throw new Error("Invalid input data");
  }
};

// Sanitize user inputs
const sanitizeInput = (input: string): string => {
  return input.replace(/<script[^>]*>.*?<\/script>/gi, "");
};
```

### Authentication Security

```typescript
// Secure token storage
import { storage } from "@/store/mmkv";

const secureStorage = {
  setToken: (token: string) => {
    storage.set("auth_token", token);
  },

  getToken: (): string | null => {
    return storage.getString("auth_token") || null;
  },

  removeToken: () => {
    storage.delete("auth_token");
  },
};
```

## 📊 Monitoring and Analytics

### Performance Monitoring

```typescript
// performance/monitoring.ts
import { performance } from "react-native-performance";

export const trackScreenLoad = (screenName: string) => {
  const start = performance.now();

  return () => {
    const end = performance.now();
    const duration = end - start;

    // Log to analytics service
    console.log(`Screen ${screenName} loaded in ${duration}ms`);
  };
};

// Usage in screens
const HomeScreen = () => {
  const stopTracking = trackScreenLoad("Home");

  React.useEffect(() => {
    return stopTracking;
  }, []);
};
```

### Error Tracking

```typescript
// error/tracking.ts
export const trackError = (error: Error, context?: any) => {
  if (__DEV__) {
    console.error("Error tracked:", error, context);
  } else {
    // Send to crash reporting service
    // crashlytics.recordError(error);
  }
};
```

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] All tests passing
- [ ] Code review completed
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations applied

### Build Process

- [ ] Clean build successful
- [ ] Bundle size optimized
- [ ] Assets compressed
- [ ] Source maps generated
- [ ] Version numbers updated

### Post-deployment

- [ ] App store submission
- [ ] Monitoring alerts configured
- [ ] Analytics tracking verified
- [ ] User feedback channels ready
- [ ] Support documentation updated

This development guide provides comprehensive coverage of all aspects needed for effective development, testing, deployment, and maintenance of the Expense Tracker Native application.
