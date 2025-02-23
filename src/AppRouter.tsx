import HomePage from "@/pages/home/page";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/product"
          element={<HomePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
