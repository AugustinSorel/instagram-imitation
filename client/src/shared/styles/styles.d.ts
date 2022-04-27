import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      accent: string;
      color: string;
      callToAcction: string;
      border: string;
      error: string;
    };

    fontSizes: {
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };

    fontWeights: {
      light: number;
      regular: number;
      bold: number;
    };

    sizes: {
      borderRadius: string;
      borderHeight: string;
    };
  }
}

export default DefaultTheme;
