import React, { useRef, useState } from 'react'
import './App.scss';
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three';

import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";

import { useSpring, a} from "react-spring/three"

import Terror from './Franchise_Regular.json'

softShadows();

const SpinningMesh = ({position, args, color, speed}) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01 ))

  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand ? [1.6,1.6,1.6] : [1,1,1]
  })

  return (
    <a.mesh 
    onClick={() => setExpand(!expand)} 
    scale={props.scale}
    castShadow 
    position={position} 
    ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial 
      attach='material' 
      color={color} 
      speed={speed} 
      factor={0.6} />
    </a.mesh>
  )
}

function App() {
  const font = new THREE.FontLoader().parse(Terror);

  // configure font geometry
  const textOptions = {
    font,
    size: 5,
    height: 1
  };

  return (
    <>
      <Canvas shadowMap colorManagement camera={{position: [1, 3, 15], fov: 60}}>
        <ambientLight intensity={0.3}/>
        <directionalLight 
        castShadow
        position={[0, 10, 0]} 
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5}/>
        <pointLight position={[0, -10, 0]} intensity={1.5}/>

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]}/>
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
        <SpinningMesh position={[5, -1, -2]} args={[1, 2, 1]} color="#D1F7FF" speed={2}/>
        <SpinningMesh position={[-2, 1, -5]} color="#ffd1f7" speed={4}/>
        <SpinningMesh position={[10, 1, -2]} color="#ffd1f7" speed={4}/>
        <SpinningMesh position={[5, 7, -10]} args={[2, 7, 1]} color="yellow" speed={8}/>
          <mesh castShadow position={[0, 1, -5]}>
            <textGeometry attach='geometry' args={['Jake', textOptions]} />
            <meshStandardMaterial attach='material' color='tan' />
          </mesh>
        </group>

        <group>
        </group>


        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
