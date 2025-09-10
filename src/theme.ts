import { extendTheme } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { mode } from '@chakra-ui/theme-tools';

const buttonHover = keyframes`
  from { transform: translateY(0); box-shadow: var(--chakra-shadows-sm); }
  to { transform: translateY(-1px); box-shadow: var(--chakra-shadows-md); }
`;

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
} as const;

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      'html, body, #root': {
        height: '100%'
      },
      body: {
        bg: mode('gray.50', 'gray.900')(props),
        color: mode('gray.800', 'gray.100')(props),
        transition: 'background-color 200ms ease'
      }
    })
  },
  components: {
    Button: {
      baseStyle: {
        transition: 'transform 120ms ease, box-shadow 120ms ease',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'md',
          animation: `${buttonHover} 160ms ease`,
        },
        _active: {
          transform: 'translateY(0) scale(0.98)',
          boxShadow: 'sm',
        },
      },
    },
  },
});

export default theme;


