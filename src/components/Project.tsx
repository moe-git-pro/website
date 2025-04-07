import * as React from 'react';
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
  Divider,
  Icon
} from '@chakra-ui/react';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCircle, 
  FaDocker, 
  FaTerminal, 
  FaLock, 
  FaServer 
} from 'react-icons/fa';

// Technology icon mapping
const getTechIcon = (tech: string) => {
  switch(tech.toLowerCase()) {
    case 'consul':
      return FaServer; // Using server icon for Consul
    case 'ipsec':
      return FaLock; // Using lock icon for IPSec
    case 'docker':
      return FaDocker; // Docker icon
    case 'bash/script':
      return FaTerminal; // Terminal icon for Bash/Script
    default:
      return FaCircle;
  }
};

// Real project data
const projectsData = [
  {
    title: 'Consul-IPSec-Connector',
    description: 'A reference implementation that demonstrates how to design and automate IPSec tunnels between containers in dynamic environments. It leverages Consul for service discovery and certificate management, enabling secure, encrypted communication channels without manual configuration.',
    detailedDescription: 'When two containers start, the connector provisions certificates using Consul, negotiates IPSec parameters, and establishes a secure tunnel between them — showcasing how to build a dynamic and automated IPSec infrastructure.',
    image: '/website/assets/ipsec_tunnel_consul.png',
    technologies: ['Consul', 'IPSec', 'Docker', 'Bash/Script'],
    features: [
      'Automatic IPSec tunnel creation on container startup',
      'Certificate generation and rotation powered by Consul',
      'Zero-touch configuration for secure communication',
      'Lightweight and container-friendly architecture',
      'Example code for educational and reference purposes'
    ],
    purpose: 'This project is intended as a reference implementation or starting point for designing secure container-to-container communication using IPSec and Consul. It\'s not production-ready but provides a clear example of the architecture, tooling, and automation involved.',
    architecture: 'This setup involves two containers that securely communicate with each other over an IPSec tunnel. The key components include Consul for service discovery and certificate management, and IPSec Tunnel for secure, encrypted communication between containers, managed dynamically.',
    githubUrl: 'https://github.com/Moetezafif-git/consul-ipsec-connector',
    liveUrl: '#',
  }
];

export const Projects = () => {
  // Support both light and dark modes with useColorModeValue like other sections
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.700", "white");
  const accentColor = useColorModeValue("blue.500", "blue.400");
  const tagBg = useColorModeValue("blue.50", "blue.900");
  const tagColor = useColorModeValue("blue.600", "blue.200");
  const featureBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const sectionTitleColor = useColorModeValue("blue.600", "blue.300");
  const repoButtonBg = useColorModeValue("gray.100", "gray.700");
  const repoButtonColor = useColorModeValue("gray.800", "white");
  const repoButtonHoverBg = useColorModeValue("gray.200", "gray.600");

  return (
    <Box 
      as="section" 
      id="projects" 
      py={20} 
      bg={bgColor}
    >
      <Container maxW="1250px">
        <VStack spacing={12} align="stretch">
          <VStack textAlign="center" spacing={4} mb={8}>
            <Heading 
              as="h2" 
              size="2xl" 
              color={headingColor}
            >
              My Projects
            </Heading>
            <Text 
              fontSize="xl" 
              color={textColor} 
              maxW="800px"
              mx="auto"
            >
              A showcase of my technical work, personal projects, and contributions to open-source software.
            </Text>
          </VStack>

          {projectsData.map((project, index) => (
            <Box
              key={index}
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
            >
              {/* Project Header */}
              <Flex 
                direction={{ base: "column", md: "row" }} 
                justify="space-between" 
                align="flex-start"
                p={{ base: 6, md: 8 }}
                borderBottom="1px solid"
                borderColor={borderColor}
              >
                <Box flex="1">
                  <Heading 
                    as="h3" 
                    size="xl"
                    color={headingColor}
                    mb={4}
                  >
                    {project.title}
                  </Heading>
                  
                  <Text color={textColor} fontSize="md" mb={4}>
                    {project.description}
                  </Text>
                  
                  <Text color={textColor} fontSize="md">
                    {project.detailedDescription}
                  </Text>
                </Box>
                
                <Box 
                  ml={{ base: 0, md: 6 }}
                  mt={{ base: 6, md: 0 }}
                  w={{ base: "100%", md: "50%" }}
                  minW={{ md: "400px" }}
                  borderRadius="md"
                  overflow="hidden"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    w="100%"
                    h="auto"
                    objectFit="cover"
                  />
                </Box>
              </Flex>

              {/* Key Features Section */}
              <Box p={8} bg={cardBg}>
                <Heading 
                  as="h4" 
                  size="md" 
                  mb={6} 
                  color={sectionTitleColor}
                  fontWeight="bold"
                >
                  Key Features
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {project.features.map((feature, featureIndex) => (
                    <HStack 
                      key={featureIndex}
                      p={3}
                      borderRadius="md"
                      bg={featureBg}
                      align="flex-start"
                    >
                      <Icon as={FaCircle} color={accentColor} fontSize="xs" mt={1.5} />
                      <Text color={textColor} fontSize="sm">
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Technologies Section */}
              <Box p={8} borderTop="1px solid" borderColor={borderColor} bg={cardBg}>
                <Heading 
                  as="h4" 
                  size="md" 
                  mb={4} 
                  color={sectionTitleColor}
                  fontWeight="bold"
                >
                  Technologies
                </Heading>
                
                <Flex flexWrap="wrap" gap={3}>
                  {project.technologies.map((tech, techIndex) => (
                    <Tag 
                      key={techIndex} 
                      size="md" 
                      borderRadius="md" 
                      bg={tagBg} 
                      color={tagColor} 
                      px={4}
                      py={2}
                      fontWeight="medium"
                    >
                      <Icon 
                        as={getTechIcon(tech)} 
                        mr={2} 
                        fontSize="md" 
                      />
                      {tech}
                    </Tag>
                  ))}
                </Flex>

                <Flex mt={6} gap={4} flexWrap="wrap">
                  <Button 
                    leftIcon={<FaGithub />}
                    as={Link}
                    href={project.githubUrl}
                    isExternal
                    size="md"
                    bg={repoButtonBg}
                    color={repoButtonColor}
                    _hover={{ bg: repoButtonHoverBg }}
                    borderRadius="md"
                  >
                    Repository
                  </Button>
                  <Button 
                    leftIcon={<FaExternalLinkAlt />}
                    as={Link}
                    href={project.liveUrl}
                    isExternal
                    size="md"
                    colorScheme="blue"
                    borderRadius="md"
                    isDisabled={project.liveUrl === '#'}
                  >
                    Live Demo
                  </Button>
                </Flex>
              </Box>

              {/* Purpose & Architecture Section */}
              <Box p={8} borderTop="1px solid" borderColor={borderColor} bg={cardBg}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                  <Box>
                    <Heading as="h4" size="md" mb={4} color={sectionTitleColor} fontWeight="bold">
                      Purpose
                    </Heading>
                    <Text color={textColor} fontSize="md">
                      {project.purpose}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="md" mb={4} color={sectionTitleColor} fontWeight="bold">
                      Architecture Overview
                    </Heading>
                    <Text color={textColor} fontSize="md">
                      {project.architecture}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Projects;
