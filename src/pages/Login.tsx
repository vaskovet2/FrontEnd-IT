import { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Heading, Input, InputGroup,
  InputRightElement, Link, Stack, Text, useToast, Card, CardBody,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
const MotionCard = motion(Card);
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      login(email);
      toast({ title: 'Logged in', status: 'success', duration: 1500, isClosable: true });
      navigate('/');
    } catch {
      toast({ title: 'Login failed', status: 'error', duration: 2000, isClosable: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minH="60vh">
      <MotionCard
        as="form"
        onSubmit={onSubmit}
        w="full"
        maxW="md"
        shadow="md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <CardBody>
          <Stack spacing={5}>
            <Heading size="lg">Login</Heading>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(s => !s)} variant="ghost">
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="teal" isLoading={submitting}>
              Sign in
            </Button>

            <Text fontSize="sm">
              Don&apos;t have an account?{' '}
              <Link as={RouterLink} to="/register" color="teal.500">
                Register
              </Link>
            </Text>
          </Stack>
        </CardBody>
      </MotionCard>
    </Box>
  );
}



