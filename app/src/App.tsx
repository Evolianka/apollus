import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "@/router/routes";
import { loadableReady } from "@loadable/component";

const router = createBrowserRouter(routes);

loadableReady(() => {
  let element = document.querySelector("#root");

  // на случай если сервер не сможет самостоятельно отрендерить всё, что нужно
  if (!element || !window.SERVER_STATUS.success) {
    const script = document.createElement("script");
    const styles = document.createElement("link");

    if (!element) {
      element = document.createElement("div");
      element.id = "root";
    }

    styles.rel = "stylesheet";
    styles.href = "/css/style.css";
    script.src = "/main.js";

    document.body.append(element);
    document.body.append(script);
    document.head.append(styles);

    createRoot(element).render(<RouterProvider router={router} />);

    return;
  }

  hydrateRoot(element, <RouterProvider router={router} />);
});
