import { DefaultTheme } from "styled-components";

const commonPropsTheme = {
  borderRadius: "5px",
};

const specificPropsDarkTheme = {
  colors: {
    main: "white",
    secondary: "black",
  },
};

const specificPropsLightTheme = {
  colors: {
    main: "black",
    secondary: "white",
  },
};

export const darkTheme: DefaultTheme = {
  ...commonPropsTheme,
  ...specificPropsDarkTheme,
};

export const lightTheme: DefaultTheme = {
  ...commonPropsTheme,
  ...specificPropsLightTheme,
};
