import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './App';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicOnlyRoute from './auth/PublicOnlyRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomeFeed from './pages/discovery/HomeFeed';
import SearchResults from './pages/discovery/SearchResults';
import Categories from './pages/discovery/Categories';
import RestaurantMenu from './pages/restaurant/RestaurantMenu';
import Cart from './pages/cart/Cart';
import SecureCheckout from './pages/cart/SecureCheckout';
import OrderConfirmation from './pages/cart/OrderConfirmation';
import OrderHistory from './pages/orders/OrderHistory';
import OrderDetails from './pages/orders/OrderDetails';
import OrderTracking from './pages/orders/OrderTracking';
import Profile from './pages/profile/Profile';
import AccountSettings from './pages/profile/AccountSettings';
import SavedAddresses from './pages/profile/SavedAddresses';
import DeliveryAddress from './components/DeliveryAddress';
import OnboardingLocation from './pages/onboarding/OnboardingLocation';
import OnboardingCuisine from './pages/onboarding/OnboardingCuisine';
import OnboardingAddress from './pages/onboarding/OnboardingAddress';

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <HomeFeed />
    </ProtectedRoute>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: (search: Record<string, unknown>): { redirect?: string } =>
    typeof search.redirect === 'string' ? { redirect: search.redirect } : {},
  component: () => (
    <PublicOnlyRoute>
      <Login />
    </PublicOnlyRoute>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => (
    <PublicOnlyRoute>
      <Register />
    </PublicOnlyRoute>
  ),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: () => (
    <PublicOnlyRoute>
      <ForgotPassword />
    </PublicOnlyRoute>
  ),
});

const onboardingLocationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding/location',
  component: () => (
    <ProtectedRoute>
      <OnboardingLocation />
    </ProtectedRoute>
  ),
});

const onboardingCuisineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding/cuisine',
  component: () => (
    <ProtectedRoute>
      <OnboardingCuisine />
    </ProtectedRoute>
  ),
});

const onboardingAddressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding/address',
  component: () => (
    <ProtectedRoute>
      <OnboardingAddress />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
});

const accountSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account-settings',
  component: () => (
    <ProtectedRoute>
      <AccountSettings />
    </ProtectedRoute>
  ),
});

const savedAddressesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/saved-addresses',
  component: () => (
    <ProtectedRoute>
      <SavedAddresses />
    </ProtectedRoute>
  ),
});

const deliveryAddressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/delivery-address',
  component: () => (
    <ProtectedRoute>
      <DeliveryAddress />
    </ProtectedRoute>
  ),
});

const restaurantMenuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurant-menu/$restaurantId',
  component: () => (
    <ProtectedRoute>
      <RestaurantMenu />
    </ProtectedRoute>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: () => (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: () => (
    <ProtectedRoute>
      <SearchResults />
    </ProtectedRoute>
  ),
});

const orderHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-history',
  component: () => (
    <ProtectedRoute>
      <OrderHistory />
    </ProtectedRoute>
  ),
});

const orderDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-details',
  component: () => (
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: () => (
    <ProtectedRoute>
      <SecureCheckout />
    </ProtectedRoute>
  ),
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: () => (
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  ),
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order/$orderId/track',
  component: () => (
    <ProtectedRoute>
      <OrderTracking />
    </ProtectedRoute>
  ),
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-confirmation',
  component: () => (
    <ProtectedRoute>
      <OrderConfirmation />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  forgotPasswordRoute,
  onboardingLocationRoute,
  onboardingCuisineRoute,
  onboardingAddressRoute,
  profileRoute,
  accountSettingsRoute,
  savedAddressesRoute,
  deliveryAddressRoute,
  restaurantMenuRoute,
  cartRoute,
  searchRoute,
  orderHistoryRoute,
  orderDetailsRoute,
  checkoutRoute,
  categoriesRoute,
  orderTrackingRoute,
  orderConfirmationRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
