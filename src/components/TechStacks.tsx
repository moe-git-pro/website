import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Image as ChakraImage,
  Grid,
  Container,
  Badge,
  Flex,
  HStack,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';
import {
  FaCode,
  FaDatabase,
  FaShieldAlt,
  FaCloud,
  FaTerminal,
  FaChartLine
} from 'react-icons/fa';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const technologies = [
  {
    name: 'Infrastructure & Cloud',
    icon: FaCloud,
    tools: [
      { name: 'Kubernetes', logoImport: () => import('../assets/images/kubernetes.png'), description: 'Container orchestration platform for scalable apps.' },
      { name: 'Docker', logoImport: () => import('../assets/images/docker.png'), description: 'Platform for developing and running containerized apps.' },
      { name: 'Helm', logoImport: () => import('../assets/images/helm.png'), description: 'The package manager for Kubernetes.' },
      { name: 'Terraform', logoImport: () => import('../assets/images/terraform.png'), description: 'Infrastructure as Code for cloud provisioning.' },
      { name: 'Consul', logoImport: () => import('../assets/images/consul.png'), description: 'Service networking and service mesh solution.' },
      { name: 'AWS', logoImport: () => import('../assets/images/aws.png'), description: 'Amazon Web Services cloud computing platform.' },
      { name: 'ArgoCD', logoImport: () => import('../assets/images/argocd.png'), description: 'GitOps continuous delivery for Kubernetes.' },
      { name: 'Envoy', logoImport: () => import('../assets/images/envoy.png'), description: 'High-performance edge and service proxy.' }
    ]
  },
  {
    name: 'Security & Compliance',
    icon: FaShieldAlt,
    tools: [
      { name: 'Hashicorp Vault', logoImport: () => import('../assets/images/hashicorp-vault.png'), description: 'Secure secrets management and encryption.' },
      { name: 'OWASP ZAP', logoImport: () => import('../assets/images/owasp-zap.png'), description: 'Active web application security scanner.' },
      { name: 'Trivy', logoImport: () => import('../assets/images/trivy.png'), description: 'Vulnerability scanner for containers and IAC.' },
      { name: 'NIST', logoImport: () => import('../assets/images/nist.png'), description: 'Industry standard cybersecurity framework.' },
      { name: 'ISO 27001', logoImport: () => import('../assets/images/iso27001.png'), description: 'Information security management standard.' },
      { name: 'SonarQube', logoImport: () => import('../assets/images/sonarqube.png'), description: 'Continuous code quality and security scanning.' },
      { name: 'Semgrep', logoImport: () => import('../assets/images/semgrep.png'), description: 'Static analysis for security and compliance.' },
      { name: 'Netskope', description: 'Cloud-native data security and access control.' }
    ]
  },
  {
    name: 'DevOps & Automation',
    icon: FaTerminal,
    tools: [
      { name: 'Jenkins', logoImport: () => import('../assets/images/jenkins.png'), description: 'Leading open source automation server.' },
      { name: 'GitHub Actions', logoImport: () => import('../assets/images/github-actions.png'), description: 'CI/CD and automation directly in GitHub.' },
      { name: 'Linux', logoImport: () => import('../assets/images/linux.png'), description: 'The foundation for server and cloud operations.' },
      { name: 'Git', logoImport: () => import('../assets/images/git.png'), description: 'Distributed version control and source management.' },
      { name: 'Ansible', logoImport: () => import('../assets/images/ansible.png'), description: 'Simple, agentless IT automation.' }
    ]
  },
  {
    name: 'Languages & Scripting',
    icon: FaCode,
    tools: [
      { name: 'Python', logoImport: () => import('../assets/images/python.png'), description: 'Versatile language for automation and security.' },
      { name: 'JavaScript', logoImport: () => import('../assets/images/javascript.png'), description: 'Core language for frontend and serverless.' },
      { name: 'Bash', logoImport: () => import('../assets/images/bash.png'), description: 'Essential scripting for Unix-like systems.' },
      { name: 'PowerShell', description: 'Cross-platform task automation and configuration.' }
    ]
  },
  {
    name: 'Observability',
    icon: FaChartLine,
    tools: [
      { name: 'Prometheus', logoImport: () => import('../assets/images/prometheus.png'), description: 'Monitoring and alerting for time-series data.' },
      { name: 'Grafana', logoImport: () => import('../assets/images/grafana.png'), description: 'Rich visualization for metrics and logs.' },
      { name: 'Elasticsearch', logoImport: () => import('../assets/images/elasticsearch.png'), description: 'Distributed search and analytics engine.' },
      { name: 'Logstash', logoImport: () => import('../assets/images/logstash.png'), description: 'Server-side data processing pipeline.' }
    ]
  },
  {
    name: 'Databases',
    icon: FaDatabase,
    tools: [
      { name: 'Postgres', logoImport: () => import('../assets/images/postgres.png'), description: 'Advanced relational database system.' },
      { name: 'MongoDB', logoImport: () => import('../assets/images/mongodb.png'), description: 'Scalable document-oriented NoSQL database.' },
      { name: 'MySQL', logoImport: () => import('../assets/images/mysql.png'), description: 'Widely used relational database manager.' }
    ]
  }
];

export const TechStacks: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [logoStates, setLogoStates] = useState<{ [key: string]: string }>({});

  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('light.border', 'dark.border');

  useEffect(() => {
    const loadLogos = async () => {
      const loaded: { [key: string]: string } = {};
      for (const category of technologies) {
        await Promise.all(category.tools.map(async (tech) => {
          if ('logoImport' in tech && tech.logoImport) {
            try {
              const mod = await tech.logoImport();
              loaded[tech.name] = mod.default;
            } catch (e) {
              console.error(`Failed to load ${tech.name}`, e);
            }
          }
        }));
      }
      setLogoStates(loaded);
    };
    loadLogos();
  }, []);

  return (
    <Box as="section" id="tech-stacks" py={24} bg={bgColor}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
              Tech Stack
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Toolbox & Technologies
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              A comprehensive collection of tools and frameworks I use to build,
              secure, and scale modern applications.
            </Text>
          </VStack>

          {/* Category Tabs */}
          <Flex
            wrap="wrap"
            justify="center"
            gap={4}
          >
            {technologies.map((cat, idx) => (
              <Box
                as="button"
                key={cat.name}
                onClick={() => setCurrentCategory(idx)}
                px={6}
                py={3}
                borderRadius="2xl"
                fontWeight="700"
                fontSize="sm"
                bg={currentCategory === idx ? accentColor : cardBg}
                color={currentCategory === idx ? 'white' : textColor}
                border="1px solid"
                borderColor={currentCategory === idx ? accentColor : borderColor}
                transition="all 0.2s"
                _hover={{
                  borderColor: accentColor,
                  transform: 'translateY(-2px)'
                }}
              >
                <HStack spacing={2}>
                  <Icon as={cat.icon} />
                  <Text>{cat.name}</Text>
                </HStack>
              </Box>
            ))}
          </Flex>

          {/* Tools Grid */}
          <AnimatePresence mode="wait">
            <MotionBox
              key={currentCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 } as any}
            >
              <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                gap={6}
              >
                {technologies[currentCategory].tools.map((tech) => (
                  <MotionBox
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    bg={cardBg}
                    p={6}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor={borderColor}
                    whileHover={{ translateY: -5, borderColor: accentColor } as any}
                  >
                    <VStack align="start" spacing={4}>
                      <Box
                        bg={useColorModeValue('gray.50', 'whiteAlpha.50')}
                        p={3}
                        borderRadius="xl"
                        h="60px"
                        w="60px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {logoStates[tech.name] ? (
                          <ChakraImage
                            src={logoStates[tech.name]}
                            alt={tech.name}
                            maxH="100%"
                            maxW="100%"
                            objectFit="contain"
                          />
                        ) : (
                          <Icon as={technologies[currentCategory].icon} color={accentColor} boxSize={6} />
                        )}
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="800" fontSize="md">{tech.name}</Text>
                        <Text fontSize="xs" color={mutedColor} lineHeight="tall">
                          {tech.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </MotionBox>
                ))}
              </Grid>
            </MotionBox>
          </AnimatePresence>
        </VStack>
      </Container>
    </Box>
  );
};
