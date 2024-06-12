import * as React from "react";
import { useSyncExternalStore } from "react";

function subscribe() {
    return () => {};
}

export function useHydrated() {
    return useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );
}

interface PropertiesInterface {
    children(): React.ReactNode;
    fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: PropertiesInterface) {
    return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}

