import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: '"Outfit", "Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#e0f2fe',
      100: '#bae6fd',
      200: '#7dd3fc',
      300: '#38bdf8',
      400: '#0ea5e9',
      500: '#0284c7', // Primary Brand Color
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
    },
    dark: {
      bg: '#0a0a0c',
      card: '#16161a',
      border: '#2a2a32',
      text: '#efeff1',
      muted: '#a1a1aa',
    },
    light: {
      bg: '#fcfcfd',
      card: '#ffffff',
      border: '#e4e4e7',
      text: '#18181b',
      muted: '#71717a',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'full',
        transition: 'all 0.3s ease',
      },
      variants: {
        solid: (props: any) => ({
          bg: mode('brand.500', 'brand.400')(props),
          color: mode('white', 'gray.900')(props),
          _hover: {
            bg: mode('brand.600', 'brand.300')(props),
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        }),
        glass: (props: any) => ({
          bg: mode('whiteAlpha.600', 'blackAlpha.600')(props),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: mode('blackAlpha.200', 'whiteAlpha.200')(props),
          _hover: {
            bg: mode('blackAlpha.50', 'whiteAlpha.50')(props),
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: mode('light.card', 'dark.card')(props),
          border: '1px solid',
          borderColor: mode('light.border', 'dark.border')(props),
          borderRadius: '2xl',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          _hover: {
            boxShadow: 'xl',
            borderColor: mode('brand.200', 'brand.700')(props),
          },
        },
      }),
    },
    Heading: {
      baseStyle: {
        letterSpacing: '-0.02em',
      },
    },
  },
  styles: {
    global: (props: any) => ({
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: mode('light.bg', 'dark.bg')(props),
        color: mode('light.text', 'dark.text')(props),
        transition: 'background-color 0.4s ease, color 0.4s ease',
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': {
        width: '10px',
      },
      '::-webkit-scrollbar-track': {
        background: mode('light.bg', 'dark.bg')(props),
      },
      '::-webkit-scrollbar-thumb': {
        background: mode('gray.300', 'gray.700')(props),
        borderRadius: 'full',
        border: '2px solid',
        borderColor: mode('light.bg', 'dark.bg')(props),
      },
    }),
  },
});

export default theme;
