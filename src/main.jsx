import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Pages from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages.Auth />,
    children: [
      {
        index: true,
        element: <Pages.Home />,
      },
      {
        path: "games",
        children: [
          { index: true, element: <Pages.Games.Index /> },
          { path: ":name", element: <Pages.Games.ByName /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipContextProvider>
        <RouterProvider router={router} />
      </TooltipContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
