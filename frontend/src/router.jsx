import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './App';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicOnlyRoute from './auth/PublicOnlyRoute';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import RestaurantMenu from './pages/RestaurantMenu';
import Basket from './pages/Basket';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import SecureCheckout from './pages/SecureCheckout';
import HomeFeed from './pages/home/HomeFeed';

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

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
});

const restaurantMenuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurant-menu',
  component: () => (
    <ProtectedRoute>
      <RestaurantMenu />
    </ProtectedRoute>
  ),
});

const basketRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/basket',
  component: () => (
    <ProtectedRoute>
      <Basket />
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  profileRoute,
  restaurantMenuRoute,
  basketRoute,
  orderHistoryRoute,
  orderDetailsRoute,
  checkoutRoute,
]);

export const router = createRouter({
  routeTree,
});
