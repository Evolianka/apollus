import React, { useEffect, useRef } from "react";
import { DoubleSide, Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three-stdlib";

import { ThreeElements, useLoader } from "@react-three/fiber";

export const WolfHead = () => {
  const headReference = useRef<ThreeElements["primitive"]>(null!);

  const headState = {
    angleX: 0,
    angleY: 0,
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const windowXCenter = window.innerWidth / 2;
      const windowYCenter = window.innerHeight / 2;

      const dX = e.clientX - windowXCenter;
      const dY = e.clientY - windowYCenter;

      const angleY = Math.atan(dX / windowYCenter);
      const angleX = Math.atan(dY / windowXCenter);

      headState.angleX = angleX;
      headState.angleY = angleY;

      headReference.current.rotation.x = angleX;
      headReference.current.rotation.y = angleY;
    });
  }, []);

  const headMaterial = new MeshStandardMaterial({
    color: 0x8654aff,
    depthTest: true,
    fog: false,
    side: DoubleSide,
    wireframe: true,
  });
  const eyesMaterial = new MeshStandardMaterial({
    color: 0xff0000,
    depthTest: true,
    flatShading: true,
    side: DoubleSide,
  });

  const head = useLoader(OBJLoader, "/res/models/wolf-head.obj");
  head.traverse((child) => {
    const _c = child as Mesh;

    switch (_c.name) {
      case "eyes": {
        _c.material = eyesMaterial;
        break;
      }
      case "Object002": {
        _c.material = headMaterial;
        break;
      }
    }
  });

  return (
    <primitive
      ref={headReference}
      renderOrder={1}
      position={[0, 0.17, -0.5]}
      scale={[0.0008, 0.001, 0.0009]}
      object={head}
    />
  );
};
