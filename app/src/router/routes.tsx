import React from "react";

import { Index } from "@/pages/Index";

const routes = [
  {
    Component() {
      return <Index />;
    },
    path: "/",
  },
];

export default routes;
