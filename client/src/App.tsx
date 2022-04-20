import { ThemeProvider } from "styled-components";
import GlobalStyle from "./shared/styles/GlobalStyle";
import theme from "./shared/styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <h1>Hello World</h1>
    </ThemeProvider>
  );
}

export default App;
