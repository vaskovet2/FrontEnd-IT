import { Progress, Text } from '@chakra-ui/react';

function hasUpperCase(s: string) {
  return /[A-Z]/.test(s);
}

function hasNumber(s: string) {
  return /\d/.test(s);
}

function hasSymbol(s: string) {
  return /[^\w\s]/.test(s);
}

function hasMinLength(s: string, n: number) {
  return s.length >= n;
}

function getStrength(password: string) {
  const checks = [
    hasUpperCase(password),
    hasNumber(password),
    hasSymbol(password),
    hasMinLength(password, 10),
  ];
  const score = checks.filter(Boolean).length;
  return { score, checks } as const;
}

export default function PasswordStrength({ password, showLabel = true }: { password: string; showLabel?: boolean }) {
  const { score, checks } = getStrength(password);
  const percent = (score / 4) * 100;
  const color = score <= 1 ? 'red' : score === 2 ? 'orange' : score === 3 ? 'yellow' : 'green';
  return (
    <>
      <Progress value={percent} colorScheme={color} size="sm" borderRadius="md" mt={3} />
      {showLabel && (
        <Text fontSize="xs" color="gray.500" mt={1}>
          Strength: {score}/4 (needs uppercase, number, symbol, 10+ chars)
        </Text>
      )}
    </>
  );
}


