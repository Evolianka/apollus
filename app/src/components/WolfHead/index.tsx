import {useEffect, useRef} from 'react';
import {OBJLoader} from "three-stdlib";
import {MeshStandardMaterial, DoubleSide} from "three";
import {useLoader} from "@react-three/fiber";
export interface HeadState {
    angleX: number;
    angleY: number;
}

// @ts-ignore
export const WolfHead = () => {
    const headRef = useRef(null);

    const headState = {
        angleX: 0,
        angleY: 0,
    };

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            const windowXCenter = window.innerWidth / 2;
            const windowYCenter = window.innerHeight / 2;

            const dX = e.clientX - windowXCenter;
            const dY = e.clientY - windowYCenter;

            const angleY = Math.atan(dX / windowYCenter);
            const angleX = Math.atan(dY / windowXCenter);

            headState.angleX = angleX;
            headState.angleY = angleY;

            headRef.current.rotation.x = angleX;
            headRef.current.rotation.y = angleY;
        })
    }, []);



    const headMaterial = new MeshStandardMaterial({
        side: DoubleSide,
        depthTest: true,
        color: 0x8654AFF,
        wireframe: true,
        fog: false,
    });
    const eyesMaterial = new MeshStandardMaterial({
        side: DoubleSide,
        depthTest: true,
        color: 0xff0000,
        flatShading: true,
    });

    const head = useLoader(OBJLoader,'/res/models/wolf-head.obj');

    head.traverse((child) => {
        switch (child.name){
            case 'eyes':
                // @ts-ignore
                child.material = eyesMaterial;
                break;
            case 'Object002':
                // @ts-ignore
                child.material = headMaterial;
                break;
        }
    })
    return <primitive ref={headRef} renderOrder={1} position={[0, 0.17, -0.5]} scale={[0.0008, 0.001, 0.0009]} object={head}/>
}