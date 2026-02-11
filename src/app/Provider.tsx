"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "../components/ui/sonner";
import { AdminLayoutProvider } from "../context/adminLayoutContext/AdminLayoutProvider";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
      }),
  );
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AdminLayoutProvider>{children}</AdminLayoutProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
