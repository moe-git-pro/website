import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Heading,
  useColorModeValue,
  Button,
  Tooltip,
  useColorMode,
  VStack,
  Slide,
  useBreakpointValue
} from '@chakra-ui/react';
import { 
  HamburgerIcon, 
  CloseIcon, 
  MoonIcon, 
  SunIcon,
} from '@chakra-ui/icons';
import { 
  FaGithub, 
  FaLinkedin, 
} from 'react-icons/fa';

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const CustomNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(({ children, href }, ref) => {
  return (
    <Link ref={ref} href={href} _hover={{ textDecoration: 'none' }}>
      {children}
    </Link>
  );
});

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navbarRef = useRef<HTMLDivElement>(null);



  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      onClose(); // Close the navbar if the click is outside of it
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const Links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#tech-stacks' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const SocialLinks = [
    { icon: FaGithub, href: 'https://github.com/moetezafif-git', label: 'GitHub' },
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/moetez-a-b5582221a/', 
      label: 'LinkedIn' 
    },
  ];

  const navBackground = useColorModeValue(
    isScrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
    isScrolled ? 'rgba(26,32,44,0.9)' : 'transparent'
  );

  return (
    <Box
      as="nav"
      position="fixed"
      width="full"
      zIndex={1000}
      top={0}
      left={0}
      bg={navBackground}
      backdropFilter="saturate(180%) blur(10px)"
      boxShadow={isScrolled 
        ? useColorModeValue(
            '0 4px 6px rgba(0,0,0,0.1)', 
            '0 4px 6px rgba(255,255,255,0.1)'
          ) 
        : 'none'
      }
  >
      <Flex 
        h={16} 
        alignItems={'center'} 
        justifyContent={'space-between'} 
        maxW="container.xl" 
        mx="auto"
        px={4}
        ref={navbarRef}
      >
        {/* Mobile Menu Toggle */}
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
        />
        
        {/* Logo and Navigation */}
        <HStack spacing={8} alignItems={'center'} width="full" justifyContent="space-between">
          <Box
          >
            <Heading 
              size="md" 
              fontWeight="bold"
              bgGradient={useColorModeValue(
                'linear(to-r, blue.600, blue.400)', 
                'linear(to-r, blue.300, blue.100)'
              )}
              bgClip="text"
            >
              Moetez
            </Heading>
          </Box>
          
          {/* Desktop Navigation */}
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
  {Links.map((link) => (
    <CustomNavLink key={link.name} href={link.href}>
      {link.name}
    </CustomNavLink>
  ))}
          </HStack>
          
          {/* Right Side Actions */}
          <HStack spacing={2} alignItems="center">
            {/* Social Links */}
            <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
              {SocialLinks.map((social) => (
                <Box
                  key={social.label}
       
                >
                  <Tooltip label={social.label} hasArrow>
                    <Link 
                      href={social.href} 
                      isExternal
                      p={2}
                      rounded="full"
                      color={useColorModeValue('gray.600', 'gray.300')}
                      _hover={{
                        color: useColorModeValue('blue.600', 'blue.300')
                      }}
                    >
                      <social.icon size={20} />
                    </Link>
                  </Tooltip>
                </Box>
              ))}
            </HStack>

            {/* Color Mode Toggle */}
            <Box
        
            >
              <Tooltip label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`} hasArrow>
                <IconButton
                  onClick={toggleColorMode}
                  variant="ghost"
                  aria-label="Toggle Color Mode"
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                />
              </Tooltip>
            </Box>

            {/* Resume Download Button */}
            <Link href="/assets/resume.pdf" download>
              <Button 
                type="button" 
                leftIcon={
                  <svg viewBox="0 0 14 14" focusable="false" aria-hidden="true">
                    <path fill="currentColor" d="M11.2857,6.05714 L10.08571,4.85714 L7.85714,7.14786 L7.85714,1 L6.14286,1 L6.14286,7.14786 L3.91429,4.85714 L2.71429,6.05714 L7,10.42857 L11.2857,6.05714 Z M1,11.2857 L1,13 L13,13 L13,11.2857 L1,11.2857 Z"></path>
                  </svg>
                }
              >
                Resume
              </Button>
            </Link>
          </HStack>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {isMobile && (
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box 
            bg={useColorModeValue('white', 'gray.800')} 
            py={4} 
            shadow="md"
          >
            <VStack spacing={4} align="stretch" px={4}>
              {Links.map((link) => (
                <CustomNavLink key={link.name} href={link.href}>
                  {link.name}
                </CustomNavLink>
              ))}
              
              {/* Mobile Social Links */}
              <HStack justify="center" spacing={6} pt={4}>
                {SocialLinks.map((social) => (
                  <Link 
                    key={social.label} 
                    href={social.href} 
                    isExternal
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    <social.icon size={24} />
                  </Link>
                ))}
              </HStack>
            </VStack>
          </Box>
        </Slide>
      )}
    </Box>
  );
};

export default Navbar;
