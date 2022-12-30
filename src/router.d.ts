import { router } from "./other";

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}
