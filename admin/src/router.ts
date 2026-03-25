import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RestaurantList from './pages/restaurants/RestaurantList';
import RestaurantForm from './pages/restaurants/RestaurantForm';

export const queryClient = new QueryClient();

function requireAuth() {
  if (!localStorage.getItem('admin_token')) {
    throw redirect({ to: '/login' });
  }
}

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: requireAuth,
  component: Dashboard,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const restaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants',
  beforeLoad: requireAuth,
  component: RestaurantList,
});

const restaurantNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants/new',
  beforeLoad: requireAuth,
  component: RestaurantForm,
});

const restaurantEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants/$restaurantId/edit',
  beforeLoad: requireAuth,
  component: RestaurantForm,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  restaurantsRoute,
  restaurantNewRoute,
  restaurantEditRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
