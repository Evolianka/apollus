import * as React from "react";

import { useHydrated } from "@/hooks/useHydrated";

interface PropertiesInterface {
  children(): React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: PropertiesInterface) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}
