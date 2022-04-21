import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./shared/components/navigation/Header";
import GlobalStyle from "./shared/styles/GlobalStyle";
import theme from "./shared/styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Header />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/new-post" element={<h1>new-post</h1>} />
        <Route path="/explore" element={<h1>explore</h1>} />
        <Route path="/posts-liked" element={<h1>Home Page</h1>} />
        <Route path="/profile" element={<h1>profile</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
