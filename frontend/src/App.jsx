import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import UserPage from "./pages/user/UserPage";
import UserSearchPage from "./pages/user/UserSearchPage";
import RecipeProvider from "./context/RecipeContext";
import NewRecipeForm from "./pages/recipe/NewRecipeForm";
import RecipePage from "./pages/recipe/RecipePage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RecipeProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route
                  path="/users/search/:query"
                  element={<UserSearchPage />}
                />
                <Route path="/recipes/create" element={<NewRecipeForm />} />
                <Route path="/recipes/:id" element={<RecipePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RecipeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
