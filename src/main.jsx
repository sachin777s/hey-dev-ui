import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { router } from "./routes.jsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </ClerkProvider>
  </Provider>
);
