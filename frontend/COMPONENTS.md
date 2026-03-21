# Reusable Component Candidates

Analysis of UI patterns duplicated across the 9 pages in `frontend/src/pages/`. Each section describes a candidate component, which pages use it, its proposed props API, and the common JSX pattern to standardize.

---

## Priority Overview

| Priority | Component | Pages |
|---|---|---|
| HIGH | `PageHeader` | HomeFeed, SearchResults, RestaurantMenu, Basket, OrderHistory, OrderDetails |
| HIGH | `FilterChip` | SearchResults, OrderHistory, RestaurantMenu |
| HIGH | `HorizontalScroller` | HomeFeed, SearchResults, OrderHistory, Profile |
| HIGH | `StatusBadge` | OrderHistory, OrderDetails, RestaurantMenu, SearchResults, Basket |
| HIGH | `OrderSummary` | Basket, OrderDetails, SecureCheckout |
| HIGH | `SymbolIcon` | HomeFeed, SearchResults, OrderHistory *(inline duplicate)* |
| MEDIUM | `RestaurantCard` | HomeFeed, SearchResults |
| MEDIUM | `OrderCard` | OrderHistory, Profile |
| MEDIUM | `MenuCard` | RestaurantMenu |
| MEDIUM | `ImageWithOverlay` | HomeFeed, SearchResults, RestaurantMenu |
| MEDIUM | `FloatingActionBar` | Basket, OrderDetails, SecureCheckout, RestaurantMenu |
| MEDIUM | `SectionHeader` | HomeFeed, Profile, OrderHistory |
| MEDIUM | `FormInputWithIcon` | Login, Register |
| MEDIUM | `AlertBox` | Login, Register, SecureCheckout |
| LOW | `QuantityControl` | Basket *(local — needs lifting)* |
| LOW | `Divider` | Basket, OrderDetails, OrderHistory, Profile |

---

## HIGH PRIORITY

### `PageHeader`

**Description:** Fixed, frosted-glass top bar with back button, centred title, and an optional right-side action slot. Used in every content page.

**Pages:** HomeFeed, SearchResults, RestaurantMenu, Basket, OrderHistory, OrderDetails

**Suggested file:** `components/PageHeader.jsx`

**Props:**
```ts
{
  title: string;
  onBack?: () => void;        // defaults to router.history.back()
  rightAction?: ReactNode;    // icon button, badge, etc.
}
```

**Pattern to standardize:**
```jsx
<header className="fixed top-0 z-50 w-full bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10">
  <div className="flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
    <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container">
      <SymbolIcon name="arrow_back" />
    </button>
    <h1 className="font-title text-lg text-on-surface">{title}</h1>
    <div className="w-10">{rightAction}</div>
  </div>
</header>
```

---

### `FilterChip`

**Description:** Pill-shaped toggle button used in horizontal filter bars. Active state uses `bg-primary` + white text; inactive uses `bg-surface-container-high`.

**Pages:** SearchResults (cuisine filters), OrderHistory (status filters), RestaurantMenu (category tabs)

**Suggested file:** `components/FilterChip.jsx`

**Props:**
```ts
{
  label: string;
  icon?: string;        // material symbol name
  active?: boolean;
  onClick: () => void;
}
```

**Pattern to standardize:**
```jsx
<button
  onClick={onClick}
  className={active
    ? 'flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white'
    : 'flex items-center gap-2 rounded-full bg-surface-container-high px-5 py-2.5 text-sm font-medium text-on-surface'
  }
>
  {icon && <SymbolIcon name={icon} className="text-base" />}
  {label}
</button>
```

---

### `HorizontalScroller`

**Description:** A horizontally scrollable container with hidden scrollbar. Wraps any list of chips, cards, or thumbnails.

**Pages:** HomeFeed (category pills), SearchResults (filter chips), OrderHistory (filter tabs), Profile (saved addresses)

**Suggested file:** `components/HorizontalScroller.jsx`

**Props:**
```ts
{
  children: ReactNode;
  className?: string;   // extra classes on the wrapper
  gap?: string;         // gap-* class, default 'gap-3'
}
```

**Pattern to standardize:**
```jsx
<div className={`flex overflow-x-auto scrollbar-hide ${gap} ${className}`}>
  {children}
</div>
```

---

### `StatusBadge`

**Description:** Small pill badge for order status or item labels. Color variant is driven by the status value.

**Pages:** OrderHistory (Delivered / Processing / Cancelled), OrderDetails, RestaurantMenu (Chef's Signature / Michelin Selection), SearchResults (Curator's Choice / New Arrival), Basket (Chef's Pick)

**Suggested file:** `components/StatusBadge.jsx`

**Props:**
```ts
{
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}
```

**Variant classes:**
```ts
const variantClass = {
  success: 'bg-tertiary-container text-on-tertiary-container',
  warning: 'bg-secondary-container text-on-secondary-container',
  error:   'bg-error-container text-on-error-container',
  info:    'bg-primary-container text-on-primary-container',
  neutral: 'bg-surface-container-high text-on-surface-variant',
};
```

**Pattern to standardize:**
```jsx
<span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${variantClass[variant]}`}>
  {label}
</span>
```

---

### `OrderSummary`

**Description:** Price breakdown section showing subtotal, fees, and total. Identical layout appears in three pages.

**Pages:** Basket, OrderDetails, SecureCheckout

**Suggested file:** `components/OrderSummary.jsx`

**Props:**
```ts
{
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  currency?: string;  // default '£'
}
```

**Pattern to standardize:**
```jsx
<div className="space-y-3 rounded-2xl bg-surface-container p-4">
  <Row label="Subtotal"      value={subtotal} />
  <Row label="Delivery fee"  value={deliveryFee} />
  <Row label="Service fee"   value={serviceFee} />
  <div className="border-t border-outline-variant/20 pt-3">
    <Row label="Total" value={subtotal + deliveryFee + serviceFee} bold />
  </div>
</div>
```

---

### `SymbolIcon`

**Description:** Thin wrapper around Material Symbols icon font. Duplicated inline in at least 3 pages — should live in one shared file.

**Pages:** HomeFeed, SearchResults, OrderHistory *(copy-pasted verbatim)*

**Suggested file:** `components/SymbolIcon.jsx`

**Props:**
```ts
{
  name: string;
  className?: string;
  filled?: boolean;
}
```

**Pattern to standardize:**
```jsx
const filledStyle = { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" };

export default function SymbolIcon({ name, className = '', filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={filled ? filledStyle : undefined}
    >
      {name}
    </span>
  );
}
```

---

## MEDIUM PRIORITY

### `RestaurantCard`

**Description:** Card with cover image, cuisine badge, name, delivery time, rating, and "Curator's Choice" badge. Used in both the home grid and search results list.

**Pages:** HomeFeed, SearchResults

**Suggested file:** `components/RestaurantCard.jsx`

**Props:**
```ts
{
  image: string;
  name: string;
  cuisine: string;
  deliveryTime: string;
  rating: number;
  badge?: string;         // e.g. "Curator's Choice"
  onClick?: () => void;
}
```

---

### `OrderCard`

**Description:** Compact card showing an order thumbnail, restaurant name, item count, total, date, and status badge. Appears in order history list and profile page.

**Pages:** OrderHistory, Profile

**Suggested file:** `components/OrderCard.jsx`

**Props:**
```ts
{
  image: string;
  restaurant: string;
  itemCount: number;
  total: number;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  onReorder?: () => void;
  onClick?: () => void;
}
```

---

### `MenuCard`

**Description:** Menu item card with image, name, description, price, and an add-to-basket button. Used in RestaurantMenu's two menu sections.

**Pages:** RestaurantMenu

**Suggested file:** `components/MenuCard.jsx`

**Props:**
```ts
{
  image: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  onAdd?: () => void;
}
```

---

### `ImageWithOverlay`

**Description:** Image container with a gradient overlay on top or bottom, used to render text/badges over photos.

**Pages:** HomeFeed (restaurant card rating badge), SearchResults (delivery time overlay), RestaurantMenu (hero header gradient)

**Suggested file:** `components/ImageWithOverlay.jsx`

**Props:**
```ts
{
  src: string;
  alt: string;
  className?: string;
  overlayPosition?: 'top' | 'bottom';  // gradient direction
  children?: ReactNode;                 // content rendered inside overlay
}
```

---

### `FloatingActionBar`

**Description:** Fixed-to-bottom action area with a full-width primary CTA button. Frosted glass background. Used in 4 pages.

**Pages:** Basket (Proceed to Checkout), OrderDetails (Reorder), SecureCheckout (Place Order), RestaurantMenu (View Basket)

**Suggested file:** `components/FloatingActionBar.jsx`

**Props:**
```ts
{
  label: string;
  onClick: () => void;
  disabled?: boolean;
  subtext?: string;     // e.g. order total
}
```

**Pattern to standardize:**
```jsx
<div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/10">
  <div className="max-w-lg mx-auto">
    {subtext && <p className="text-center text-xs text-on-surface-variant mb-2">{subtext}</p>}
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-gradient-to-br from-primary to-primary-container py-4 font-semibold text-white disabled:opacity-50"
    >
      {label}
    </button>
  </div>
</div>
```

---

### `SectionHeader`

**Description:** Row with a section title on the left and an optional "View all" link on the right.

**Pages:** HomeFeed ("Quick Categories" + "View all"), Profile ("My Orders" + "View History"), OrderHistory (search input header)

**Suggested file:** `components/SectionHeader.jsx`

**Props:**
```ts
{
  title: string;
  action?: { label: string; onClick: () => void };
}
```

**Pattern to standardize:**
```jsx
<div className="flex items-center justify-between mb-4">
  <h2 className="font-title text-base text-on-surface">{title}</h2>
  {action && (
    <button onClick={action.onClick} className="text-xs text-primary font-medium">
      {action.label}
    </button>
  )}
</div>
```

---

### `FormInputWithIcon`

**Description:** Text input with a left icon and an optional right icon (e.g. show/hide password). Both Login and Register use this pattern.

**Pages:** Login, Register

**Suggested file:** `components/FormInputWithIcon.jsx`

**Props:**
```ts
{
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e) => void;
  leftIcon: string;         // material symbol name
  rightIcon?: string;
  onRightIconClick?: () => void;
}
```

**Pattern to standardize:**
```jsx
<div className="relative flex items-center">
  <SymbolIcon name={leftIcon} className="absolute left-4 text-on-surface-variant" />
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full rounded-2xl bg-surface-container-highest py-4 pl-12 pr-12 text-sm outline-none focus:ring-1 focus:ring-primary"
  />
  {rightIcon && (
    <button onClick={onRightIconClick} className="absolute right-4">
      <SymbolIcon name={rightIcon} className="text-on-surface-variant" />
    </button>
  )}
</div>
```

---

### `AlertBox`

**Description:** Inline alert for error or informational messages. Appears above forms on Login and Register, and as a security notice on SecureCheckout.

**Pages:** Login, Register, SecureCheckout

**Suggested file:** `components/AlertBox.jsx`

**Props:**
```ts
{
  message: string;
  variant?: 'error' | 'info';   // default 'error'
  icon?: string;                // material symbol name
}
```

**Pattern:**
```jsx
<div className={`flex items-center gap-3 rounded-2xl p-4 ${
  variant === 'error' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'
}`}>
  <SymbolIcon name={icon ?? (variant === 'error' ? 'error' : 'info')} />
  <p className="text-sm">{message}</p>
</div>
```

---

## LOW PRIORITY

### `QuantityControl`

**Description:** Row of − / count / + buttons. Already exists as an inline component inside `Basket.jsx`. Should be lifted into `components/` so RestaurantMenu and any future cart UIs can reuse it.

**Pages:** Basket *(local only)*

**Suggested file:** `components/QuantityControl.jsx`

---

### `Divider`

**Description:** Thin horizontal rule using the design system's `outline-variant` color.

**Pages:** Basket, OrderDetails, OrderHistory, Profile

**Suggested file:** `components/Divider.jsx`

```jsx
export default function Divider({ className = '' }) {
  return <hr className={`border-outline-variant/10 ${className}`} />;
}
```

---

## Data Patterns Note

All 9 pages currently use **static mock data** defined as constants at the top of each file (e.g. `RESTAURANTS`, `ORDERS`, `cartItems`). The infrastructure for real data is already in place:

- `frontend/src/queries/` — TanStack Query hooks
- `frontend/src/service/requests.js` — axios API calls
- `frontend/src/auth/AuthContext.jsx` — auth state

When replacing mock data, wire each page through a query hook in `queries/` rather than fetching directly in the component.
