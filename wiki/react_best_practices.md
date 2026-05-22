Here's a comprehensive README file that enumerates best practices for React and Next.js development:

```markdown
# React & Next.js Best Practices Guide

This document outlines the essential best practices for developing applications with React and Next.js, including code organization, commenting standards, performance optimization, and more.
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Pages**: kebab-case for routes (`about-us.tsx`)

---

## Component Best Practices

### JSDoc/TSDoc Format

```typescript
/**
 * Formats a date string into a localized format
 *
 * @param date - The date to format (Date object, timestamp, or ISO string)
 * @param locale - The locale to use for formatting (defaults to 'en-US')
 * @param options - Optional Intl.DateTimeFormat options
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15', 'fr-FR') // returns "15/01/2024"
 *
 * @throws {Error} When date is invalid
 */
export const formatDate = (
  date: Date | string | number,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions,
): string => {
  // Implementation
};
```

### Inline Comments

```typescript
// ✅ GOOD: Explains WHY, not WHAT
// Cache user data for 5 minutes to reduce API calls
const CACHE_DURATION = 5 * 60 * 1000;

// ✅ GOOD: TODO comments with context
// TODO(john): Optimize this loop for large datasets - JIRA-1234

// ✅ GOOD: Explanation for complex logic
// Using binary search here because the list is sorted and has 10k+ items
const index = binarySearch(sortedUsers, targetUser);
```

### Complex State (useReducer)

```typescript
// ✅ Use reducer for complex state logic
type State = { count: number; step: number };
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_STEP"; payload: number };

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.payload };
    default:
      return state;
  }
};
```

### Global State Recommendations

- **React Context**: For medium-sized apps with moderate state complexity
- **Zustand/Redux**: For large applications with complex state logic
- **TanStack Query**: For server-state management

---

## Performance Optimization

### React Specific

```tsx
// ✅ Memoize expensive computations
const expensiveResult = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ✅ Prevent unnecessary re-renders
const MemoizedChild = React.memo(ChildComponent);

// ✅ Lazy load components
const HeavyComponent = lazy(() => import("./HeavyComponent"));
```

### Image Optimization

```tsx
// ✅ Next.js Image component
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true}  // For above-the-fold images
  loading="eager"  // Critical images
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ❌ Never use unoptimized images
<img src="/large-image.jpg" /> // Bad for performance
```

### Code Splitting

```tsx
// ✅ Dynamic imports for routes
const Dashboard = dynamic(() => import("@/pages/Dashboard"), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if not needed
});

// ✅ Lazy load modals and heavy components
const Modal = lazy(() => import("@/components/Modal"));
```

---

## Next.js Specific Practices

### App Router Practices

```typescript
// ✅ Use metadata API for SEO
export const metadata: Metadata = {
  title: 'My App | Dashboard',
  description: 'User dashboard for managing tasks',
  openGraph: {
    title: 'My App Dashboard',
    description: 'Manage your tasks efficiently',
  }
};

// ✅ Server Components by default
// components/UserList.tsx (Server Component)
export default async function UserList() {
  const users = await fetchUsers();
  return <div>{/* Render users */}</div>;
}

// ✅ Use Client Components only when needed
'use client';
import { useState } from 'react';

export function InteractiveButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <button onClick={() => setIsOpen(true)}>Open</button>;
}
```

### Data Fetching

```typescript
// ✅ Server-side data fetching (App Router)
export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return <article>{post.content}</article>;
}

// ✅ Parallel data fetching
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);

// ❌ Avoid sequential fetching when possible
const users = await fetchUsers(); // Wait for this first
const posts = await fetchPosts(); // Then this
```

### Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  // Protect routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

---

## Styling Guidelines

### CSS Modules

```tsx
// Component.module.css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.buttonPrimary {
  composes: button;
  background-color: blue;
  color: white;
}

// Component.tsx
import styles from './Component.module.css';

<button className={styles.buttonPrimary}>
  Click me
</button>
```

### Tailwind CSS Best Practices

```tsx
// ✅ Group related classes
<button
  className={cn(
    "px-4 py-2 rounded-lg font-medium transition-colors",
    variant === "primary" && "bg-blue-600 hover:bg-blue-700 text-white",
    variant === "secondary" && "bg-gray-200 hover:bg-gray-300 text-gray-900",
    disabled && "opacity-50 cursor-not-allowed",
  )}
  disabled={disabled}
>
  {children}
</button>;

// ✅ Use cn() for conditional classes
import { cn } from "@/lib/utils";

const buttonClasses = cn(
  "base-button-classes",
  isActive && "active-classes",
  className, // Allow className override
);
```

---

## Testing Practices

### Unit Testing

```tsx
// Component.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

```tsx
// LoginForm.integration.test.tsx
test("submits form with user data", async () => {
  render(<LoginForm />);

  await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(screen.getByLabelText(/password/i), "password123");
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Welcome")).toBeInTheDocument();
});
```

---

## Security Best Practices

### XSS Prevention

```tsx
// ✅ React escapes by default - safe
<div>{userInput}</div>

// ❌ Dangerous - never use dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ If you must render HTML, sanitize first
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

### Environment Variables

```typescript
// ✅ Use server-side env vars only
// .env.local
API_SECRET_KEY = xxx;

// ✅ Validate required env vars
if (!process.env.API_SECRET_KEY) {
  throw new Error("API_SECRET_KEY is required");
}

// ❌ Never expose secrets in client components
("use client");
// NEVER do this - secret exposed in browser!
const apiKey = process.env.NEXT_PUBLIC_API_SECRET;
```

### Authentication & Authorization

```tsx
// ✅ Protected routes with middleware
// ✅ Use HTTP-only cookies for tokens
// ✅ Implement CSRF protection
// ✅ Rate limiting on API routes
```

---

## Code Quality & Linting

### ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "react/display-name": "error",
    "react/no-array-index-key": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## Additional Best Practices

### Error Boundaries

```tsx
class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught error:", error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}
```

### Performance Monitoring

```tsx
// ✅ Use Next.js Analytics
import { Analytics } from "@vercel/analytics/react";

// ✅ Implement custom performance metrics
export const usePerformanceMark = (name: string) => {
  useEffect(() => {
    performance.mark(`${name}-start`);
    return () => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    };
  }, [name]);
};
```

---

## Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/react)
- [Web.dev Accessibility](https://web.dev/accessibility/)

---

## Contributing

When contributing to this repository, please ensure:

1. All components have proper JSDoc comments
2. Tests are written for new features
3. Accessibility standards are met
4. Performance impact is considered
5. TypeScript is strictly typed (no `any`)

---

**Last Updated:** 2024  
**Maintainers:** Development Team

```

This README provides a comprehensive guide covering best practices for React and Next.js development, including detailed commenting standards, code organization, performance optimization, security, accessibility, and more.
```
