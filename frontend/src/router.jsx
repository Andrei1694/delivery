import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './App';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicOnlyRoute from './auth/PublicOnlyRoute';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
import Register from './pages/Register';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import SecureCheckout from './pages/SecureCheckout';
import SavedAddresses from './pages/SavedAddresses';
import HomeFeed from './pages/home/HomeFeed';
import SearchResults from './pages/SearchResults';
import Categories from './pages/Categories';
import OrderTracking from './pages/OrderTracking';

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
  path: '/order-tracking',
  component: () => (
    <ProtectedRoute>
      <OrderTracking />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  forgotPasswordRoute,
  profileRoute,
  accountSettingsRoute,
  savedAddressesRoute,
  restaurantMenuRoute,
  cartRoute,
  searchRoute,
  orderHistoryRoute,
  orderDetailsRoute,
  checkoutRoute,
  categoriesRoute,
  orderTrackingRoute,
]);

export const router = createRouter({
  routeTree,
});
