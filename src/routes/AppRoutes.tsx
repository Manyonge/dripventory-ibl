import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import SalesPage from "../pages/SalesPage";
import DeliveriesPage from "../pages/DeliveriesPage";
import CustomersPage from "../pages/CustomersPage";
import SignUpPage from "../pages/SignUpPage";

export const router = createBrowserRouter([
  { index: true, element: <LoginPage /> },
  { path: "signup", element: <SignUpPage /> },

  {
    path: "admin",
    element: <Root />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "sales", element: <SalesPage /> },
      { path: "deliveries", element: <DeliveriesPage /> },
      { path: "customers", element: <CustomersPage /> },
    ],
  },
]);
