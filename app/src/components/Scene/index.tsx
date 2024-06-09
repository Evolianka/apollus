import React, {useEffect, useRef, useState, Suspense} from "react";

import {Plane} from "@/components/Plane";
import {PerspectiveCamera} from "@react-three/drei";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import {WolfHead} from "@/components/WolfHead";

const Scene = () => {

    return <Canvas style={{height: "100vh", width: "100vw"}}>
        <color attach="background" args={['black']}/>

        <WolfHead/>
        <ambientLight args={[0xFFFFFF]} intensity={2.0}/>
        <PerspectiveCamera position={[0, 0, 0]} makeDefault/>
        <Plane/>

    </Canvas>
};

export default Scene;
