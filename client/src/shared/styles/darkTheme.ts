import { DefaultTheme } from "styled-components";
import themeConstants from "./themeConstants";

const darkTheme: DefaultTheme = {
  colors: {
    background: "#111111",
    accent: "#090909",
    callToAcction: "#0095F6",
    color: "#b1b1b1",
    border: "#333333",
    error: "#e74c3c",
  },

  ...themeConstants,
};

export default darkTheme;
