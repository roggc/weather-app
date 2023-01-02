import { createRouteConfig, createReactRouter } from "@tanstack/react-router";
import Layout from "components/Layout";
import Home from "components/Home";
import Dashboard from "components/Dashboard";
import HistoryDashboard from "components/History";

export const getRouter = (isUserLogedIn: boolean) => {
  const rootRoute = createRouteConfig({
    component: Layout,
  });
  const homeRoute = rootRoute.createRoute({ path: "/", component: Home });
  const dashboardMainRoute = rootRoute.createRoute({
    path: "/dashboard",
    component: Dashboard,
  });
  const historyRoute = rootRoute.createRoute({
    path: "/history",
    component: HistoryDashboard,
  });

  const publicRoutes = [homeRoute];
  const privateRoutes = [dashboardMainRoute, historyRoute];
  const routeConfig = rootRoute.addChildren([
    ...publicRoutes,
    ...(isUserLogedIn ? privateRoutes : []),
  ]);

  return createReactRouter({ routeConfig });
};
