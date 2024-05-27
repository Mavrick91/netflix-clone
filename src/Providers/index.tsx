"use client";

import React, { Suspense } from "react";

import { AuthProvider } from "./AuthProvider";
import QueryClientProvider from "./QueryClientProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider>
      <Suspense>
        <AuthProvider>{children}</AuthProvider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default Providers;
