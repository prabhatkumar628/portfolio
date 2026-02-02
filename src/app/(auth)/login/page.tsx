import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function page() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
