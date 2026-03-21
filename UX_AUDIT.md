# UX/UI Audit — Verve Kitchen Delivery App

> **Date**: 2026-03-21
> **Scope**: Frontend-only audit of current page inventory, user flows, and identified gaps.
> **Approach**: Treat the app as a consumer food delivery product (similar to Uber Eats / DoorDash) and measure against expected user journeys.

---

## 1. Current Page Inventory

| # | Page | Route | Status | Notes |
|---|------|--------|--------|-------|
| 1 | HomeFeed | `/` | ✅ Implemented | Mock data; categories non-functional; file at `pages/home/HomeFeed.jsx` |
| 2 | Login | `/login` | ✅ Implemented | Connected to API |
| 3 | Register | `/register` | ✅ Implemented | Connected to API |
| 4 | SearchResults | `/search` | ✅ Implemented | Mock data; filter chips non-functional |
| 5 | RestaurantMenu | `/restaurant-menu/:id` | ✅ Implemented | Cart state is local (resets on nav) |
| 6 | Cart | `/cart` | ✅ Implemented | Mock data; quantity controls non-functional |
| 7 | OrderHistory | `/order-history` | ✅ Implemented | Mock data; search/filter non-functional |
| 8 | OrderDetails | `/order-details` | ✅ Implemented | Mock data; static, no dynamic param |
| 9 | SecureCheckout | `/checkout` | ✅ Implemented | Mock data; "Place Order" now navigates to `/order-tracking` |
| 10 | Profile | `/profile` | ✅ Implemented | Mock data; most actions are no-ops |
| 11 | OrderTracking | `/order-tracking` | ✅ Implemented | Mock data; no real-time; no orderId param |
| 12 | ForgotPassword | `/forgot-password` | ✅ Implemented | UI only; form submit is a no-op |
| 13 | AccountSettings | `/account-settings` | ✅ Implemented | Reads real user data from API; preferences in localStorage; change-password/delete not built |
| 14 | SavedAddresses | `/saved-addresses` | ✅ Implemented | Mock data; edit/delete buttons are no-ops; no add-address form |
| 15 | Categories | `/categories` | ✅ Implemented | Mock data; all cards link to `/search` without a filter param |

---

## 2. Missing Pages

### 2.1 Critical Path (Blockers to core user journey)

#### `POST-ORDER-CONFIRMATION` — `/order-confirmation`
- **Gap**: After "Place Order" in SecureCheckout, there is no dedicated confirmation page. `Place Order` now navigates to `/order-tracking`, which partially substitutes, but there is no explicit order number, success state, or summary before tracking begins.
- **Needed UI**: Order number, estimated delivery time, map with driver pin, summary of items ordered, CTA to "Track Order".
- **Priority**: 🔴 P0 — checkout still has no proper resolution step.

#### `ORDER-TRACKING` — `/order-tracking` ⚠️ Partially Built
- **Status**: Page exists (`OrderTracking.jsx`). Shows 4-step progress indicator, driver card, map placeholder, and order cost breakdown.
- **Remaining gaps**: All data is hardcoded mock. No `orderId` param — the page always shows the same order regardless of which order was placed. No real-time updates. Route differs from original design (`/order-tracking` instead of `/order/:orderId/track`).
- **Priority**: 🟠 P1 (downgraded) — shell exists; needs to be wired to a real order ID and live status.

---

### 2.2 High Priority (Broken flows referenced in existing UI)

#### `FORGOT-PASSWORD` — `/forgot-password` ⚠️ Partially Built
- **Status**: Page exists (`ForgotPassword.jsx`). "Forgot Password?" link on Login now navigates correctly.
- **Remaining gaps**: Form submit handler is empty — no API call, no OTP step, no new-password form, no success state.
- **Priority**: 🟠 P1 — link no longer dead-ends, but the flow has no actual effect.

#### `ACCOUNT-SETTINGS` — `/account-settings` ⚠️ Partially Built
- **Status**: Page exists (`AccountSettings.jsx`). Profile "Account Settings" card now navigates correctly. Page reads real user profile data from the API and stores notification preferences in localStorage.
- **Remaining gaps**: Change password section not present. Delete account option not present. Save actions need API wiring.
- **Priority**: 🟠 P1 — basic info display works; write operations not yet live.

#### `ADDRESS-MANAGEMENT` — `/saved-addresses` ⚠️ Partially Built
- **Status**: Page exists (`SavedAddresses.jsx`). Profile "Saved Addresses" card now navigates correctly. Displays a list of mock saved addresses.
- **Remaining gaps**: Edit and delete buttons have no `onClick` handlers (still no-ops). No "Add new address" form. No set-as-default toggle. HomeFeed location picker still has no functional destination.
- **Priority**: 🟠 P1 — page is a visual shell; all write operations are blocked.

#### `PAYMENT-METHODS` — `/payment-methods`
- **Gap**: "Payment Methods" in Profile and "Add New Method" in SecureCheckout both dead-end. Users cannot manage cards.
- **Needed UI**: List of saved cards with remove option, add card form (card number, expiry, CVV), digital wallet links (Apple Pay, Google Pay).
- **Priority**: 🟠 P1 — direct blocker to placing real orders.

---

### 2.3 Medium Priority (Important but not immediate blockers)

#### `ITEM-DETAIL` — `/restaurant-menu/:id/item/:itemId`
- **Gap**: No way to see allergen info, full description, or customizations (size, extras, spice level) before adding to cart. Items are added with a single tap with no options.
- **Needed UI**: Modal or bottom sheet with full item description, photo, allergen tags, modifier groups (optional add-ons, required size selection), quantity selector, "Add to Order" CTA.
- **Priority**: 🟡 P2 — essential for dietary needs and upsell.

#### `ORDER-REVIEW` — step within checkout, or `/checkout/review`
- **Gap**: Cart goes directly to payment. There is no confirmation step where users review the full order, delivery address, and timing before entering payment.
- **Needed UI**: Delivery address (editable), estimated time, full item list with final prices, promo code input, then proceed to payment.
- **Priority**: 🟡 P2 — reduces accidental orders to wrong addresses.

#### `WRITE-REVIEW` — `/order/:orderId/review`
- **Gap**: No mechanism for users to rate or review a restaurant or driver. Profile shows "Gold Gourmet" loyalty status with no way to earn or track it.
- **Needed UI**: Star rating, optional text review, photo upload, per-item rating.
- **Priority**: 🟡 P2 — social proof, feeds discovery algorithm.

#### `LOYALTY & CREDITS` — `/wallet`
- **Gap**: Profile shows "Gold Gourmet" badge and a "$42.50 Verve Credits" balance with an "Add Funds" button — none of these are actionable.
- **Needed UI**: Credits balance, transaction history, tier progress bar, tier benefits breakdown, "Add Funds" flow.
- **Priority**: 🟡 P2 — retention feature that needs a home.

#### `NOTIFICATIONS` — `/notifications`
- **Gap**: No notification center. Users receive no in-app updates about order status changes, promotions, or account activity.
- **Needed UI**: Chronological list of notifications grouped by date, read/unread states, deep links to relevant pages (order detail, promo).
- **Priority**: 🟡 P2 — needed once real-time orders are live.

---

### 2.4 Lower Priority (Polish & edge cases)

#### `ONBOARDING` — `/onboarding`
- **Gap**: New users land directly on HomeFeed post-registration with no orientation. No cuisine preferences or dietary restrictions are captured.
- **Needed UI**: 2–3 step onboarding: allow location → select cuisine preferences → (optional) add first address.
- **Priority**: 🟢 P3 — personalisation increases retention.


#### `404 / EMPTY STATES`
- **Gap**: No 404 page. No empty state UI for: empty cart, no search results, no order history, failed API calls.
- **Needed UI**: Friendly error pages with a clear action CTA ("Go Home", "Try Again").
- **Priority**: 🟢 P3 — polish, but avoidable crashes hurt trust.

---

## 3. Current User Flows

### 3.1 Authentication Flow

```
[App Load]
    │
    ├── Token in localStorage?
    │       │
    │      YES ──→ GET /auth/me ──→ [HomeFeed]
    │       │
    │       NO ──→ [Login Page]
    │                   │
    │           ┌───────┴────────┐
    │           │                │
    │      Fill form        "Create Account"
    │           │                │
    │      POST /auth/login  [Register Page]
    │           │                │
    │       Success          POST /auth/register
    │           │                │
    │       Store token      Store token
    │           └───────┬────────┘
    │                   │
    │               [HomeFeed]
    │
    └── "Forgot Password?" ──→ ✅ [ForgotPassword] page (form submit still no-op)
```

**Issues**: Password recovery UI exists but has no logic — no OTP flow, no API call. No email verification step after registration. No session expiry handling (what happens when JWT expires?).

---

### 3.2 Discovery & Browsing Flow

```
[HomeFeed]
    │
    ├── Location label tap ──→ ❌ No address picker page
    │
    ├── Search bar tap ──→ [SearchResults] (navigates immediately)
    │       │
    │       ├── Filter chips ──→ ❌ No filtering logic
    │       └── Restaurant card tap ──→ [RestaurantMenu]
    │
    ├── Category chip tap ──→ ❌ No filtering logic
    │
    └── Restaurant card tap ──→ [RestaurantMenu]
                │
                ├── Section tab tap ──→ Smooth scroll (✅ works)
                ├── "Add" button ──→ Adds to local component state (cart count + total)
                │       └── Toast appears ──→ "View Cart" tap ──→ [Cart]
                └── Cart icon (header) ──→ [Cart]
```

**Issues**: Cart state lives inside `RestaurantMenu` component state. Navigating away loses the cart. No global cart state management.

---

### 3.3 Checkout Flow

```
[RestaurantMenu]
    │
    └── Add items ──→ Toast notification ──→ [Cart]
                                                │
                                        Review mock items
                                                │
                                        "Proceed to Checkout"
                                                │
                                        [SecureCheckout]
                                                │
                                        Select payment method
                                                │
                                        "Place Order" ──→ ✅ [OrderTracking] (mock; no orderId)
                                                │
                                        ❌ Missing [OrderConfirmation] step
```

**Issues**:
- Cart data is mock — not persisted from RestaurantMenu
- No delivery address confirmation step
- No promo/voucher code step
- No explicit order confirmation page — tracking page used as a substitute but shows no order number or success message
- No error state if payment fails

---

### 3.4 Order History Flow

```
[BottomNav → Orders]
    │
    └── [OrderHistory]
            │
            ├── Search bar ──→ ❌ No-op
            ├── Filter chips ──→ ❌ No filtering logic
            ├── "View Details" button ──→ ❌ No-op
            ├── "View Reason" (cancelled) ──→ ❌ No-op
            ├── "Reorder" button ──→ ❌ No-op
            └── "Load More Orders" ──→ ❌ No-op
```

**Issues**: Virtually no interactions work. `OrderDetails` page exists but is not linked from `OrderHistory`. `OrderDetails` also has no dynamic param — it always shows the same mock order regardless of which order was tapped.

---

### 3.5 Profile Flow

```
[BottomNav → Profile]
    │
    └── [Profile]
            │
            ├── Edit avatar ──→ ❌ No-op
            ├── "Add Funds" ──→ ❌ No-op
            ├── "View History" ──→ ❌ No-op
            ├── Order "Details" ──→ ✅ Navigates to [OrderDetails] (but always same mock order)
            ├── Order "Reorder" ──→ ❌ No-op
            ├── Account Settings card ──→ ✅ Navigates to [AccountSettings]
            ├── Saved Addresses card ──→ ✅ Navigates to [SavedAddresses]
            ├── Payment Methods card ──→ ❌ No-op (page not built)
            └── "Sign Out" ──→ ❌ No-op (auth.logout() not wired)
```

**Issues**: Sign Out is broken — tapping it does nothing, meaning users cannot log out. This is a critical auth issue.

---

## 4. Broken Interactions Summary

| Location | Element | Expected Behaviour | Current State |
|----------|---------|--------------------|---------------|
| Login | "Forgot Password?" | Navigate to forgot-password flow | ✅ Navigates to `/forgot-password` (form still no-op) |
| HomeFeed | Location label | Open address picker | ❌ No-op |
| HomeFeed | Category chips | Filter restaurants | ❌ No-op (links to `/categories` page, not filtered) |
| SearchResults | Filter chips | Filter search results | ❌ No-op |
| RestaurantMenu | Cart bag icon | Navigate to Cart | ✅ Works |
| Cart | Quantity +/- | Update item count & total | ❌ No-op |
| SecureCheckout | "Place Order" | Submit order, navigate to confirmation | ✅ Navigates to `/order-tracking` (no confirmation page; mock data) |
| OrderHistory | Search bar | Filter orders by text | ❌ No-op |
| OrderHistory | Filter chips | Filter by status | ❌ No-op |
| OrderHistory | "View Details" | Open order details | ❌ No-op |
| OrderHistory | "Reorder" | Re-add items to cart | ❌ No-op |
| OrderHistory | "Load More" | Paginate orders | ❌ No-op |
| OrderDetails | "Reorder Items" | Re-add items to cart | ❌ No-op |
| Profile | Edit avatar | Upload new photo | ❌ No-op |
| Profile | "Add Funds" | Add Verve Credits | ❌ No-op |
| Profile | "View History" | Navigate to OrderHistory | ❌ No-op |
| Profile | Account Settings | Navigate to `/account-settings` | ✅ Works |
| Profile | Saved Addresses | Navigate to `/saved-addresses` | ✅ Works |
| Profile | Payment Methods | Navigate to payment manager | ❌ No-op (page not built) |
| Profile | "Sign Out" | Log out user | ❌ No-op (no onClick handler) |
| SavedAddresses | Edit button | Edit saved address | ❌ No-op |
| SavedAddresses | Delete button | Delete saved address | ❌ No-op |
| SavedAddresses | "Add Address" | Add new address | ❌ Not present |
| AccountSettings | Save / submit | Persist profile changes to API | ❌ Needs wiring |
| AccountSettings | Change password | Update password | ❌ Section not present |
| ForgotPassword | "Send Reset Link" | Trigger OTP / password reset | ❌ No-op |

---

## 5. Global UX Issues

### 5.1 Cart State Not Persisted
Cart items are stored in `RestaurantMenu` component state. This means:
- Navigating to any other page clears the cart
- Cart page shows hardcoded mock items, not real selections
- A global cart context (or server-side cart) is required before real orders can be placed

### 5.2 No Loading / Skeleton States
Pages render mock data synchronously. When API calls are wired, there are no skeleton loaders, which will cause content flash.

### 5.3 No Error Boundary or Fallback States
No 404 page, no API error states, no empty state designs (empty cart, no orders, no search results).

### 5.4 OrderDetails Has No Dynamic Route
`/order-details` always renders the same hardcoded mock order. It needs to be `/order-details/:orderId` and receive a real ID from OrderHistory/Profile.

### 5.5 Sign Out Is Broken
`Profile.jsx` Sign Out button has no `onClick` handler wired to `auth.logout()`. Users are permanently logged in with no way to switch accounts.

### 5.6 Deep Linking After Auth
After login, users should be redirected to the page they originally tried to visit. This is partially in place (redirect param in router) but should be verified end-to-end.

---

## 6. Recommended Build Priority

```
Sprint 1 — Unblock the Core Loop
  ✦ Wire global cart state (context or Zustand)              ← ❌ Not done
  ✦ Fix Sign Out in Profile                                   ← ❌ Not done
  ✦ Build /order-confirmation page                            ← ❌ Not done
  ✦ Make OrderDetails accept dynamic :orderId param           ← ❌ Not done

Sprint 2 — Close Broken Links
  ✦ Build /forgot-password flow (request → OTP → reset)      ← ⚠️ Page built; logic missing
  ✦ Build /order/:id/track (static steps first, live later)  ← ⚠️ Page built; no orderId param, mock data only
  ✦ Wire OrderHistory "View Details" to /order-details/:id   ← ❌ Not done
  ✦ Wire Profile "View History" link                          ← ❌ Not done

Sprint 3 — Account Management
  ✦ Build /settings (account info, change password)           ← ⚠️ Page built; read works, write/change-password missing
  ✦ Build /addresses (add, edit, delete)                      ← ⚠️ Page built; all write ops are no-ops
  ✦ Build /payment-methods (add, remove)                      ← ❌ Not done

Sprint 4 — Engagement & Polish
  ✦ Item detail modal (modifiers, allergens)                  ← ❌ Not done
  ✦ /wallet (credits + loyalty tier)                          ← ❌ Not done
  ✦ /notifications                                            ← ❌ Not done
  ✦ /order/:id/review                                         ← ❌ Not done
  ✦ Empty states, loading skeletons, 404 page                 ← ❌ Not done

Sprint 5 — Discovery Enhancement
  ✦ Wire category filter on HomeFeed                          ← ❌ Not done (Categories page exists but no filter)
  ✦ Wire SearchResults filters                                ← ❌ Not done
  ✦ /onboarding flow for new users                            ← ❌ Not done
  ✦ /restaurant/:id/info page                                 ← ❌ Not done
```
