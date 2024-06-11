import React from "react";
import {routes} from "@pages/routes";
import {createStaticHandler, createStaticRouter, StaticRouterProvider} from "react-router-dom/server";
import {StaticHandlerContext} from "@remix-run/router";

const renderApp = async (fetchRequest: Request) => {
    // @ts-ignore
    const handler = createStaticHandler(routes);
    const context = await handler.query(fetchRequest) as StaticHandlerContext;
    const router = createStaticRouter(handler.dataRoutes, context);

    return {
        provider: () => <StaticRouterProvider router={router} context={context}/>
    }
}

export default renderApp;