import { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Heading, Input, InputGroup,
  InputRightElement, Link, Stack, Text, useToast, Card, CardBody,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
const MotionCard = motion(Card);
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import PasswordStrength from '../components/PasswordStrength';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: 'Passwords do not match', status: 'warning', duration: 2000, isClosable: true });
      return;
    }
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 700));
      login(email);
      toast({ title: 'Registered', status: 'success', duration: 1500, isClosable: true });
      navigate('/');
    } catch {
      toast({ title: 'Registration failed', status: 'error', duration: 2000, isClosable: true });
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
            <Heading size="lg">Register</Heading>

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
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPwd(s => !s)} variant="ghost">
                    {showPwd ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <PasswordStrength password={password} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowConfirm(s => !s)} variant="ghost">
                    {showConfirm ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="teal" isLoading={submitting}>
              Create account
            </Button>

            <Text fontSize="sm">
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="teal.500">
                Login
              </Link>
            </Text>
          </Stack>
        </CardBody>
      </MotionCard>
    </Box>
  );
}



