import React from "react";
import {AppClient} from "@/app";
import { createRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";

loadableReady(() => {
  let element = document.querySelector("#root--client");

  if (element) {
    createRoot(element).render(<AppClient/>);
    return
  }

  document.body.innerHTML = `<h1>Internal server error 500</h1>`

});
