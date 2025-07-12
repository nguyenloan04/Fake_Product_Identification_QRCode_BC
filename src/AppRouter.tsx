import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login/page";
import RegisterPage from "@/pages/auth/register/page";
import HomePage from "@/pages/home/page";
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router";
import ProductDetail from "@/pages/product-detail/page";
import AdminLayout from "@/pages/admin/layout";
import AdminPage from "@/pages/admin/dashboard/page";
import AddProductPage from "@/pages/admin/products/page";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/auth"
          element={<AuthLayout />}
        >
          <Route
            path="login"
            element={<LoginPage />}
          />
          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminPage />} />
          <Route path="add-product" element={<AddProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
