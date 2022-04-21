import { ThemeProvider } from "styled-components";
import Header from "./shared/components/navigation/Header";
import GlobalStyle from "./shared/styles/GlobalStyle";
import theme from "./shared/styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Header />

      <h1>Hello World test 4</h1>
    </ThemeProvider>
  );
}

export default App;
