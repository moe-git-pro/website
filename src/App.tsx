import React from 'react';
import ccBadge from './assets/images/certificates/is2.png';
import {
  ChakraProvider,
  Box,
  ColorModeScript
} from '@chakra-ui/react';
import theme from './theme';
import Hero from './components/Hero';
import { Medium } from './components/Medium';
import { TechStacks } from './components/TechStacks'
import { Resume } from './components/Resume';
import Navbar from './components/Navbar';
import AboutSection from './components/About';
import Education from './components/Education';
import { Certificates } from './components/Certifications';
import { Projects } from './components/Project';
import Footer from './components/Footer';
import { Activities } from './components/Activities';
import { IconButton, Icon } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

console.log('App component rendering');

const certificates = [
  {
    title: "Certified in Cybersecurity (CC)",
    issueDate: "2024-05-14",
    issuer: "ISC²",
    description:
      "The Certified in Cybersecurity (CC) credential is a vendor-neutral certification designed for individuals beginning their journey in the cybersecurity field. It validates foundational knowledge of security principles, operations, network security, and access controls.",
    link: "https://www.credly.com/badges/edd23c95-a9e1-431e-a8b7-8ea87351de6e",
    credlyLink: "https://www.credly.com/badges/edd23c95-a9e1-431e-a8b7-8ea87351de6e",
    photo: ccBadge,
  }
];

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000 }}
        >
          <IconButton
            icon={<Icon as={FaArrowUp} />}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            colorScheme="brand"
            borderRadius="full"
            shadow="lg"
            size="lg"
            aria-label="Scroll to top"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box>
        <Navbar />
        <Box>
          <Hero />
          <AboutSection />
          <Medium />
          <TechStacks />
          <Resume />
          <Certificates certificates={certificates} />
          <Projects />
          <Education />
          <Activities />
          <Footer />
          <ScrollToTop />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
