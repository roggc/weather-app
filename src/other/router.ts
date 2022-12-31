import { createRouteConfig, createReactRouter } from "@tanstack/react-router";
import Layout from "components/Layout";
import Home from "components/Home";
import Dashboard from "components/Dashboard";

const rootRoute = createRouteConfig({
  component: Layout,
});
const homeRoute = rootRoute.createRoute({ path: "/", component: Home });
const dashboardRoute = rootRoute.createRoute({
  path: "/dashboard",
  component: Dashboard,
});
const routeConfig = rootRoute.addChildren([homeRoute, dashboardRoute]);
export const router = createReactRouter({ routeConfig });
