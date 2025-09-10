import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { SearchIcon, InfoOutlineIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';

type FaqStatus = 'new' | 'important' | 'up_to_date';

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  tags: string[];
  status: FaqStatus;
};

function StatusBadge({ status }: { status: FaqStatus }) {
  if (status === 'new') return <Badge colorScheme="green">New</Badge>;
  if (status === 'important') return <Badge colorScheme="red">Important</Badge>;
  return <Badge colorScheme="blue">Up to date</Badge>;
}

const allTags = [
  'account', 'billing', 'security', 'performance', 'troubleshooting', 'getting-started',
  'navigation', 'privacy', 'api', 'integrations', 'upgrade', 'limits', 'notifications',
  'auth', 'password', 'profile', 'support', 'ui', 'theme', 'deploy', 'cdn', 'storage',
  'team', 'roles', 'usage', 'errors', 'email', 'sms', 'webhooks'
];

// FAQ DATASET (intentionally long and explicit for clarity and future edits)
const faqs: FaqItem[] = [
  { id: 1, question: 'How do I create an account?', answer: 'Click Register, fill in your email and password, then confirm the email we send.', tags: ['account', 'getting-started'], status: 'up_to_date' },
  { id: 2, question: 'How do I reset my password?', answer: 'On the login screen, click “Forgot password” and follow the reset instructions.', tags: ['account', 'password', 'auth'], status: 'up_to_date' },
  { id: 3, question: 'Where can I change my email address?', answer: 'Open Profile in the top-right menu, then update your email in Account settings.', tags: ['account', 'profile'], status: 'up_to_date' },
  { id: 4, question: 'How to enable dark mode?', answer: 'Use the moon/sun toggle in the navbar; your choice is remembered automatically.', tags: ['ui', 'theme'], status: 'up_to_date' },
  { id: 5, question: 'How do I contact support?', answer: 'Use the Contact page form or email hello@my-it-online.com for assistance.', tags: ['support'], status: 'up_to_date' },
  { id: 6, question: 'Is Two-Factor Authentication available?', answer: '2FA is available via authenticator apps; enable it in Security settings.', tags: ['security', 'auth'], status: 'important' },
  { id: 7, question: 'How can I export my data?', answer: 'Go to Profile → Privacy and click Export. We email a download link.', tags: ['account', 'privacy'], status: 'up_to_date' },
  { id: 8, question: 'What payment methods do you accept?', answer: 'We accept major credit/debit cards and PayPal for eligible regions.', tags: ['billing'], status: 'up_to_date' },
  { id: 9, question: 'Can I invite team members?', answer: 'Yes. Go to Team settings, click Invite, and assign a role to each member.', tags: ['team', 'roles'], status: 'up_to_date' },
  { id: 10, question: 'How do I cancel my subscription?', answer: 'Open Billing → Subscriptions and click Cancel. Your plan ends at next renewal.', tags: ['billing'], status: 'up_to_date' },
  { id: 11, question: 'Do you have an API?', answer: 'Yes, our REST API is documented in the Developer section, with examples.', tags: ['api', 'integrations'], status: 'new' },
  { id: 12, question: 'How to integrate webhooks?', answer: 'Register a webhook endpoint and select the events you want to receive.', tags: ['api', 'webhooks', 'integrations'], status: 'up_to_date' },
  { id: 13, question: 'Why am I not receiving emails?', answer: 'Check spam folders and verify your email in Profile → Account.', tags: ['email', 'notifications'], status: 'up_to_date' },
  { id: 14, question: 'How to improve performance?', answer: 'Enable caching, use CDN-backed assets, and paginate large API requests.', tags: ['performance', 'cdn'], status: 'important' },
  { id: 15, question: 'How to report a security issue?', answer: 'Please email security@my-it-online.com with details; we respond promptly.', tags: ['security'], status: 'important' },
  { id: 16, question: 'Do you store credit card data?', answer: 'We use PCI-compliant providers and do not store raw card numbers.', tags: ['billing', 'privacy'], status: 'up_to_date' },
  { id: 17, question: 'Can I change my plan anytime?', answer: 'Yes, upgrade or downgrade from Billing. Prorated charges may apply.', tags: ['billing', 'upgrade'], status: 'up_to_date' },
  { id: 18, question: 'How to customize notifications?', answer: 'Go to Notifications settings to pick channels and frequency per event.', tags: ['notifications', 'email', 'sms'], status: 'new' },
  { id: 19, question: 'What are usage limits?', answer: 'See Usage & Limits in Billing for quotas and how to request higher limits.', tags: ['limits', 'usage'], status: 'up_to_date' },
  { id: 20, question: 'How to fix login errors?', answer: 'Ensure email and password are correct; try password reset if needed.', tags: ['auth', 'troubleshooting'], status: 'up_to_date' },
  { id: 21, question: 'Where are servers located?', answer: 'We operate across multiple UK/EU regions with failover and redundancy.', tags: ['performance'], status: 'up_to_date' },
  { id: 22, question: 'Can I request my data be deleted?', answer: 'Yes, submit a privacy request in Profile → Privacy. Deletion is permanent.', tags: ['privacy', 'account'], status: 'up_to_date' },
  { id: 23, question: 'Do you support SSO?', answer: 'SSO with major providers is supported on Business plans and above.', tags: ['auth', 'security'], status: 'important' },
  { id: 24, question: 'How to manage API keys?', answer: 'Create, rotate, and revoke keys in Developer → API Keys. Treat them as secrets.', tags: ['api', 'security'], status: 'up_to_date' },
  { id: 25, question: 'Why was my account locked?', answer: 'Too many failed logins triggers a temporary lock; try again later or reset.', tags: ['security', 'auth'], status: 'up_to_date' },
  { id: 26, question: 'Can I brand the UI?', answer: 'Branding via theme options and custom logo is available on Pro plans.', tags: ['ui', 'theme'], status: 'new' },
  { id: 27, question: 'How do I deploy faster?', answer: 'Use incremental builds and cache dependencies; see Deploy docs.', tags: ['deploy', 'performance'], status: 'up_to_date' },
  { id: 28, question: 'What is your uptime?', answer: 'We target 99.9% uptime; see our status page for real-time updates.', tags: ['performance'], status: 'up_to_date' },
  { id: 29, question: 'How to add team roles?', answer: 'Owners can assign Admin, Editor, or Viewer roles in Team settings.', tags: ['team', 'roles'], status: 'up_to_date' },
  { id: 30, question: 'How to verify domain ownership?', answer: 'Add the provided TXT record to your DNS and click Verify.', tags: ['integrations'], status: 'up_to_date' },
  { id: 31, question: 'Can I import data from CSV?', answer: 'Yes, use the Import tool in Settings and map your columns.', tags: ['usage'], status: 'up_to_date' },
  { id: 32, question: 'How to handle rate limits?', answer: 'Respect Retry-After headers and implement exponential backoff.', tags: ['api', 'limits'], status: 'up_to_date' },
  { id: 33, question: 'Why am I seeing 429 errors?', answer: 'You exceeded rate limits; reduce request burst or upgrade limits.', tags: ['api', 'errors', 'limits'], status: 'up_to_date' },
  { id: 34, question: 'How to secure webhooks?', answer: 'Validate HMAC signatures and use secret rotation regularly.', tags: ['webhooks', 'security'], status: 'important' },
  { id: 35, question: 'How to pause emails?', answer: 'Toggle email notifications off under Notification Preferences.', tags: ['notifications', 'email'], status: 'up_to_date' },
  { id: 36, question: 'Do you have sandbox mode?', answer: 'Yes, use our test environment and keys for safe experimentation.', tags: ['api', 'integrations'], status: 'new' },
  { id: 37, question: 'How to troubleshoot slow pages?', answer: 'Check network waterfalls, avoid large images, and memoize components.', tags: ['performance', 'troubleshooting'], status: 'important' },
  { id: 38, question: 'How to enable CDN?', answer: 'Enable CDN in Settings; assets will be served from edge locations.', tags: ['cdn', 'performance'], status: 'up_to_date' },
  { id: 39, question: 'How to change time zone?', answer: 'Go to Profile → Preferences and select your preferred time zone.', tags: ['profile'], status: 'up_to_date' },
  { id: 40, question: 'What is the refund policy?', answer: 'Refunds are evaluated case-by-case within 14 days of purchase.', tags: ['billing'], status: 'up_to_date' },
  // Additional entries to enrich the FAQ and reach the requested size
  { id: 41, question: 'Do you support import from competitors?', answer: 'We provide migration guides and scripts—contact support for help.', tags: ['usage', 'integrations'], status: 'new' },
  { id: 42, question: 'Can I get invoices by email?', answer: 'Enable “Email invoices” in Billing preferences to receive PDFs.', tags: ['billing', 'email'], status: 'up_to_date' },
  { id: 43, question: 'How to change language?', answer: 'Language can be changed in Profile → Preferences under Locale.', tags: ['ui'], status: 'up_to_date' },
  { id: 44, question: 'How to close my account?', answer: 'Go to Profile → Privacy and request account closure; we confirm by email.', tags: ['account', 'privacy'], status: 'important' },
  { id: 45, question: 'What browsers are supported?', answer: 'Recent versions of Chrome, Firefox, Safari, and Edge are supported.', tags: ['ui'], status: 'up_to_date' },
  { id: 46, question: 'How to back up my data?', answer: 'Schedule automatic exports or use the API to pull regular backups.', tags: ['usage', 'api'], status: 'up_to_date' },
  { id: 47, question: 'Do you offer discounts?', answer: 'We offer occasional promotions; check Billing or subscribe to news.', tags: ['billing'], status: 'up_to_date' },
  { id: 48, question: 'How to track changes?', answer: 'See the Changelog page for product updates and improvements.', tags: ['ui'], status: 'new' },
  { id: 49, question: 'How to handle GDPR requests?', answer: 'Use our Privacy tools for export and deletion per GDPR guidelines.', tags: ['privacy'], status: 'important' },
  { id: 50, question: 'Is there a desktop app?', answer: 'We focus on web-first; a desktop wrapper is under consideration.', tags: ['ui'], status: 'up_to_date' },
  { id: 51, question: 'How to receive outage alerts?', answer: 'Subscribe to status updates via email, RSS, or webhook.', tags: ['notifications'], status: 'up_to_date' },
  { id: 52, question: 'How to submit feedback?', answer: 'Use the in-app Feedback link or email product@my-it-online.com.', tags: ['support'], status: 'up_to_date' },
  { id: 53, question: 'How to whitelist IPs?', answer: 'Add IP allowlists in Security settings to restrict access.', tags: ['security'], status: 'important' },
  { id: 54, question: 'Why is my map not loading?', answer: 'Ensure your network allows Google Maps and reload the page.', tags: ['troubleshooting'], status: 'up_to_date' },
  { id: 55, question: 'Can I theme emails?', answer: 'Transactional emails support basic branding and logo uploads.', tags: ['email', 'ui'], status: 'up_to_date' },
  { id: 56, question: 'How to verify email delivery?', answer: 'Check email logs and ensure SPF/DKIM are set for your domain.', tags: ['email', 'integrations'], status: 'important' },
  { id: 57, question: 'Do you offer training?', answer: 'Yes, workshops are available for teams—contact sales for details.', tags: ['support'], status: 'up_to_date' },
  { id: 58, question: 'Can I customize webhooks payload?', answer: 'Event payloads are fixed, but you can add metadata fields.', tags: ['webhooks', 'api'], status: 'up_to_date' },
  { id: 59, question: 'How to rotate secrets?', answer: 'Create a new secret, update clients, then revoke the old one.', tags: ['security'], status: 'important' },
  { id: 60, question: 'Do you have SLA?', answer: 'SLA is available on Enterprise plans; contact us for terms.', tags: ['performance'], status: 'up_to_date' },
  { id: 61, question: 'How to use keyboard shortcuts?', answer: 'Press ? in the app to see all available shortcuts and tips.', tags: ['ui'], status: 'new' },
  { id: 62, question: 'Can I schedule messages?', answer: 'Scheduling is available for select features; see feature docs.', tags: ['usage'], status: 'up_to_date' },
  { id: 63, question: 'How to request a feature?', answer: 'Open a ticket with “Feature request” and details of your use case.', tags: ['support'], status: 'up_to_date' },
  { id: 64, question: 'Is there a mobile app?', answer: 'The web app is mobile-friendly; native apps are being researched.', tags: ['ui'], status: 'up_to_date' },
  { id: 65, question: 'How to purge cache?', answer: 'Use the Purge Cache button in CDN settings after big changes.', tags: ['cdn', 'performance'], status: 'up_to_date' },
  { id: 66, question: 'Can I set custom domains?', answer: 'Yes, add your domain in Integrations and complete DNS steps.', tags: ['integrations'], status: 'important' },
  { id: 67, question: 'What happens after trial?', answer: 'You can upgrade to keep your data; otherwise, features downgrade.', tags: ['billing', 'upgrade'], status: 'up_to_date' },
  { id: 68, question: 'How to add multi-factor auth?', answer: 'Enable 2FA in Security and store backup codes safely.', tags: ['security', 'auth'], status: 'important' },
  { id: 69, question: 'Is there a CLI?', answer: 'Our CLI is in beta; join the program to get access.', tags: ['api'], status: 'new' },
  { id: 70, question: 'How to view audit logs?', answer: 'Audit logs are in Security → Activity for supported plans.', tags: ['security'], status: 'up_to_date' },
  { id: 71, question: 'How to throttle API clients?', answer: 'Use API gateway features or middleware to control rate.', tags: ['api', 'limits'], status: 'up_to_date' },
  { id: 72, question: 'How to debug 500 errors?', answer: 'Check server logs, enable verbose mode, and capture request IDs.', tags: ['errors', 'troubleshooting'], status: 'up_to_date' },
  { id: 73, question: 'Can I download invoices?', answer: 'All invoices are available in Billing → Invoices as PDFs.', tags: ['billing'], status: 'up_to_date' },
  { id: 74, question: 'Where to find API examples?', answer: 'Visit the Developer docs with copy-ready curl and JS snippets.', tags: ['api'], status: 'new' },
  { id: 75, question: 'How to manage sessions?', answer: 'From Security, terminate sessions on suspicious activity.', tags: ['security'], status: 'important' },
  { id: 76, question: 'How to link multiple accounts?', answer: 'Use Linked Accounts to switch without re-authentication.', tags: ['account'], status: 'up_to_date' },
  { id: 77, question: 'How to remove a team member?', answer: 'Go to Team, select member, click Remove; data access is revoked.', tags: ['team', 'roles'], status: 'up_to_date' },
  { id: 78, question: 'Why are images blurry?', answer: 'Upload higher resolution or enable responsive image sizes.', tags: ['ui', 'performance'], status: 'up_to_date' },
  { id: 79, question: 'How to export audit data?', answer: 'Enterprise plans can export CSV/JSON from the Audit section.', tags: ['security', 'usage'], status: 'up_to_date' },
  { id: 80, question: 'How to change currency?', answer: 'Currency is auto-detected; contact support to request changes.', tags: ['billing'], status: 'up_to_date' },
  { id: 81, question: 'How to pin important items?', answer: 'Use the star icon in lists; pinned items appear at the top.', tags: ['ui'], status: 'new' },
  { id: 82, question: 'Can I print reports?', answer: 'Yes, use the Print button on reports for a print-optimized view.', tags: ['usage'], status: 'up_to_date' },
  { id: 83, question: 'How to enable beta features?', answer: 'Join Beta in Profile → Preferences to try features early.', tags: ['ui'], status: 'new' },
  { id: 84, question: 'How to monitor errors?', answer: 'Integrate with your APM or use browser console with source maps.', tags: ['errors', 'integrations'], status: 'up_to_date' },
  { id: 85, question: 'How to secure public links?', answer: 'Use expiring links and permissions; avoid sharing secrets.', tags: ['security', 'privacy'], status: 'important' },
  { id: 86, question: 'What is maintenance window?', answer: 'Planned maintenance is announced ahead via email and status page.', tags: ['performance'], status: 'up_to_date' },
  { id: 87, question: 'How to reduce bundle size?', answer: 'Use code splitting, tree-shaking, and avoid large libraries.', tags: ['performance'], status: 'important' },
  { id: 88, question: 'How to verify webhook retries?', answer: 'We retry with backoff on failure; inspect delivery history.', tags: ['webhooks'], status: 'up_to_date' },
  { id: 89, question: 'Do you support SAML?', answer: 'SAML SSO is available on Enterprise plans; contact sales.', tags: ['auth', 'security'], status: 'up_to_date' },
  { id: 90, question: 'How to request logs?', answer: 'Open a ticket specifying timeframe and correlation IDs.', tags: ['support', 'errors'], status: 'up_to_date' },
  { id: 91, question: 'How to change avatar?', answer: 'Open Profile menu, click Profile, then upload a new image.', tags: ['profile', 'ui'], status: 'up_to_date' },
  { id: 92, question: 'Why was my card declined?', answer: 'Verify details, balance, and 3D Secure; contact your bank.', tags: ['billing'], status: 'up_to_date' },
  { id: 93, question: 'How to track usage costs?', answer: 'See Billing → Usage with daily breakdown and forecasts.', tags: ['billing', 'usage'], status: 'new' },
  { id: 94, question: 'Can I export settings?', answer: 'Export and import settings via JSON in Developer Tools.', tags: ['usage'], status: 'up_to_date' },
  { id: 95, question: 'How to add custom CSS?', answer: 'Custom CSS is not supported for security; use theme options.', tags: ['ui'], status: 'up_to_date' },
  { id: 96, question: 'How to get IP of webhook calls?', answer: 'See delivery headers; IPs vary—use signature validation.', tags: ['webhooks', 'security'], status: 'up_to_date' },
  { id: 97, question: 'What is the max upload size?', answer: 'Default is 25 MB per file; contact support to discuss needs.', tags: ['limits', 'storage'], status: 'up_to_date' },
  { id: 98, question: 'How to archive projects?', answer: 'Use Project settings → Archive. You can restore within 30 days.', tags: ['usage'], status: 'up_to_date' },
  { id: 99, question: 'How to reduce latency?', answer: 'Use nearest region and cache static content at the edge.', tags: ['performance', 'cdn'], status: 'up_to_date' },
  { id: 100, question: 'Where to find tutorials?', answer: 'Visit Docs → Tutorials with step-by-step guides and videos.', tags: ['getting-started'], status: 'new' },
];

const statuses: { key: FaqStatus; label: string; icon: typeof Icon }[] = [
  { key: 'new', label: 'New', icon: StarIcon as any },
  { key: 'important', label: 'Important', icon: InfoOutlineIcon as any },
  { key: 'up_to_date', label: 'Up to date', icon: TimeIcon as any },
];

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeStatuses, setActiveStatuses] = useState<FaqStatus[]>(['new', 'important', 'up_to_date']);
  const MAX_RESULTS = 25;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesQuery = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.tags.some(t => t.includes(q));
      const matchesTags = selectedTags.length === 0 || selectedTags.every(t => f.tags.includes(t));
      const matchesStatus = activeStatuses.includes(f.status);
      return matchesQuery && matchesTags && matchesStatus;
    });
  }, [query, selectedTags, activeStatuses]);

  const chipBg = useColorModeValue('gray.100', 'whiteAlpha.200');

  return (
    <Stack spacing={6}>
      <Heading size="lg">Frequently Asked Questions</Heading>
      <Card maxW="3xl" mx="auto" w="100%">
        <CardHeader>
          <Heading size="md">Filter</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Find answers..." value={query} onChange={(e) => setQuery(e.target.value)} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <HStack spacing={4} wrap="wrap">
                {statuses.map((s) => (
                  <Checkbox
                    key={s.key}
                    isChecked={activeStatuses.includes(s.key)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setActiveStatuses((prev) => checked ? [...prev, s.key] : prev.filter(x => x !== s.key));
                    }}
                  >
                    <HStack>
                      <Icon as={s.icon} />
                      <Text>{s.label}</Text>
                    </HStack>
                  </Checkbox>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Box maxH="180px" overflowY="auto" p={2} borderWidth="1px" borderRadius="md">
                <CheckboxGroup value={selectedTags} onChange={(v) => setSelectedTags(v as string[])}>
                  <Wrap spacing={3}>
                    {allTags.map((tag) => (
                      <WrapItem key={tag}>
                        <Checkbox value={tag} size="sm">{tag}</Checkbox>
                      </WrapItem>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Box>
            </FormControl>
          </SimpleGrid>
          <HStack mt={4} justify="space-between" align="start">
            <Stack spacing={2}>
              <Text fontWeight="semibold" fontSize="sm">Quick picks</Text>
              <Wrap shouldWrapChildren spacing={2}>
                {['account','billing','security','performance','api','notifications'].map((t) => (
                  <Tag key={t} cursor="pointer" onClick={() => setSelectedTags((prev) => prev.includes(t) ? prev : [...prev, t])}>
                    <TagLabel>{t}</TagLabel>
                  </Tag>
                ))}
              </Wrap>
            </Stack>
            <Text fontSize="sm" color="gray.500" maxW="xs">Tip: combine search, status, and tags to narrow results. Use Reset to clear all filters.</Text>
          </HStack>
          <HStack mt={4} spacing={3} wrap="wrap">
            {selectedTags.map((t) => (
              <Tag key={t} variant="subtle" bg={chipBg}>
                <TagLabel>{t}</TagLabel>
                <TagCloseButton onClick={() => setSelectedTags((prev) => prev.filter(x => x !== t))} />
              </Tag>
            ))}
            {(query || selectedTags.length > 0 || activeStatuses.length < statuses.length) && (
              <Button size="sm" onClick={() => { setQuery(''); setSelectedTags([]); setActiveStatuses(['new','important','up_to_date']); }}>Reset filters</Button>
            )}
          </HStack>
        </CardBody>
      </Card>

      <Card maxW="3xl" mx="auto" w="100%" mt={4}>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">Results</Heading>
            <Text color="gray.500">{Math.min(filtered.length, MAX_RESULTS)} of {MAX_RESULTS}</Text>
          </HStack>
        </CardHeader>
        <CardBody>
          {filtered.length === 0 ? (
            <VStack py={10} spacing={3}>
              <Text>No results. Try different tags or keywords.</Text>
              <HStack>
                <Text color="gray.500">Tip:</Text>
                <Kbd>Ctrl</Kbd>
                <Text>+</Text>
                <Kbd>K</Kbd>
                <Text>opens app search (if available).</Text>
              </HStack>
            </VStack>
          ) : (
            <Accordion allowMultiple>
              {filtered.slice(0, MAX_RESULTS).map((f) => (
                <AccordionItem key={f.id}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <HStack spacing={3}>
                          <StatusBadge status={f.status} />
                          <Text fontWeight="semibold">{f.question}</Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <Text mb={3}>{f.answer}</Text>
                    <HStack spacing={2} wrap="wrap">
                      {f.tags.map((t) => (
                        <Tag key={t} size="sm" variant="subtle">{t}</Tag>
                      ))}
                    </HStack>
                  </AccordionPanel>
                  <Divider />
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardBody>
      </Card>
    </Stack>
  );
}


