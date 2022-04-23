import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root{
        --background:${(props) => props.theme.colors.background};
        --color: ${(props) => props.theme.colors.color};
        --accent-color: ${(props) => props.theme.colors.accent};
        --call-to-action-color: ${(props) => props.theme.colors.callToAcction};
        
        --font-size-small: ${(props) => props.theme.fontSizes.small};
        --font-size-medium: ${(props) => props.theme.fontSizes.medium};
        --font-size-large: ${(props) => props.theme.fontSizes.large};
        --font-size-extra-large: ${(props) => props.theme.fontSizes.extraLarge};
        
        --font-weight-light: ${(props) => props.theme.fontWeights.light};
        --font-weight-regular: ${(props) => props.theme.fontWeights.regular};
        --font-weight-bold: ${(props) => props.theme.fontWeights.bold};

        --border-radius: ${(props) => props.theme.sizes.borderRadius};
        --border-height: ${(props) => props.theme.sizes.borderHeight};
    }

    body {
        background: var(--background);
        font-family: 'Poppins', sans-serif;
        font-size: var(--font-size-medium);
        font-weight: var(--font-weight-regular);
    }

    #root{
        display: flex;
        flex-direction: column;
        height: 100vh;

        @media screen and (max-width: 768px) {
            flex-direction: column-reverse;
        }
    }
`;

export default GlobalStyle;
