import React, {ReactNode} from "react";
import {RouterProvider} from "react-router-dom";
import {Html, PerspectiveCamera} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {DoubleSide} from "three";
import {Plane} from "../Plane";
import {WolfHead} from "../WolfHead";
import {useGLTF} from '@react-three/drei';
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Plane as T, useFBO, OrthographicCamera, Text} from '@react-three/drei'
import {Cube} from "@pages/cube";

interface IProps {
    children: ReactNode
}

export const Scene = ({children}: IProps) => {
    const {nodes, materials} = useGLTF('/res/models/mac-draco.glb')

    return <div style={{width: '100vw', height: '100vh' }}>
        <Canvas>
            <color attach="background" args={["black"]}/>
            <WolfHead/>
            <ambientLight args={[0xffffff]} intensity={2}/>

            <group position={[0, 0, -1]} position-x={0}>


                    <Html position={[0, 0, 0]} center transform prepend occlude="blending">
                        {children}
                    </Html>

            </group>
            <PerspectiveCamera position={[0, 0, 0]} makeDefault/>
            <Plane/>
        </Canvas>
    </div>
};

