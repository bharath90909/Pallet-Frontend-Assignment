import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Spinner from "./components/Spinner";
import ErrorBoundary from "./components/ErrorBoundary";
import RootLayout from "./layout/RootLayout";
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Spinner />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "product/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <ProductDetail />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}


export default App;
