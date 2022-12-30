import {
  createRouteConfig,
  createReactRouter,
  RouterProvider,
} from "@tanstack/react-router";
import Layout from "../Layout";
import Home from "../Home";
import Dashboard from "../Dashboard";

const rootRoute = createRouteConfig({
  component: Layout,
});
const homeRoute = rootRoute.createRoute({ path: "/", component: Home });
const dashboardRoute = rootRoute.createRoute({
  path: "/dashboard",
  component: Dashboard,
});
const routeConfig = rootRoute.addChildren([homeRoute, dashboardRoute]);
const router = createReactRouter({ routeConfig });

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}

const App = () => <RouterProvider router={router} />;
export default App;
