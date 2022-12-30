import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import { router, theme } from "../../other";

const App = () => (
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
export default App;
