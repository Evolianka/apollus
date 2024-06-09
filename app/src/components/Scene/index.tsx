import React from "react";

import { Plane } from "@/components/Plane";
import { WolfHead } from "@/components/WolfHead";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Scene = () => (
  <Canvas style={{ height: "100vh", width: "100vw" }}>
    <color attach="background" args={["black"]} />

    <WolfHead />
    <ambientLight args={[0xffffff]} intensity={2} />
    <PerspectiveCamera position={[0, 0, 0]} makeDefault />
    <Plane />
  </Canvas>
);

export default Scene;
