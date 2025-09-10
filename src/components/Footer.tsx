import { Box, Container, Text, useColorMode } from '@chakra-ui/react';

export default function Footer() {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      borderTop="1px"
      borderColor="gray.200"
      backdropFilter="saturate(180%) blur(8px)"
      bg={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.400'}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <Container maxW="container.lg" py={2}>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          © 2025 my-it-online.com — All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}


