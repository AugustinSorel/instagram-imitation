import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewPostsPage from "./pages/NewPostsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostsLiked from "./pages/PostsLiked";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUpPage";
import Header from "./shared/components/navigation/Header";
import GlobalStyle from "./shared/styles/GlobalStyle";
import theme from "./shared/styles/theme";

function RequireAuth() {
  if (false) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Routes>
        <Route element={<Header />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-post" element={<NewPostsPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/posts-liked" element={<PostsLiked />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
