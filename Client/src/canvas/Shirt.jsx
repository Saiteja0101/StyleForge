import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import gsap from 'gsap';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const groupRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Animation setup
  const handleClick = () => {
    setIsFocused(!isFocused);
    
    gsap.to(groupRef.current.position, {
      x: isFocused ? 0 : 0,
      y: isFocused ? 0 : 0,
      z: isFocused ? 0 : 0,
      duration: 0.5,
      ease: "power2.inOut"
    });

    gsap.to(groupRef.current.scale, {
      x: isFocused ? 1 : 1.5,
      y: isFocused ? 1 : 1.5,
      z: isFocused ? 1 : 1.5,
      duration: 0.5,
      ease: "power2.inOut"
    });
  };

  // Update material color smoothly
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  // Set anisotropy for better texture quality
  logoTexture.anisotropy = 16;
  fullTexture.anisotropy = 16;

  return (
    <group ref={groupRef} key={JSON.stringify(snap)}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        onClick={handleClick}
        onPointerOver={(e) => document.body.style.cursor = 'pointer'}
        onPointerOut={(e) => document.body.style.cursor = 'default'}
      >
        {/* Full texture decal */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/* Logo texture decal */}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;