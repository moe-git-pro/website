import React from 'react';
import { 
  ChakraProvider, 
  Box, 
  useColorModeValue,
  ColorModeScript,
  extendTheme
} from '@chakra-ui/react';
import Hero from './components/Hero';
import { News } from './components/News';
import { TechStacks } from './components/TechStacks'
import { Resume } from './components/Resume';
import Navbar from './components/Navbar';
import AboutSection from './components/About';
import Education from './components/Education';
import Contact from './components/Contact';

console.log('App component rendering');

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
});

export const App: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box bg={bgColor}>
        <Navbar />
        <Box bg={bgColor}>
          <Hero />
          <AboutSection />
          <News />
          <TechStacks />
          <Resume />
          <Education />
          <Contact />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
