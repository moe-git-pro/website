import * as React from 'react';

import {
  Box,
  Flex,
  VStack,
  HStack,
  Link,
  Button,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Tooltip,
  useColorMode,
  Slide,
  Image,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, DownloadIcon } from '@chakra-ui/icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import homepageImage from '../assets/images/favicon.png';

const CustomNavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const hoverColor = useColorModeValue('brand.600', 'brand.300');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Link
      href={href}
      fontSize="sm"
      fontWeight="600"
      color={textColor}
      textDecoration="none"
      _hover={{
        textDecoration: 'none',
        color: hoverColor,
        transform: 'translateY(-1px)'
      }}
      _active={{ color: hoverColor }}
      transition="all 0.2s ease"
      py={2}
      px={3}
      position="relative"
    >
      {children}
    </Link>
  );
};

const SocialLinks = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/moetezafif-git', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/moetez-a-b5582221a/', label: 'LinkedIn' },
  ];

  return (
    <HStack spacing={3}>
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <Tooltip key={label} label={label} hasArrow>
          <IconButton
            as={Link}
            href={href}
            isExternal
            aria-label={label}
            icon={<Icon size="18px" />}
            variant="ghost"
            borderRadius="full"
            _hover={{
              bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
              transform: 'translateY(-2px)'
            }}
          />
        </Tooltip>
      ))}
    </HStack>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navBackground = useColorModeValue(
    isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
    isScrolled ? 'rgba(10, 10, 12, 0.8)' : 'transparent'
  );
  const borderColor = useColorModeValue(
    isScrolled ? 'gray.200' : 'transparent',
    isScrolled ? 'whiteAlpha.100' : 'transparent'
  );

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Links = [
    { name: 'About', href: '#about' },
    { name: 'Articles', href: '#medium' },
    { name: 'Tech Stacks', href: '#tech-stacks' },
    { name: 'Resume', href: '#resume' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      width="full"
      zIndex={1000}
      bg={navBackground}
      borderBottom="1px solid"
      borderColor={borderColor}
      backdropFilter={isScrolled ? 'blur(12px)' : 'none'}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Container maxW="container.xl" h={20}>
        <Flex h="full" alignItems="center" justifyContent="space-between">
          {/* Logo or Branding */}
          <Link href="/" _hover={{ transform: 'scale(1.05)' }} transition="transform 0.2s">
            <Image src={homepageImage} alt="Home" boxSize="50px" borderRadius="xl" />
          </Link>

          {/* Desktop Menu */}
          <HStack spacing={2} as="nav" display={{ base: 'none', lg: 'flex' }}>
            {Links.map(link => (
              <CustomNavLink key={link.name} href={link.href}>
                {link.name}
              </CustomNavLink>
            ))}
          </HStack>

          {/* Actions */}
          <HStack spacing={3}>
            <Box display={{ base: 'none', sm: 'block' }}>
              <SocialLinks />
            </Box>

            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle Color Mode"
              variant="ghost"
              borderRadius="full"
            />

            <Button
              as={Link}
              href="assets/resume.pdf"
              download
              leftIcon={<DownloadIcon />}
              variant="solid"
              size="sm"
              px={6}
            >
              Resume
            </Button>

            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Toggle Navigation"
              onClick={isOpen ? onClose : onOpen}
              display={{ lg: 'none' }}
              variant="ghost"
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Menu */}
      <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          w="full"
          h="100vh"
          bg={useColorModeValue('white', 'dark.bg')}
          pt={24}
          px={6}
        >
          <VStack spacing={6} alignItems="flex-start">
            {Links.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                fontSize="2xl"
                fontWeight="bold"
                _hover={{ color: 'brand.500' }}
              >
                {link.name}
              </Link>
            ))}
            <Box pt={4}>
              <SocialLinks />
            </Box>
          </VStack>
        </Box>
      </Slide>
    </Box>
  );
};

export default Navbar;
