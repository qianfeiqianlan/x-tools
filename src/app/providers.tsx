/**
 * App providers
 * - Wrap app with Router and any global providers
 */
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

export function Providers() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
