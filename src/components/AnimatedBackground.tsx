import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function AnimatedBackground() {
  const gradient = useColorModeValue('linear(to-b, teal.50, white)', 'linear(to-b, gray.800, gray.900)');
  const blob1 = useColorModeValue('teal.200', 'teal.500');
  const blob2 = useColorModeValue('purple.200', 'purple.500');
  return (
    <Box position="fixed" inset={0} zIndex={-1} overflow="hidden">
      <Box
        position="absolute"
        inset={0}
        bgGradient={gradient}
      />
      <MotionBox
        position="absolute"
        top="-10%"
        left="-10%"
        boxSize="60vmin"
        bg={blob1}
        filter="blur(60px)"
        borderRadius="50%"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        opacity={0.6}
      />
      <MotionBox
        position="absolute"
        bottom="-10%"
        right="-5%"
        boxSize="55vmin"
        bg={blob2}
        filter="blur(70px)"
        borderRadius="50%"
        animate={{ x: [0, -30, 25, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        opacity={0.6}
      />
    </Box>
  );
}


