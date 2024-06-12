import React from "react";

import { Index } from "@/pages/Index";

export const routes = [
  {
    lazy: async () => {
      return {Component: (await import('./Home')).default}
    },
    path: "/",
  },
  {
    lazy: async () => {
      return {Component: await import('./School')}
    },
    path: "/school",
  },
  {
    lazy: () => import('./Education'),
    path: "/education",
  },
  {
    lazy: () => import('./Partnership'),
    path: "/partnership",
  },
  {
    lazy: () => import('./About'),
    path: "/about",
  },
  {
    lazy: () => import('./Ecosystem'),
    path: "/ecosystem",
  },
];
