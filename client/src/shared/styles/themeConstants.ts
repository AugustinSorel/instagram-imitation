import { DefaultTheme } from "styled-components";

type DefaultThemeWithoutColors = Omit<DefaultTheme, "colors">;

const themeConstants: DefaultThemeWithoutColors = {
  fontSizes: {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
    extraLarge: "2.5rem",
  },

  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },

  sizes: {
    borderRadius: "24px",
    borderHeight: "3px",
    maxWidth: "1000px",
  },
};
export default themeConstants;
