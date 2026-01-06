import * as React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Badge,
  Flex,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import {
  FaCode,
  FaShieldAlt,
  FaNetworkWired,
  FaCloud
} from 'react-icons/fa';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const AboutSection: React.FC = () => {
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('light.border', 'dark.border');

  const AboutCards = [
    {
      icon: FaShieldAlt,
      title: 'Cybersecurity',
      description: 'Implementing robust security measures and incident response strategies to protect digital assets.'
    },
    {
      icon: FaNetworkWired,
      title: 'DevSecOps',
      description: 'Shifting security left by integrating automated controls into CI/CD pipelines and infrastructure.'
    },
    {
      icon: FaCloud,
      title: 'Cloud Security',
      description: 'Designing secure, resilient cloud architectures leveraging AWS, OVH, and modern networking.'
    },
    {
      icon: FaCode,
      title: 'Secure Coding',
      description: 'Building scalable applications with a security-first mindset and automated vulnerability analysis.'
    }
  ];

  return (
    <Box as="section" id="about" py={32} bg={useColorModeValue('light.bg', 'dark.bg')}>
      <Container maxW="container.xl">
        <VStack spacing={20} align="stretch">
          <Flex direction={{ base: 'column', lg: 'row' }} gap={12} align="center">
            <VStack align={{ base: 'center', lg: 'start' }} flex={1} spacing={6}>
              <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
                Background
              </Badge>
              <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="800" textAlign={{ base: 'center', lg: 'start' }}>
                Bridging Security and <Text as="span" color={accentColor}>Innovation</Text>.
              </Heading>
              <Text fontSize="lg" color={mutedColor} textAlign={{ base: 'center', lg: 'start' }} lineHeight="tall">
                I am a Cybersecurity and DevSecOps Engineer with a mission to simplify security.
                My approach is not just about building walls, but about building
                <Text as="span" fontWeight="bold" color={textColor}> resilient, automated ecosystems</Text> that
                empower developers while keeping global infrastructures safe.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} flex={1.2}>
              {AboutCards.map((card, index) => (
                <MotionBox
                  key={index}
                  bg={cardBg}
                  p={8}
                  borderRadius="3xl"
                  border="1px solid"
                  borderColor={borderColor}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 } as any}
                  whileHover={{ translateY: -5, borderColor: accentColor } as any}
                >
                  <VStack align="start" spacing={4}>
                    <Icon as={card.icon} w={8} h={8} color={accentColor} />
                    <Heading size="md" fontWeight="bold">
                      {card.title}
                    </Heading>
                    <Text color={mutedColor} fontSize="sm">
                      {card.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutSection;
