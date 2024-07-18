import "./App.css";

import MainLayout from "./components/MainLayout";

import LandingPage from "./pages/LandingPage";
import AddDepartmentPage from "./pages/AddDepartmentPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import AddPositionPage from "./pages/AddPositionPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/add-department",
        element: <AddDepartmentPage />,
      },
      {
        path: "/add-employee",
        element: <AddEmployeePage />,
      },
      {
        path: "/add-position",
        element: <AddPositionPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
