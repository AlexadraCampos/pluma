import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/Home.css";
import App from "./templates/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
