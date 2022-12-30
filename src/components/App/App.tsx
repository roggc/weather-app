import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import { router } from "../../other";
import { useValues, theme } from "../../slices";

const App = () => {
  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);
  return (
    <ThemeProvider theme={themeValue}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
