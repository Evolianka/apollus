import React from "react";
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import {Cube} from "@pages/Cube";
import {Scene} from "@shared/ui/Scene";

export const Router = () => {
    const cubeRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="*" element={
            <Cube/>
        }/>
    ));

    return <Scene>
        <RouterProvider router={cubeRouter}/>
    </Scene>
}