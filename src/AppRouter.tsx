import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login/page";
import RegisterPage from "@/pages/auth/register/page";
import HomePage from "@/pages/home/page";
import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router";
import ProductDetail from "@/pages/product-detail/page.tsx";
import LayoutAdmin from "@/pages/manager/layout.tsx";
import ManagerUserPage from "@/pages/manager/user/page.tsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route
                    path="/product/:id"
                    element={<ProductDetail/>}
                />
                <Route
                    path="admin"
                    element={<LayoutAdmin/>}
                >
                    <Route path="user"
                           element={<ManagerUserPage/>}/>
                    <Route path="product"/>
                </Route>
                <Route
                    path="/auth"
                    element={<AuthLayout/>}
                >
                    <Route
                        path="login"
                        element={<LoginPage/>}
                    />
                    <Route
                        path="register"
                        element={<RegisterPage/>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
