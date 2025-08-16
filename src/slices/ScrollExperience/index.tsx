import React from 'react';
import { Box, Flex } from "@react-three/drei";
import { useThree } from '@react-three/fiber';

interface ScrollExperienceProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const ScrollExperience: React.FC<ScrollExperienceProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const { viewport } = useThree()
  return (
    <>
      <Flex
        rotation={rotation}
        scale={scale}
        position={position}
        align="center"
        justify="center"
        direction="column"
      >
        <Box
          args={[3, 1, 1]}
          position={[0, 0, 0]}
        >
        </Box>
      </Flex>
    </>
  );
};

export default ScrollExperience;