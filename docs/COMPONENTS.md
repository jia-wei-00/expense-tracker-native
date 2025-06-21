# Component Documentation

This document provides detailed information about all UI components, their architecture, props, usage patterns, and the design system implementation in the Expense Tracker Native application.

## 🏗️ Component Architecture

The application follows a hierarchical component structure with clear separation of concerns:

```
components/
├── ui/                          # Base UI components (Gluestack UI)
├── Text/                        # Typography system
├── Form Components/             # Form controls with validation
├── Navigation Components/       # Tab bars, menus, navigation
├── Business Components/         # Feature-specific components
└── Layout Components/           # Screen containers, wrappers
```

## 🎨 Design System

### Typography System (`components/Text/`)

#### Text Components Hierarchy

```typescript
// Base text component with common styles
<Text.Normal>Regular text content</Text.Normal>

// Typography variants
<Text.Title>Main page titles</Text.Title>
<Text.Subtitle>Section subtitles</Text.Subtitle>
<Text.Caption>Small descriptive text</Text.Caption>
<Text.Bold>Emphasized content</Text.Bold>
```

#### Implementation

```typescript
// components/Text/index.tsx
interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

export const Text = {
  Normal: ({ children, className, ...props }: TextProps) => (
    <BaseText className={cn("text-base", className)} {...props}>
      {children}
    </BaseText>
  ),

  Title: ({ children, className, ...props }: TextProps) => (
    <BaseText className={cn("text-2xl font-bold", className)} {...props}>
      {children}
    </BaseText>
  ),

  Subtitle: ({ children, className, ...props }: TextProps) => (
    <BaseText className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </BaseText>
  ),

  Caption: ({ children, className, ...props }: TextProps) => (
    <BaseText className={cn("text-sm text-gray-600", className)} {...props}>
      {children}
    </BaseText>
  ),

  Bold: ({ children, className, ...props }: TextProps) => (
    <BaseText className={cn("font-bold", className)} {...props}>
      {children}
    </BaseText>
  ),
};
```

### UI Foundation (`components/ui/`)

The application uses **Tailwind CSS** via **NativeWind** for utility-first styling, combined with **Gluestack UI** components:

#### Core UI Components

- **Button**: Primary actions, variants (solid, outline, ghost)
- **Input**: Text inputs with validation states
- **Modal**: Overlay dialogs and forms
- **Accordion**: Collapsible content sections
- **Select**: Dropdown selections
- **Radio**: Option selection
- **Avatar**: User profile images
- **Icon**: SVG icon system

#### Button Component

```typescript
// Usage examples
<Button variant="solid" size="md" onPress={handleSubmit}>
  <ButtonText>Submit</ButtonText>
</Button>

<Button variant="outline" size="sm" disabled={loading}>
  <ButtonSpinner />
  <ButtonText>Loading...</ButtonText>
</Button>
```

#### Modal System

```typescript
// Modal structure
<Modal isOpen={showModal} onClose={handleClose} size="md">
  <ModalBackdrop />
  <ModalContent>
    <ModalHeader>
      <Heading size="lg">Modal Title</Heading>
      <ModalCloseButton>
        <Icon as={CloseIcon} />
      </ModalCloseButton>
    </ModalHeader>
    <ModalBody>{/* Modal content */}</ModalBody>
    <ModalFooter>
      <Button onPress={handleClose}>
        <ButtonText>Close</ButtonText>
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

## 🔧 Form Components

### Form Controllers with Validation

#### InputWithController

```typescript
interface InputWithControllerProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  errors?: string;
  required?: boolean;
  isReadOnly?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

// Usage
<InputWithController
  control={control}
  name="amount"
  label={t("Amount")}
  placeholder={t("Enter amount")}
  errors={errors.amount?.message}
  required={true}
  keyboardType="numeric"
/>;
```

#### DatePickerWithController

```typescript
interface DatePickerProps {
  control: Control<any>;
  name: string;
  label: string;
  errors?: string;
  required?: boolean;
  isReadOnly?: boolean;
  datePickerProps?: {
    locale?: string;
    value?: Date;
    mode?: "date" | "time" | "datetime";
  };
}

// Usage
<DatePickerWithController
  control={control}
  name="spend_date"
  label={t("Date")}
  errors={errors.spend_date?.message}
  required={true}
  datePickerProps={{
    locale: i18n.language,
    mode: "date",
  }}
/>;
```

#### SelectWithController

```typescript
interface SelectOption {
  label: string;
  value: string;
}

interface SelectWithControllerProps {
  control: Control<any>;
  name: string;
  label: string;
  options: SelectOption[];
  errors?: string;
  required?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
}

// Usage
<SelectWithController
  control={control}
  name="category"
  label={t("Category")}
  options={categoryOptions}
  errors={errors.category?.message}
  required={true}
  placeholder={t("Select category")}
/>;
```

#### RadioWithController

```typescript
interface RadioWithControllerProps {
  control: Control<any>;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  errors?: string;
  required?: boolean;
  isReadOnly?: boolean;
  onChange?: () => void;
}

// Usage
<RadioWithController
  control={control}
  name="is_expense"
  label={t("Transaction Type")}
  options={[
    { label: t("Expense"), value: "true" },
    { label: t("Income"), value: "false" },
  ]}
  errors={errors.is_expense?.message}
  required={true}
  onChange={() => resetField("category")}
/>;
```

## 📱 Screen Components

### ScreenContainer

Main wrapper for all screens with consistent layout and functionality:

```typescript
interface ScreenContainerProps {
  children: React.ReactNode;
  refreshControl?: React.ReactElement;
  stickyContent?: React.ReactNode;
  showScrollIndicator?: boolean;
}

// Usage
<ScreenContainer
  refreshControl={
    <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
  }
  stickyContent={
    <View>
      <Text.Title>Page Title</Text.Title>
      <SearchInput />
    </View>
  }
>
  <MainContent />
</ScreenContainer>;
```

### Navigation Components

#### TabBar

Custom tab bar with dynamic styling:

```typescript
interface TabBarProps {
  state: TabNavigationState<any>;
  descriptors: any;
  navigation: any;
}

// Features:
// - Active/inactive states
// - Icon and label display
// - Theme-aware styling
// - Accessibility support
```

#### TopBar

Header component with actions:

```typescript
interface TopBarProps {
  title?: string;
  showBack?: boolean;
  rightActions?: React.ReactNode;
  onBackPress?: () => void;
}

// Usage
<TopBar
  title={t("Settings")}
  showBack={true}
  rightActions={<Menu />}
  onBackPress={() => navigation.goBack()}
/>;
```

#### Menu

Action sheet menu component:

```typescript
interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItemProps[];
}

interface MenuItemProps {
  label: string;
  onPress: () => void;
  icon?: React.ComponentType;
  destructive?: boolean;
}

// Usage
<Menu
  isOpen={showMenu}
  onClose={() => setShowMenu(false)}
  items={[
    {
      label: t("Logout"),
      onPress: handleLogout,
      destructive: true,
    },
  ]}
/>;
```

## 🏠 Home Screen Components

### AddRecordButton

Floating action button for quick expense entry:

```typescript
interface AddRecordButtonProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

// Features:
// - Fixed position floating button
// - Animated appearance
// - Quick access to expense form
```

### AddRecordForm

Main form for expense/income entry:

```typescript
interface AddRecordFormProps {
  allFormMethods: UseFormReturn<AddRecordSchema>;
  category: Category[];
  loading: boolean;
  isReadOnly?: boolean;
  setShowModal: (show: boolean) => void;
  onClose: () => void;
}

// Features:
// - Complete expense/income form
// - Category selection
// - Date picker integration
// - Form validation
// - Read-only mode for viewing
```

### Records

List component for displaying transactions:

```typescript
interface RecordsProps {
  search: string;
  recordType: RecordType;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  data: Array<Expense | Category>;
  disabled?: boolean;
  handleEdit: (data: Expense | Category, hasCreatedDate?: boolean) => void;
  defaultValues?: ModalDefaultValues;
  onClose?: () => void;
  type?: "expense" | "category";
}

// Features:
// - Accordion-style record display
// - Edit/delete actions
// - Search filtering
// - Loading states
// - Empty states
```

### OverallBlock

Balance and summary display:

```typescript
interface OverallBlockProps {
  balance?: number;
  totalIncome?: number;
  totalExpense?: number;
}

// Features:
// - Current balance calculation
// - Income/expense summary
// - Formatted currency display
// - Color-coded positive/negative
```

### RecordTypeBlock

Toggle between expense/income views:

```typescript
interface RecordTypeBlockProps {
  recordType: RecordType;
  setRecordType: (type: RecordType) => void;
}

// Features:
// - Segmented control styling
// - Smooth transitions
// - Active state indication
```

## 📊 History Screen Components

### Chart

Data visualization component:

```typescript
interface ChartProps {
  data: ChartData[];
  type: "pie" | "bar" | "line";
  height?: number;
  colors?: string[];
}

interface ChartData {
  categoryId: number;
  categoryName: string;
  value: number;
  color: string;
  percentage: number;
}

// Features:
// - Multiple chart types
// - Interactive elements
// - Responsive sizing
// - Custom color schemes
// - Animation support
```

### Legend

Chart legend component:

```typescript
interface LegendProps {
  pieData: ChartData[];
  layout?: "horizontal" | "vertical";
}

// Features:
// - Color-coded categories
// - Percentage display
// - Flexible layout options
// - Touch interactions
```

### Dot

Visual indicator for legend items:

```typescript
interface DotProps {
  color: string;
  size?: number;
}

// Simple colored dot for legend entries
```

## ⚙️ Settings Components

### Item

Settings list item component:

```typescript
interface ItemProps {
  items: SettingItemProps[];
  children?: React.ReactNode;
}

interface SettingItemProps {
  label: string;
  iconLabel?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

// Features:
// - Consistent list styling
// - Icon support
// - Action handling
// - Accessibility
```

### Settings Modals

Various modal components for settings:

#### ThemeModal

```typescript
interface ThemeModalProps extends ModalProps {
  size: FontSize;
}

// Features:
// - Theme selection (light/dark/system)
// - Preview functionality
// - Immediate application
```

#### LanguageModal

```typescript
interface LanguageModalProps extends ModalProps {
  size: FontSize;
}

// Features:
// - Language selection
// - Flag icons
// - Instant translation updates
```

#### FontSizeModal

```typescript
interface FontSizeModalProps extends ModalProps {
  size: FontSize;
}

// Features:
// - Font size options
// - Preview text
// - Dynamic sizing
```

#### AuthenticationModal

```typescript
interface AuthenticationModalProps extends ModalProps {
  size: FontSize;
}

// Features:
// - Biometric options
// - Security settings
// - Device capability detection
```

## 📂 Category Components

### CategoryForm

Form for category management:

```typescript
interface CategoryFormProps {
  allFormMethods: UseFormReturn<CategorySchema>;
  category: Category[];
  loading: boolean;
  isReadOnly?: boolean;
  setShowModal: (show: boolean) => void;
  onClose: () => void;
}

// Features:
// - Category creation/editing
// - Type selection (expense/income)
// - Form validation
// - Duplicate prevention
```

### CategoryModal

Modal wrapper for category operations:

```typescript
interface CategoryModalProps {
  showModal: boolean;
  defaultValues?: ModalDefaultValues;
  onClose?: () => void;
  type: "expense" | "category";
  setShowModal: (value: boolean) => void;
}

// Features:
// - CRUD operations
// - Form state management
// - Error handling
// - Loading states
```

### CategoryRecord

Category list display:

```typescript
interface CategoryRecordProps {
  search: string;
  data: Category[];
  handleEdit: (data: Category, hasCreatedDate?: boolean) => void;
  disabled?: boolean;
}

// Features:
// - Category listing
// - Search functionality
// - Edit/delete actions
// - Type filtering
```

## 🔧 Utility Components

### Pagination

Page navigation component:

```typescript
interface PaginationProps {
  items: PaginationItem[];
  onPageChange?: (page: number) => void;
}

interface PaginationItem {
  page: number;
  isActive: boolean;
  isDisabled: boolean;
}

// Features:
// - Page number display
// - Navigation arrows
// - Active state indication
// - Disabled state handling
```

### Toaster

Toast notification system:

```typescript
interface ToasterProps {
  position?: "top" | "bottom";
  offset?: number;
  visibleToasts?: number;
}

// Features:
// - Multiple toast types
// - Auto-dismiss
// - Custom positioning
// - Animation support
```

### DropdownBox

Custom dropdown component:

```typescript
interface DropdownBoxProps {
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Features:
// - Custom styling
// - Search functionality
// - Keyboard navigation
// - Accessibility support
```

## 🎯 Component Usage Patterns

### Higher-Order Components (HOCs)

#### withController

Wrapper for form controls with React Hook Form integration:

```typescript
const withController = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return (props: T & ControllerProps) => (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field, fieldState }) => (
        <Component
          {...props}
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
```

### Custom Hooks for Components

#### useModal

Modal state management:

```typescript
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};
```

#### useFormWithValidation

Form setup with schema validation:

```typescript
const useFormWithValidation = <T extends object>(
  schema: yup.ObjectSchema<T>,
  defaultValues?: DefaultValues<T>
) => {
  const { t } = useTranslation();

  return useForm<T>({
    resolver: yupResolver(schema(t)),
    defaultValues,
    mode: "onChange",
  });
};
```

## 🎨 Styling System

### Tailwind CSS via NativeWind

The application uses **Tailwind CSS** through **NativeWind** for utility-first styling in React Native:

```typescript
// Utility classes for common patterns
const commonStyles = {
  container: "flex-1 bg-background",
  card: "bg-white rounded-lg shadow-sm p-4",
  button: "px-4 py-2 rounded-md",
  input: "border border-gray-300 rounded-md px-3 py-2",
  text: "text-gray-900 dark:text-gray-100",
};

// Usage in components
<View className={cn(commonStyles.container, "px-4")}>
  <View className={commonStyles.card}>
    <Text className={commonStyles.text}>Content</Text>
  </View>
</View>;
```

### Theme Support

Components automatically adapt to theme changes:

```typescript
// Theme-aware component
const ThemedComponent = ({ children, className }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        "bg-white dark:bg-gray-800",
        "border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {children}
    </View>
  );
};
```

### Responsive Design

Components adapt to different screen sizes:

```typescript
// Responsive breakpoints
const breakpoints = {
  sm: "min-w-[640px]",
  md: "min-w-[768px]",
  lg: "min-w-[1024px]",
  xl: "min-w-[1280px]",
};

// Usage
<View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <ItemCard key={item.id} data={item} />
  ))}
</View>;
```

## 🧪 Component Testing

### Testing Patterns

```typescript
// Component test example
describe("AddRecordForm", () => {
  const mockProps = {
    allFormMethods: mockFormMethods,
    category: mockCategories,
    loading: false,
    setShowModal: jest.fn(),
    onClose: jest.fn(),
  };

  it("should render form fields correctly", () => {
    render(<AddRecordForm {...mockProps} />);

    expect(screen.getByLabelText("Name")).toBeOnTheScreen();
    expect(screen.getByLabelText("Amount")).toBeOnTheScreen();
    expect(screen.getByLabelText("Category")).toBeOnTheScreen();
  });

  it("should call onSubmit when form is valid", async () => {
    const user = userEvent.setup();
    render(<AddRecordForm {...mockProps} />);

    await user.type(screen.getByLabelText("Name"), "Coffee");
    await user.type(screen.getByLabelText("Amount"), "5.50");
    await user.press(screen.getByText("Submit"));

    expect(mockProps.onSubmit).toHaveBeenCalledWith({
      name: "Coffee",
      amount: 5.5,
      // ... other fields
    });
  });
});
```

### Accessibility Testing

```typescript
// Accessibility checks
it("should be accessible", () => {
  render(<Component />);

  // Check for accessibility labels
  expect(screen.getByA11yLabel("Add expense")).toBeOnTheScreen();

  // Check for proper heading hierarchy
  expect(screen.getByA11yRole("header")).toBeOnTheScreen();

  // Check for keyboard navigation
  const button = screen.getByText("Submit");
  expect(button).toBeAccessible();
});
```

This component documentation provides comprehensive coverage of all UI components, their structure, props, usage patterns, and implementation details in the Expense Tracker Native application.
