import { DefaultTheme } from "styled-components";
import themeConstants from "./themeConstants";

const lightTheme: DefaultTheme = {
  colors: {
    background: "#fafafa",
    accent: "#fff",
    callToAcction: "#0095F6",
    color: "#262626",
    border: "#d3d3d3",
    error: "#e74c3c",
  },

  ...themeConstants,
};

export default lightTheme;
