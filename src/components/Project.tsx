import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Tag,
  Link,
  Button,
  Flex,
  Icon,
  IconButton,
  Badge,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCircle,
  FaDocker,
  FaTerminal,
  FaLock,
  FaServer,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight
} from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const normalized = tech.toLowerCase();
  if (normalized.includes('consul')) return FaServer;
  if (normalized.includes('ipsec')) return FaLock;
  if (normalized.includes('docker')) return FaDocker;
  if (normalized.includes('script') || normalized.includes('bash')) return FaTerminal;
  if (normalized.includes('kubernetes')) return FaServer;
  if (normalized.includes('gateway')) return FaServer;
  if (normalized.includes('cert-manager')) return FaLock;
  return FaCircle;
};

const projectsData = [
  {
    title: 'Envoy Gateway for Kubernetes',
    description: 'A complete Kubernetes Gateway API setup using Envoy Gateway with TLS termination and automated certificate management.',
    detailedDescription: 'This production-ready configuration demonstrates modern Kubernetes ingress patterns. It features automated TLS/SSL certificate management with cert-manager, HTTP to HTTPS redirects, and LoadBalancer service configuration with MetalLB. Includes automated deployment scripts.',
    image: '/website/envoy-gateway.png',
    technologies: ['Kubernetes', 'Envoy Gateway', 'Gateway API', 'cert-manager', 'MetalLB', 'Bash'],
    features: [
      'Gateway API (GatewayClass, HTTPRoute)',
      'Automated TLS with cert-manager',
      'HTTP to HTTPS Enforcement',
      'MetalLB LoadBalancer Setup',
      'Production-ready Namespace Isolation'
    ],
    purpose: 'Reference implementation for modern Kubernetes ingress patterns and automated infrastructure security.',
    architecture: 'Envoy Gateway manages Gateway API resources. Traffic flows through MetalLB to Envoy, with automated certificate provisioning by cert-manager using a CA Issuer.',
    githubUrl: 'https://github.com/Moetezafif-git',
    liveUrl: '#',
  },
  {
    title: 'Consul IPSec Connector',
    description: 'Automated IPSec tunnels between containers leveraging Consul for service discovery and certificate management.',
    detailedDescription: 'A reference implementation that designs and automates secure container-to-container communication. It negotiates IPSec parameters and establishes secure tunnels dynamically upon container startup, showcasing end-to-end configuration automation.',
    image: '/website/assets/ipsec_tunnel_consul.png',
    technologies: ['Consul', 'IPSec', 'Docker', 'Bash'],
    features: [
      'Automatic IPSec Tunnel Creation',
      'Consul-powered Certificate Rotation',
      'Zero-touch Security Configuration',
      'Dynamic Service Discovery Integration',
      'Lightweight Container Architecture'
    ],
    purpose: 'Educational reference for designing secure, automated container networking using established security protocols.',
    architecture: 'Two containers communicate over an IPSec tunnel managed by Consul for identity-based security and PKI-based encryption.',
    githubUrl: 'https://github.com/Moetezafif-git/consul-ipsec-connector',
    liveUrl: '#',
  }
];

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('light.border', 'dark.border');

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);

  const currentProject = projectsData[currentIndex];

  return (
    <Box as="section" id="projects" py={24} bg={bgColor}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
              Portfolio
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Featured Projects
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              A collection of technical implementations focusing on security,
              automation, and cloud-native infrastructure.
            </Text>
          </VStack>

          <Box position="relative" px={{ base: 0, lg: 16 }}>
            <AnimatePresence mode="wait">
              <MotionBox
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" } as any}
              >
                <Flex
                  direction={{ base: 'column', lg: 'row' }}
                  bg={cardBg}
                  borderRadius="3xl"
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                  shadow="xl"
                  minH="600px"
                >
                  {/* Left: Project Image */}
                  <Box flex={1} position="relative" bg="gray.100" overflow="hidden">
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      transition="transform 0.5s ease"
                      _hover={{ transform: 'scale(1.05)' }}
                    />
                    <Box
                      position="absolute"
                      top={0} left={0} right={0} bottom={0}
                      bg="blackAlpha.200"
                    />
                  </Box>

                  {/* Right: Project Details */}
                  <Flex flex={1.2} direction="column" p={{ base: 8, md: 12 }}>
                    <VStack align="stretch" spacing={6}>
                      <VStack align="start" spacing={2}>
                        <HStack justify="space-between" w="full">
                          <Heading size="lg" fontWeight="800">
                            {currentProject.title}
                          </Heading>
                          <HStack spacing={2}>
                            <IconButton
                              size="sm"
                              icon={<FaChevronLeft />}
                              aria-label="Previous"
                              variant="ghost"
                              borderRadius="full"
                              onClick={prevProject}
                            />
                            <IconButton
                              size="sm"
                              icon={<FaChevronRight />}
                              aria-label="Next"
                              variant="ghost"
                              borderRadius="full"
                              onClick={nextProject}
                            />
                          </HStack>
                        </HStack>
                        <Text color={mutedColor} fontSize="md" lineHeight="tall">
                          {currentProject.detailedDescription}
                        </Text>
                      </VStack>

                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {currentProject.features.map((feature, i) => (
                          <HStack key={i} align="center">
                            <Icon as={FaArrowRight} color={accentColor} w={3} h={3} />
                            <Text fontSize="sm" fontWeight="medium">{feature}</Text>
                          </HStack>
                        ))}
                      </SimpleGrid>

                      <Flex wrap="wrap" gap={2}>
                        {currentProject.technologies.map((tech, i) => (
                          <Tag key={i} variant="subtle" colorScheme="brand" borderRadius="full" px={3} py={1}>
                            <Icon as={getTechIcon(tech)} mr={2} boxSize={3} />
                            {tech}
                          </Tag>
                        ))}
                      </Flex>

                      <HStack spacing={4} pt={4}>
                        <Button
                          as={Link}
                          href={currentProject.githubUrl}
                          isExternal
                          variant="solid"
                          leftIcon={<FaGithub />}
                        >
                          View Repository
                        </Button>
                        <Button
                          as={Link}
                          href={currentProject.liveUrl}
                          isExternal
                          variant="outline"
                          isDisabled={currentProject.liveUrl === '#'}
                          leftIcon={<FaExternalLinkAlt />}
                        >
                          Live Demo
                        </Button>
                      </HStack>
                    </VStack>
                  </Flex>
                </Flex>
              </MotionBox>
            </AnimatePresence>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Projects;
