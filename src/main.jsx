import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
