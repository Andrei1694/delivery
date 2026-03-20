import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './App';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicOnlyRoute from './auth/PublicOnlyRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeFeed from './pages/home/HomeFeed';
import VervetKitchenLogin from './pages/Login';
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
<VervetKitchenLogin />
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
]);

export const router = createRouter({
  routeTree,
});
