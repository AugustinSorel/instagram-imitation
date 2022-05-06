import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: false
    ? {
        background: "#111111",
        accent: "#090909",
        callToAcction: "#0095F6",
        color: "#808080",
        border: "#333333",
        error: "#e74c3c",
      }
    : {
        background: "#fafafa",
        accent: "#fff",
        callToAcction: "#0095F6",
        color: "#262626",
        border: "#d3d3d3",
        error: "#e74c3c",
      },

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

export default theme;
