import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewPostsPage from "./pages/NewPostsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostsLiked from "./pages/PostsLiked";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUpPage";
import Header from "./shared/components/navigation/Header";
import PrivateRoute from "./shared/components/navigation/PrivateRoute";
import useCurrentTheme from "./shared/store/useCurrentTheme";
import GlobalStyle from "./shared/styles/GlobalStyle";

function App() {
  const location = useLocation();
  const { getCurrentTheme } = useCurrentTheme();

  const currentTheme: DefaultTheme = getCurrentTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />

      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Header />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/new-post" element={<NewPostsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/posts-liked" element={<PostsLiked />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
