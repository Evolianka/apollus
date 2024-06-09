import * as React from "react";
import {hydrateRoot, createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {loadableReady} from '@loadable/component'
import routes from "@/router/routes";

const router = createBrowserRouter(routes);

loadableReady(() => {
    let elem = document.querySelector("#root");

    // на случай если сервер не сможет самостоятельно отрендерить всё, что нужно
    if (!elem || !window.SERVER_STATUS.success) {
        const script = document.createElement('script');
        const styles = document.createElement('link');

        if (!elem) {
            elem = document.createElement('div');
            elem.id = 'root';
        }

        styles.rel = 'stylesheet';
        styles.href = '/css/style.css';
        script.src = '/main.js';

        document.body.append(elem);
        document.body.append(script);
        document.head.append(styles);

        createRoot(elem).render(<RouterProvider router={router}/>);

        return
    }

    hydrateRoot(elem,
        <RouterProvider router={router}/>
    );
})

