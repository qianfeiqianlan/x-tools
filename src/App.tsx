/**
 * App entry component
 * - Providers wrap Router; actual routes live in app/router.tsx
 */
import { Providers } from "@/app/providers";

export function App() {
  return <Providers />;
}
