# API Documentation

This document provides detailed information about the API endpoints, data models, and integration patterns used in the Expense Tracker Native application.

## 🏗️ Backend Architecture

The application uses **Supabase** as the backend-as-a-service platform, providing:

- PostgreSQL database with real-time subscriptions
- Authentication and user management
- Row Level Security (RLS) for data protection
- Real-time updates via WebSocket connections

## 🔐 Authentication

### Authentication Flow

```typescript
// 1. Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});

// 2. Get Session
const {
  data: { session },
} = await supabase.auth.getSession();

// 3. Sign Out
const { error } = await supabase.auth.signOut();
```

### OAuth Integration

```typescript
// Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "your-app://auth/callback",
  },
});
```

### Session Management

```typescript
// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case "SIGNED_IN":
      // Handle sign in
      break;
    case "SIGNED_OUT":
      // Handle sign out
      break;
    case "TOKEN_REFRESHED":
      // Handle token refresh
      break;
  }
});
```

## 📊 Data Models

### Expense Model

```typescript
interface Expense {
  id: number; // Primary key
  user_id: string; // Foreign key to auth.users
  name: string | null; // Transaction description
  amount: number | null; // Transaction amount
  is_expense: boolean | null; // true = expense, false = income
  category: number | null; // Foreign key to expense_category
  spend_date: string | null; // Transaction date (ISO string)
  created_at: string; // Record creation timestamp
}

// Insert type (for creating new records)
interface ExpenseInsert {
  user_id?: string;
  name?: string | null;
  amount?: number | null;
  is_expense?: boolean | null;
  category?: number | null;
  spend_date?: string | null;
}

// Update type (for updating existing records)
interface ExpenseUpdate {
  name?: string | null;
  amount?: number | null;
  is_expense?: boolean | null;
  category?: number | null;
  spend_date?: string | null;
}
```

### Category Model

```typescript
interface ExpenseCategory {
  id: number; // Primary key
  user_id: string | null; // Foreign key to auth.users
  name: string | null; // Category name
  is_expense: boolean | null; // true = expense category, false = income
  created_at: string; // Record creation timestamp
}
```

### Loan Model

```typescript
interface Loan {
  id: number; // Primary key
  user_id: string | null; // Foreign key to auth.users
  name: string | null; // Loan description
  total_amount: number | null; // Total loan amount
  interest_rate: number | null; // Interest rate percentage
  created_at: string; // Record creation timestamp
}
```

### Loan Record Model

```typescript
interface LoanRecord {
  id: number; // Primary key
  user_id: string | null; // Foreign key to auth.users
  loan: number | null; // Foreign key to loan table
  amount: string | null; // Payment amount
  pay_date: string | null; // Payment date (ISO string)
  created_at: string; // Record creation timestamp
}
```

## 🛠️ API Endpoints

### Expense Operations

#### Get Expenses

```typescript
// Get all expenses for a user
const { data, error } = await supabase
  .from("expense")
  .select("*")
  .eq("user_id", userId)
  .order("created_at", { ascending: false });

// Get expenses with pagination
const { data, error } = await supabase
  .from("expense")
  .select("*")
  .eq("user_id", userId)
  .range(0, 19) // First 20 records
  .order("created_at", { ascending: false });

// Get expenses with category info
const { data, error } = await supabase
  .from("expense")
  .select(
    `
    *,
    expense_category (
      id,
      name,
      is_expense
    )
  `
  )
  .eq("user_id", userId);
```

#### Create Expense

```typescript
const { data, error } = await supabase
  .from("expense")
  .insert({
    user_id: userId,
    name: "Coffee",
    amount: 5.5,
    is_expense: true,
    category: 1,
    spend_date: new Date().toISOString(),
  })
  .select();
```

#### Update Expense

```typescript
const { data, error } = await supabase
  .from("expense")
  .update({
    name: "Updated Coffee",
    amount: 6.0,
  })
  .eq("id", expenseId)
  .eq("user_id", userId)
  .select();
```

#### Delete Expense

```typescript
const { error } = await supabase
  .from("expense")
  .delete()
  .eq("id", expenseId)
  .eq("user_id", userId);
```

### Category Operations

#### Get Categories

```typescript
const { data, error } = await supabase
  .from("expense_category")
  .select("*")
  .eq("user_id", userId)
  .order("name");
```

#### Create Category

```typescript
const { data, error } = await supabase
  .from("expense_category")
  .insert({
    user_id: userId,
    name: "Transportation",
    is_expense: true,
  })
  .select();
```

#### Update Category

```typescript
const { data, error } = await supabase
  .from("expense_category")
  .update({ name: "Updated Category" })
  .eq("id", categoryId)
  .eq("user_id", userId)
  .select();
```

#### Delete Category

```typescript
const { error } = await supabase
  .from("expense_category")
  .delete()
  .eq("id", categoryId)
  .eq("user_id", userId);
```

## 🔄 Real-time Subscriptions

### Expense Changes

```typescript
const subscription = supabase
  .channel("expense_changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "expense",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log("Expense change:", payload);
      // Handle real-time updates
      switch (payload.eventType) {
        case "INSERT":
          // Handle new expense
          dispatch(addExpenseToStore(payload.new));
          break;
        case "UPDATE":
          // Handle expense update
          dispatch(updateExpenseInStore(payload.new));
          break;
        case "DELETE":
          // Handle expense deletion
          dispatch(removeExpenseFromStore(payload.old.id));
          break;
      }
    }
  )
  .subscribe();

// Cleanup subscription
return () => supabase.removeChannel(subscription);
```

### Category Changes

```typescript
const subscription = supabase
  .channel("category_changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "expense_category",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      // Handle category changes
    }
  )
  .subscribe();
```

## 📈 Advanced Queries

### Get Expense Summary

```typescript
// Get monthly expense summary
const { data, error } = await supabase
  .from("expense")
  .select("amount, is_expense, spend_date")
  .eq("user_id", userId)
  .gte("spend_date", startOfMonth.toISOString())
  .lte("spend_date", endOfMonth.toISOString());
```

### Get Category-wise Expenses

```typescript
const { data, error } = await supabase
  .from("expense")
  .select(
    `
    amount,
    is_expense,
    expense_category (
      id,
      name
    )
  `
  )
  .eq("user_id", userId)
  .eq("is_expense", true);
```

### Search Expenses

```typescript
const { data, error } = await supabase
  .from("expense")
  .select("*")
  .eq("user_id", userId)
  .or(`name.ilike.%${searchTerm}%,amount.like.%${searchTerm}%`);
```

## 🔒 Row Level Security (RLS) Policies

### Expense Table Policies

```sql
-- Users can only see their own expenses
CREATE POLICY "Users can view own expenses" ON public.expense
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own expenses
CREATE POLICY "Users can insert own expenses" ON public.expense
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own expenses
CREATE POLICY "Users can update own expenses" ON public.expense
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own expenses
CREATE POLICY "Users can delete own expenses" ON public.expense
  FOR DELETE USING (auth.uid() = user_id);
```

### Category Table Policies

```sql
-- Similar policies for expense_category table
CREATE POLICY "Users can view own categories" ON public.expense_category
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories" ON public.expense_category
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories" ON public.expense_category
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories" ON public.expense_category
  FOR DELETE USING (auth.uid() = user_id);
```

## 🚀 Redux Integration

### Redux Actions

```typescript
// Async thunk for fetching expenses
export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async ({ userId, page, pageSize }: FetchExpenseParams) => {
    const { data, error } = await supabase
      .from("expense")
      .select("*")
      .eq("user_id", userId)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
);

// Async thunk for adding expense
export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense: ExpenseInsert) => {
    const { data, error } = await supabase
      .from("expense")
      .insert(expense)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);
```

### Real-time Integration with Redux

```typescript
// Setup real-time subscription in component
useEffect(() => {
  if (session?.user?.id) {
    const subscription = subscribeToExpenseChanges({
      userId: session.user.id,
      dispatch,
    }).subscribe();

    return () => subscription.unsubscribe();
  }
}, [session?.user?.id, dispatch]);

// Subscription handler
export const subscribeToExpenseChanges = ({ userId, dispatch }) => {
  return supabase.channel("expense_changes").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "expense",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      dispatch(handleRealtimeExpenseChange(payload));
    }
  );
};
```

## 📊 Data Aggregation Examples

### Calculate Balance

```typescript
const calculateBalance = (expenses: Expense[]) => {
  return expenses.reduce((balance, expense) => {
    const amount = expense.amount || 0;
    return balance + (expense.is_expense ? -amount : amount);
  }, 0);
};
```

### Category-wise Summary

```typescript
const getCategorySummary = (expenses: Expense[]) => {
  return expenses.reduce((summary, expense) => {
    const categoryId = expense.category || "uncategorized";
    const amount = expense.amount || 0;

    if (!summary[categoryId]) {
      summary[categoryId] = { total: 0, count: 0 };
    }

    summary[categoryId].total += expense.is_expense ? amount : 0;
    summary[categoryId].count += 1;

    return summary;
  }, {});
};
```

## ⚡ Performance Optimization

### Pagination Implementation

```typescript
const usePagination = (totalCount: number, pageSize: number = 20) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCount / pageSize);

  const loadPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        dispatch(
          fetchExpense({
            userId,
            page,
            pageSize,
          })
        );
      }
    },
    [userId, totalPages, pageSize]
  );

  return { currentPage, totalPages, loadPage };
};
```

### Optimistic Updates

```typescript
// Optimistically update UI before API call
const addExpenseOptimistic = (expense: ExpenseInsert) => {
  const optimisticExpense = {
    ...expense,
    id: Date.now(), // Temporary ID
    created_at: new Date().toISOString(),
  };

  // Add to store immediately
  dispatch(addExpenseOptimistic(optimisticExpense));

  // Make API call
  dispatch(addExpense(expense))
    .unwrap()
    .then((actualExpense) => {
      // Replace optimistic with actual data
      dispatch(
        replaceOptimisticExpense({
          tempId: optimisticExpense.id,
          actualExpense,
        })
      );
    })
    .catch(() => {
      // Remove optimistic update on error
      dispatch(removeOptimisticExpense(optimisticExpense.id));
    });
};
```

## 🔧 Error Handling

### API Error Types

```typescript
interface SupabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

// Common error handling
const handleSupabaseError = (error: SupabaseError) => {
  switch (error.code) {
    case "PGRST116":
      // Row not found
      showErrorToast("Record not found");
      break;
    case "23505":
      // Unique constraint violation
      showErrorToast("Duplicate entry");
      break;
    default:
      showErrorToast(error.message);
  }
};
```

### Network Error Handling

```typescript
const apiCall = async (operation: () => Promise<any>) => {
  try {
    return await operation();
  } catch (error) {
    if (error.message.includes("network")) {
      showErrorToast("Network error. Please check your connection.");
    } else if (error.message.includes("timeout")) {
      showErrorToast("Request timeout. Please try again.");
    } else {
      handleSupabaseError(error);
    }
    throw error;
  }
};
```

## 📱 Mobile-Specific Considerations

### Offline Support (Future Enhancement)

```typescript
// Queue for offline operations
interface OfflineOperation {
  id: string;
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  data: any;
  timestamp: number;
}

// Store operations when offline
const queueOfflineOperation = (operation: OfflineOperation) => {
  const queue = storage.getArray("offline_queue") || [];
  queue.push(operation);
  storage.setArray("offline_queue", queue);
};

// Sync when back online
const syncOfflineOperations = async () => {
  const queue = storage.getArray("offline_queue") || [];

  for (const operation of queue) {
    try {
      await executeOperation(operation);
    } catch (error) {
      console.error("Failed to sync operation:", operation, error);
    }
  }

  storage.delete("offline_queue");
};
```

This API documentation provides comprehensive coverage of all backend operations, data models, and integration patterns used in the Expense Tracker Native application.
