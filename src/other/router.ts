import { createRouteConfig, createReactRouter } from "@tanstack/react-router";
import Layout from "components/Layout";
import Home from "components/Home";
import Dashboard from "components/Dashboard";

export const getRouter = (isUserLogedIn: boolean) => {
  const rootRoute = createRouteConfig({
    component: Layout,
  });
  const homeRoute = rootRoute.createRoute({ path: "/", component: Home });
  const dashboardRoute = rootRoute.createRoute({
    path: "/dashboard",
    component: Dashboard,
  });
  const publicRoutes = [homeRoute];
  const privateRoutes = [dashboardRoute];
  const routeConfig = rootRoute.addChildren([
    ...publicRoutes,
    ...(isUserLogedIn ? privateRoutes : []),
  ]);

  return createReactRouter({ routeConfig });
};
