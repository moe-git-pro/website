import React, { useState, useRef, forwardRef, useMemo, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  VStack, 
  HStack,
  Button,
  useBreakpointValue,
  Tooltip,
  IconButton,
  Container,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Image as ChakraImage,
  ImageProps,
  Wrap,
  WrapItem,
  useColorMode,
  Tag,
  TagLabel,
  Grid,
  Circle
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronLeft, FaChevronRight, FaCode, FaDatabase, FaShieldAlt, FaCloud, FaTerminal, FaChartLine } from 'react-icons/fa';
import { SiPrometheus, SiGrafana, SiElasticsearch, SiLogstash, SiFluentd } from 'react-icons/si';

const TechCard: React.FC<{
  name: string, 
  logoSrc?: string, 
  description: string, 
  category: string
}> = ({ name, logoSrc, description, category }) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue(
    'white', 
    'gray.900'
  );
  const cardBgColor = useColorModeValue(
    'gray.100', 
    'gray.700'
  );
  const iconColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  const categoryIcons = {
    'Cloud & Infrastructure Orchestration': FaCode,
    'Security & Compliance': FaShieldAlt,
    'Database & Storage': FaDatabase
  };

  const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons] || FaCode;

  return (
    <motion.div

      whileHover={{ 
        scale: 1.05, 
        rotate: 2,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        bg={cardBgColor}
        borderRadius="lg"
        p={[2, 3, 4]}
        boxShadow="md"
        border="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        textAlign="center"
        height="100%"
        position="relative"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: 'lg',
          borderColor: useColorModeValue('gray.300', 'gray.600')
        }}
      >
        {/* Category Icon */}
        <Box 
          position="absolute" 
          top={2} 
          right={2} 
          color={iconColor}
          opacity={0.5}
        >
          <CategoryIcon size={20} />
        </Box>

        {/* Technology Logo */}
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          mb={3} 
          height={[50, 70, 90]}
        >
          {logoSrc ? (
            <ChakraImage 
              src={logoSrc} 
              alt={`${name} logo`} 
              maxHeight={[50, 70, 90]} 
              maxWidth={[50, 70, 90]} 
              objectFit="contain"
            />
          ) : (
            <Icon 
              as={CategoryIcon} 
              boxSize={[8, 10, 12]} 
              color={iconColor} 
            />
          )}
        </Box>

        {/* Technology Details */}
        <VStack spacing={1}>
          <Text 
            fontWeight="bold" 
            fontSize={['sm', 'md']} 
            mb={1}
          >
            {name}
          </Text>
          <Text 
            fontSize={['xs', 'sm']} 
            color={textColor} 
            noOfLines={2}
          >
            {description}
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

const technologies = [
  {
    name: 'Cloud & Infrastructure Orchestration',
    description: 'Advanced container and cloud management technologies',
    tools: [
      { 
        name: 'Kubernetes', 
        logoImport: () => import('../assets/images/kubernetes.png'),
        description: 'Container orchestration platform for automating deployment, scaling, and management of containerized applications.'
      },
      { 
        name: 'Docker', 
        logoImport: () => import('../assets/images/docker.png'),
        description: 'Containerization platform that enables developers to package, distribute, and run applications in isolated environments.'
      },
      { 
        name: 'Helm', 
        logoImport: () => import('../assets/images/helm.png'),
        description: 'Package manager for Kubernetes that simplifies deployment of complex applications.'
      },
      { 
        name: 'Terraform', 
        logoImport: () => import('../assets/images/terraform.png'),
        description: 'Infrastructure as Code tool for provisioning and managing cloud resources.'
      },
      { 
        name: 'Consul', 
        logoImport: () => import('../assets/images/consul.png'),
        description: 'Service networking solution to connect and configure services across any runtime platform.'
      },
      { 
        name: 'AWS', 
        description: 'Amazon Web Services, a comprehensive cloud computing platform.' 
      },
      { 
        name: 'ArgoCD', 
        description: 'A declarative, GitOps continuous delivery tool for Kubernetes.' 
      },
    ]
  },
  {
    name: 'Security & Compliance',
    description: 'Advanced security and compliance tools',
    tools: [
      { 
        name: 'Hashicorp Vault', 
        logoImport: () => import('../assets/images/hashicorp-vault.png'),
        description: 'Tool for securely accessing secrets like API keys, passwords, and certificates.'
      },
      { 
        name: 'OWASP ZAP', 
        logoImport: () => import('../assets/images/owasp-zap.png'),
        description: 'Web application security scanner used to find vulnerabilities in web applications.'
      },
      { 
        name: 'Trivy', 
        logoImport: () => import('../assets/images/trivy.png'),
        description: 'Comprehensive security scanner for containers and other artifacts.'
      },
      { 
        name: 'NIST', 
        logoImport: () => import('../assets/images/nist.png'),
        description: 'Cybersecurity framework for improving critical infrastructure cybersecurity.'
      },
      { 
        name: 'ISO 27001', 
        logoImport: () => import('../assets/images/iso27001.png'),
        description: 'International standard for information security management systems.'
      },
      { 
        name: 'SonarQube', 
        description: 'Continuous inspection tool for code quality and security.' 
      },
      { 
        name: 'Semgrep', 
        description: 'Static analysis tool for finding bugs and enforcing coding standards.' 
      },
      { 
        name: 'Netskope', 
        description: 'Cloud security platform for protecting data and users.' 
      },
    ]
  },
  {
    name: 'Continuous Integration & Deployment',
    description: 'Automation and workflow management tools',
    tools: [
      { 
        name: 'Jenkins', 
        logoImport: () => import('../assets/images/jenkins.png'),
        description: 'Open-source automation server for building, testing, and deploying software.'
      },
      { 
        name: 'GitHub Actions', 
        logoImport: () => import('../assets/images/github-actions.png'),
        description: 'Workflow automation and CI/CD directly within GitHub repositories.'
      },
      { 
        name: 'Linux', 
        logoImport: () => import('../assets/images/linux.png'),
        description: 'Open-source operating system crucial for DevOps and server management.'
      },
      { 
        name: 'Git', 
        logoImport: () => import('../assets/images/git.png'),
        description: 'Distributed version control system for tracking changes in source code.'
      },
    ]
  },
  {
    name: 'Automation & Scripting',
    description: 'Tools for automation and scripting',
    tools: [
      { 
        name: 'PowerShell', 
        description: 'Task automation and configuration management framework from Microsoft.' 
      },
      { 
        name: 'Ansible', 
        logoImport: () => import('../assets/images/ansible.png'),
        description: 'Automation tool for configuration management, application deployment, and task automation.'
      },
    ]
  },
  {
    name: 'Monitoring & Observability',
    description: 'Performance tracking and system insights',
    tools: [
      { 
        name: 'Prometheus', 
        logoImport: () => import('../assets/images/prometheus.png'),
        description: 'Open-source monitoring and alerting toolkit designed for reliability and scalability.'
      },
      { 
        name: 'Grafana', 
        logoImport: () => import('../assets/images/grafana.png'),
        description: 'Multi-platform analytics and interactive visualization web application.'
      },
      { 
        name: 'Elasticsearch', 
        logoImport: () => import('../assets/images/elasticsearch.png'),
        description: 'Distributed, RESTful search and analytics engine capable of addressing a growing number of use cases.'
      },
      { 
        name: 'Logstash', 
        logoImport: () => import('../assets/images/logstash.png'),
        description: 'Server-side data processing pipeline that ingests data from multiple sources simultaneously.'
      },
      { 
        name: 'Fluentd', 
        logoImport: () => import('../assets/images/fluentd.png'),
        description: 'Open-source data collector for unifying data processing and analytics.'
      },
      { 
        name: 'Beats', 
        logoImport: () => import('../assets/images/beats.png'),
        description: 'Lightweight data shippers for sending data from edge machines to Logstash or Elasticsearch.'
      },
      { 
        name: 'GAT+', 
        logoImport: () => import('../assets/images/gat-plus.png'),
        description: 'Advanced monitoring and analytics tool for comprehensive system insights.'
      },
    ]
  },
  {
    name: 'Database & Storage Solutions',
    description: 'Versatile data management and storage technologies',
    tools: [
      { 
        name: 'MySQL', 
        logoImport: () => import('../assets/images/mysql.png'),
        description: 'Popular open-source relational database management system.'
      },
      { 
        name: 'MongoDB', 
        logoImport: () => import('../assets/images/mongodb.png'),
        description: 'Document-oriented NoSQL database for scalable and flexible data storage.'
      },
      { 
        name: 'Postgres', 
        logoImport: () => import('../assets/images/postgres.png'),
        description: 'Advanced open-source relational database with robust feature set.'
      },
      { 
        name: 'Firebase', 
        logoImport: () => import('../assets/images/firebase.png'),
        description: 'Comprehensive app development platform with real-time database and backend services.'
      },
    ]
  },
  {
    name: 'Programming & Scripting Languages',
    description: 'Versatile programming skills across multiple domains',
    tools: [
      { 
        name: 'Python', 
        logoImport: () => import('../assets/images/python.png'),
        description: 'High-level, interpreted programming language known for its versatility and readability.'
      },
      { 
        name: 'JavaScript', 
        logoImport: () => import('../assets/images/javascript.png'),
        description: 'Lightweight, interpreted programming language for web development.'
      },
      { 
        name: 'Bash', 
        logoImport: () => import('../assets/images/bash.png'),
        description: 'Unix shell and command language for automation and scripting.'
      },
      { 
        name: 'PHP', 
        logoImport: () => import('../assets/images/php.png'),
        description: 'Server-side scripting language designed for web development.'
      },
      { 
        name: 'C++', 
        logoImport: () => import('../assets/images/cpp.png'),
        description: 'High-performance programming language used in system/software development.'
      },
      { 
        name: 'Dart', 
        logoImport: () => import('../assets/images/dart.png'),
        description: 'Programming language optimized for building mobile, desktop, server, and web applications.'
      },
    ]
  }
];

const categoryDetails = [
  {
    name: 'Cloud & Infrastructure Orchestration',
    icon: FaCloud,
    color: 'blue.500'
  },
  {
    name: 'Security & Compliance',
    icon: FaShieldAlt,
    color: 'red.500'
  },
  {
    name: 'Automation & Scripting',
    icon: FaTerminal,
    color: 'green.500'
  },
  {
    name: 'Continuous Integration & Deployment',
    icon: FaTerminal,
    color: 'green.500'
  },
  {
    name: 'Monitoring & Observability',
    icon: FaChartLine,
    color: 'blue.500'
  },
  {
    name: 'Database & Storage Solutions',
    icon: FaDatabase,
    color: 'blue.500'
  },
  {
    name: 'Programming & Scripting Languages',
    icon: FaCode,
    color: 'blue.500'
  }
];

export const TechStacks: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [logoStates, setLogoStates] = useState<{ [key: string]: string | undefined }>({});
  
  const loadLogo = async (logoImport?: () => Promise<{ default: string }>) => {
    if (!logoImport) return undefined;
    try {
      const logo = await logoImport();
      return logo.default;
    } catch (error) {
      console.error(`Logo import failed for: ${logoImport.toString()}`, error);
      return undefined;
    }
  };

  useEffect(() => {
    const loadAllLogos = async () => {
      const loadedLogos: { [key: string]: string | undefined } = {};
      
      for (const category of technologies) {
        for (const tech of category.tools) {
          if (tech.logoImport) {
            try {
              const logo = await loadLogo(tech.logoImport);
              if (logo) {
                loadedLogos[tech.name] = logo;
              }
            } catch (error) {
              console.error(`Failed to load logo for ${tech.name}`, error);
            }
          }
        }
      }
      
      setLogoStates(loadedLogos);
    };

    loadAllLogos();
  }, []);

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const iconColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const headingColor = useColorModeValue('blue.700', 'blue.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <Box 
      id="technical-stacks"
      bg={bgColor}
      py={16}
      px={[4, 8, 16]}
      display="flex" 
      alignItems="center" 
      justifyContent="center"       
    >
      <VStack spacing={8} align="stretch" maxWidth="1250px" >
        <Heading 
          textAlign="center" 
          fontSize={['2xl', '3xl', '4xl']} 
          mb={6}
          color={useColorModeValue('blue.700', 'blue.300')}
        >
          Technology Expertise
        </Heading>

        {/* Category Selector */}
        <Box 
          position="relative"
        >
          <IconButton 
            icon={<FaChevronLeft />} 
            aria-label="Scroll Left" 
            position="absolute" 
            left={0} 
            top="50%" 
            transform="translateY(-50%)" 
            onClick={() => sliderRef.current?.scrollBy({ left: -100, behavior: 'smooth' })} 
            variant="ghost" 
            color={iconColor}
          />
          <IconButton 
            icon={<FaChevronRight />} 
            aria-label="Scroll Right" 
            position="absolute" 
            right={0} 
            top="50%" 
            transform="translateY(-50%)" 
            onClick={() => sliderRef.current?.scrollBy({ left: 100, behavior: 'smooth' })} 
            variant="ghost" 
            color={iconColor}
          />
          <Box 
            ref={sliderRef}
            position="relative"
            overflowX="auto"
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {technologies.map((category, index) => (
              <Box
                key={category.name}
                as="button"
                draggable="true"
                onClick={() => setCurrentCategory(index)}
                px={4}
                py={2}
                borderRadius="full"
                fontWeight="semibold"
                fontSize="sm"
                bg={currentCategory === index ? 'blue.500' : 'gray.200'}
                color={currentCategory === index ? 'white' : 'black'}
                style={{ flex: '1 1 150px', margin: '5px' }}
              >
                {category.name}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Technology Cards */}
        <Grid 
          templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} 
          gap={[2, 4, 6]}
        >
          {technologies[currentCategory].tools.map((tech) => {
            const CategoryIcon = categoryDetails[currentCategory].icon;
            return (
              <Box
                key={tech.name}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="lg"
                p={[2, 3, 4]}
                boxShadow="md"
                border="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                textAlign="center"
                height="100%"
                position="relative"
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'lg',
                  borderColor: useColorModeValue('gray.300', 'gray.600')
                }}
              >
                {/* Category Icon */}
                <Box 
                  position="absolute" 
                  top={2} 
                  right={2} 
                  color={iconColor}
                  opacity={0.5}
                >
                  <CategoryIcon size={20} />
                </Box>

                {/* Technology Logo */}
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center" 
                  mb={3} 
                  height={[50, 70, 90]}
                >
                  {logoStates[tech.name] ? (
                    <ChakraImage 
                      src={logoStates[tech.name]} 
                      alt={`${tech.name} logo`} 
                      maxHeight={[50, 70, 90]} 
                      maxWidth={[50, 70, 90]} 
                      objectFit="contain"
                    />
                  ) : (
                    <Icon 
                      as={CategoryIcon} 
                      boxSize={[8, 10, 12]} 
                      color={iconColor} 
                    />
                  )}
                </Box>

                {/* Technology Details */}
                <VStack spacing={1}>
                  <Text 
                    fontWeight="bold" 
                    fontSize={['sm', 'md']} 
                    mb={1}
                  >
                    {tech.name}
                  </Text>
                  <Text 
                    fontSize={['xs', 'sm']} 
                    color={textColor} 
                    noOfLines={2}
                  >
                    {tech.description}
                  </Text>
                </VStack>
              </Box>
            );
          })}
        </Grid>
      </VStack>
    </Box>
  );
};
