import React, { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import { use3DInteraction } from '../../hooks/use3DInteraction';
import { three3DHelpersUtil } from '../../utils/three-helpers';
import { Bounded } from '../../components/ui/Bounded';
import TextSplitter from '../../components/ui/TextSplitter';
import { motion } from "framer-motion";
import { Vector3 } from 'three';

export interface HeroProps {
  modelUrl: string;
  title: string;
  description: string;
  ctaLabel: string;
}

const Hero: React.FC<HeroProps> = ({ modelUrl, title, description, ctaLabel }) => {
  const { isDarkMode } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(modelUrl) as any;
  const { gl } = useThree();
  const { createTimeline } = use3DAnimation({model: groupRef.current});
    const { handlePointerOver } = use3DInteraction();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <motion.div
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-300 dark:from-gray-800 dark:to-gray-900 opacity-50" />
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 text-white text-center">
        <TextSplitter
          text={title}
          className="text-4xl font-bold mb-4"
        />
        <TextSplitter
          text={description}
          className="mb-8"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {ctaLabel}
        </button>
      </div>
      <Bounded>
      <Suspense fallback={<Html center>Loading...</Html>}>
        <group 
        ref={groupRef}
        onPointerOver={handlePointerOver}
        scale={2} position={[0, -2, 0]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {nodes && Object.keys(nodes).map((key) => {
            const node = nodes[key];
            if (node instanceof THREE.Mesh) {
              return (
                <mesh
                  key={key}
                  geometry={node.geometry}
                  material={materials[node.material.name]}
                  position={node.position}
                  rotation={node.rotation}
                  scale={node.scale}
                />
              );
            }
            return null;
          })}
        </group>
      </Suspense>
        </Bounded>
    </motion.div>
  );
};

export default Hero;