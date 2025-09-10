import { ReactNode } from 'react';
import { Box, Container, Flex, Heading, Link, Spacer, IconButton, Badge, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { BellIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionHeading = motion(Heading);

export type NavAction = { key: string; label: ReactNode; to?: string; onClick?: () => void };

export default function NavBar({
  title = 'App',
  leftContent,
  rightContent,
  actions = [],
}: {
  title?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  actions?: NavAction[];
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200');
  return (
    <Box borderBottom="1px" borderColor="gray.200" mb={6} backdropFilter="saturate(180%) blur(8px)" bg={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.400'}>
      <Container maxW="container.lg">
        <Flex align="center" py={4} gap={4}>
          <MotionHeading
            size="md"
            whileHover={{ scale: 1.03, rotate: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {title}
          </MotionHeading>
          {leftContent}
          <Spacer />
          <Flex gap={3} align="center">
            {actions.map(action =>
              action.to ? (
                <Link as={RouterLink} key={action.key} to={action.to} px={3} py={2} borderRadius="md" transition="all 150ms ease" _hover={{ bg: hoverBg, transform: 'translateY(-1px)', boxShadow: 'sm', textDecoration: 'none' }}>
                  {action.label}
                </Link>
              ) : (
                <Link key={action.key} onClick={action.onClick} px={3} py={2} borderRadius="md" transition="all 150ms ease" _hover={{ bg: hoverBg, transform: 'translateY(-1px)', boxShadow: 'sm', textDecoration: 'none' }}>
                  {action.label}
                </Link>
              )
            )}
            <IconButton
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              icon={colorMode === 'light' ? <Box as="span">🌙</Box> : <Box as="span">☀️</Box>}
              variant="ghost"
              onClick={toggleColorMode}
            />
            <Box position="relative">
              <IconButton aria-label="Notifications" icon={<BellIcon />} variant="ghost" />
              <Badge colorScheme="red" borderRadius="full" position="absolute" top="0" right="0" transform="translate(30%, -30%)" fontSize="0.6em">0</Badge>
            </Box>
            {rightContent}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}


