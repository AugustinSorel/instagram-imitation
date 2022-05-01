import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewPostsPage from "./pages/NewPostsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostsLiked from "./pages/PostsLiked";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUpPage";
import { getUser } from "./shared/api/userApi";
import Header from "./shared/components/navigation/Header";
import PrivateRoute from "./shared/components/navigation/PrivateRoute";
import useUser from "./shared/store/useUser";
import GlobalStyle from "./shared/styles/GlobalStyle";
import theme from "./shared/styles/theme";

function App() {
  const location = useLocation();

  const { setIsAuthenticated } = useUser();

  const { isLoading } = useQuery("user", getUser, {
    retry: false,
    onSuccess: () => setIsAuthenticated(true),
    onError: () => setIsAuthenticated(false),
  });

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
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
