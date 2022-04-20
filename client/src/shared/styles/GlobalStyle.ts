import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root{
        --primary:${(props) => props.theme.colors.primary};
    }

    body {
        background: var(--primary);
        font-family: 'Poppins', sans-serif;
    }
`;

export default GlobalStyle;
