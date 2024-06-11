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

    const globalRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="*" element={
            <Scene>
                <RouterProvider router={cubeRouter}/>
            </Scene>
        }/>
    ));

    return <RouterProvider router={globalRouter}/>
}