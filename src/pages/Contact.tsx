import {
  Box, Card, CardBody, CardHeader, Heading, Link, Stack, Text, SimpleGrid,
  HStack, Icon, FormControl, FormLabel, Input, Textarea, Button, useToast,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';

export default function Contact() {
  const address = '221B Baker Street, London NW1 6XE, United Kingdom';
  const email = 'hello@my-it-online.com';
  const phone = '+44 20 7946 0958';
  const mapsSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9931.545736453844!2d-0.1657303!3d51.5237676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad55c8d3c2b%3A0x66c6d6f8b6a6b!2sBaker%20St%2C%20London!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk';
  const toast = useToast();

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">Contact Us</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={6}>
          <Card gridColumn={{ base: 'auto', md: 'span 2' }}>
            <CardHeader>
              <Heading size="md">Send us an email</Heading>
            </CardHeader>
            <CardBody>
              <Box as="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const fromEmail = String(data.get('email') || '');
                toast({ title: 'Message sent', description: `Thanks, we will reply to ${fromEmail}.`, status: 'success', duration: 2000, isClosable: true });
                e.currentTarget.reset();
              }}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Your name</FormLabel>
                    <Input name="name" placeholder="Jane Doe" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Your email</FormLabel>
                    <Input name="email" type="email" placeholder="you@example.com" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea name="message" rows={5} placeholder="How can we help?" />
                  </FormControl>
                  <Button type="submit" colorScheme="teal" alignSelf="flex-start">Send</Button>
                </Stack>
              </Box>
            </CardBody>
          </Card>

          <Card overflow="hidden" gridColumn={{ base: 'auto', md: 'span 3' }}>
            <CardHeader>
              <Heading size="md">Find us on the map</Heading>
            </CardHeader>
            <CardBody p={0}>
              <Box borderRadius="md" overflow="hidden">
                <iframe
                  title="UK Map"
                  src={mapsSrc}
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}


