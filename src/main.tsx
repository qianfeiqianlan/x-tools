import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { getTheme } from "@/lib/storage";
import "@/styles/globals.css";

document.documentElement.classList.toggle("dark", getTheme() === "dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
