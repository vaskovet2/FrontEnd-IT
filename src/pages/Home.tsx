import { Box, Heading, Text, Card, CardBody, CardHeader, SimpleGrid, Link, Badge, HStack, Image, AspectRatio, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
const MotionBox = motion(Box);
type Article = { id: number; title: string; summary: string; url: string; source: string; date: string };
function randomDate() {
  const now = Date.now();
  const past = now - 1000 * 60 * 60 * 24 * 90;
  const d = new Date(past + Math.random() * (now - past));
  return d.toLocaleString();
}
const sources = ['TechRadar', 'The Verge', 'Wired', 'ZDNet', 'Ars Technica', 'BBC Tech'];
const images = [
  'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // circuit board
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop', // server racks
  'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop', // code screen
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop', // abstract tech
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop', // laptop code (no faces)
  'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573495628363-04667cedc587?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1675603849830-6d92af9099ce?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1536148935331-408321065b18?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1569396116180-7fe09fa16dd8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  , // datacenter
];

function getImageFor(id: number): string {
  if (images[id % images.length]) return images[id % images.length];
  // Fallback to random tech image; keywords avoid faces
  return `https://source.unsplash.com/800x450/?circuit,server,code,datacenter&sig=${id}`;
}
const regions = ['UK', 'EU', 'US', 'Asia-Pacific', 'Nordics', 'Middle East'];
const topics = ['AI', 'security', 'cloud', 'edge', 'quantum', 'open-source', 'privacy', 'fintech', 'dev tools', 'data'];
const verbs = ['accelerates', 'stalls', 'expands', 'consolidates', 'reaches record highs', 'sees renewed interest'];
const companies = ['Acme Systems', 'Globex', 'Initech', 'Umbrella Cloud', 'Stark Data', 'Wayne Analytics'];
const metrics = ['30% YoY', 'triple-digit growth', 'multi-region rollout', 'public preview', 'Series B funding', 'pilot program'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function makeTitle(): string {
  const t = pick(topics);
  const v = pick(verbs);
  const r = pick(regions);
  return `${t.charAt(0).toUpperCase() + t.slice(1)} adoption ${v} in ${r}`;
}

function makeSummary(): string {
  const company = pick(companies);
  const t1 = pick(topics);
  const m = pick(metrics);
  const r = pick(regions);
  const extra = pick([
    'Analysts note increased competition among vendors.',
    'Engineers cite performance and reliability as key drivers.',
    'Early adopters report reduced costs and faster delivery.',
    'Regulators are drafting updated guidance for enterprises.',
  ]);
  return `${company} announces ${m} for ${t1} across ${r}. ${extra}`;
}

const sampleTitles = ['placeholder']; // unused, kept to avoid accidental removal during merges
function generateArticles(count = 12): Article[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: makeTitle(),
    summary: makeSummary(),
    url: 'https://news.example.com/article/' + (i + 1),
    source: pick(sources),
    date: randomDate(),
  }));
}
import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const articles = generateArticles(12);
  return (
    <MotionBox initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Stack mb={6} spacing={2}>
        <Heading>World IT News</Heading>
        <Text color="gray.500">Curated technology headlines from around the globe</Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {articles.map((a) => (
          <Card key={a.id}>
            <AspectRatio ratio={16/9}>
              <Image src={getImageFor(a.id)} alt={a.title} objectFit="cover" />
            </AspectRatio>
            <CardHeader pb={2}>
              <Heading size="md">{a.title}</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text mb={3}>{a.summary}</Text>
              <HStack justify="space-between" align="center">
                <HStack>
                  <Badge colorScheme="purple">{a.source}</Badge>
                  <Badge colorScheme="blue">{a.date}</Badge>
                </HStack>
                <Link href={a.url} color="teal.500" isExternal fontSize="sm" display="inline-flex" alignItems="center">Read more</Link>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </MotionBox>
  );
}



