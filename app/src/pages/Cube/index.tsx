import React from "react";

import {lazy} from "react";
import {Route, Routes} from "react-router-dom";
import * as s from './style.module.scss'

const Home = lazy(() => import('../Home'))
const About = lazy(() => import('../About'))
const School = lazy(() => import('../School'))
const Ecosystem = lazy(() => import('../Ecosystem'))
const Education = lazy(() => import('../Education'))
const Partnership = lazy(() => import('../Partnership'))

export const Cube = () => {
    return <div className={s.cube}>
        <div className={`${s.cube__side} ${s.cube__side_1}`}>
            <Routes>
                <Route path="/" element={<Home/>}>

                </Route>
            </Routes>
        </div>
        <div className={`${s.cube__side} ${s.cube__side_2}`}>
            <Routes>
                <Route path="/about" element={<About/>}>

                </Route>
            </Routes>
        </div>
        <div className={`${s.cube__side} ${s.cube__side_3}`}>
            <Routes>
                <Route path="/school" element={<School/>}>

                </Route>
            </Routes>
        </div>
        <div className={`${s.cube__side} ${s.cube__side_4}`}>
            <Routes>
                <Route path="/ecosystem" element={<Ecosystem/>}>

                </Route>
            </Routes>
        </div>
        <div className={`${s.cube__side} ${s.cube__side_5}`}>
            <Routes>
                <Route path="/education" element={<Education/>}>

                </Route>
            </Routes>
        </div>
        <div className={`${s.cube__side} ${s.cube__side_6}`}>
            <Routes>
                <Route path="/partnership" element={<Partnership/>}>

                </Route>
            </Routes>
        </div>
    </div>
}