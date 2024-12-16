import React, { useState, useMemo } from 'react';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Icon, 
  Flex, 
  useColorModeValue,
  Badge,
  
  Container,
  useBreakpointValue
} from '@chakra-ui/react';
import { 
  FaBriefcase, 
  FaMapMarkerAlt,
  FaCode,
} from 'react-icons/fa';
import { 
  SiKubernetes, 
  SiDocker, 
  SiHelm, 
  SiTerraform, 
  SiConsul, 
  SiVault,
  SiGooglecloud,
  SiGrafana,
  SiPrometheus,
  SiElasticsearch,
  SiLogstash,
  SiGit,
  SiGithubactions,
  SiLinux,
  SiPython,
  SiJavascript
} from 'react-icons/si';

// Create a motion-enabled Chakra component

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologies?: string[];
  icon: React.ElementType;
  color: string;
  date: Date;
}

const professionalExperiences: Experience[] = [
  {
    title: 'DevSecOps Engineer',
    company: 'Cytailor',
    location: 'Tunis, Tunisia',
    period: 'Sep 2024 – Present',
    icon: FaBriefcase,
    color: 'blue.500',
    date: new Date(2024, 8, 1),
    responsibilities: [
      'Configured and deployed HashiCorp Consul as a service mesh and service discovery solution within a Kubernetes cluster',
      'Implemented Consul Connect to secure service-to-service communication through mutual TLS',
      'Set up Consul\'s KV store for centralized configuration management',
      'Utilized Consul\'s health checking and monitoring capabilities',
      'Integrated Consul with Kubernetes for seamless workload discovery',
      'Configured Consul ACLs to enforce fine-grained permissions',
      'Automated deployment and scaling of Consul agents across nodes'
    ],
    technologies: [
      'HashiCorp Consul', 'Kubernetes', 'Service Mesh', 'Microservices', 'ACL'
    ]
  },
  {
    title: 'DevSecOps Engineer Intern',
    company: 'Cytailor',
    location: 'Tunis, Tunisia',
    period: 'Feb 2024 – Aug 2024',
    icon: FaBriefcase,
    color: 'green.500',
    date: new Date(2024, 1, 1),
    responsibilities: [
      'Streamlined CI/CD pipelines using GitOps workflow with ArgoCD, Git, Helm, Kubernetes, and Vault',
      'Automated vulnerability evaluation process by integrating external and internal factors into CVSS scoring',
      'Designed and deployed serverless architecture on AWS for risk assessment',
      'Created real-time dashboards in Grafana to visualize vulnerability risk metrics'
    ],
    technologies: [
      'ArgoCD', 'GitOps', 'Kubernetes', 'AWS Lambda', 'Grafana', 'CVSS'
    ]
  },
  {
    title: 'Junior Cybersecurity Consultant',
    company: 'Cytailor',
    location: 'Tunis, Tunisia',
    period: 'Sep 2023 – Feb 2024',
    icon: FaBriefcase,
    color: 'red.500',
    date: new Date(2023, 8, 1),
    responsibilities: [
      'Implemented activity monitoring system on Google Workspace',
      'Utilized CASB solution (GAT+) to create security policy for access control',
      'Developed automated monitoring system using Large Language Models for anomaly detection'
    ],
    technologies: [
      'CASB', 'Google Workspace', 'Large Language Models', 'Security Monitoring'
    ]
  },
  {
    title: 'SIEM Implementation Specialist',
    company: 'Cybersecurity Project',
    location: 'Tunis, Tunisia',
    period: 'Jun 2023 – Aug 2023',
    icon: FaBriefcase,
    color: 'purple.500',
    date: new Date(2023, 5, 1),
    responsibilities: [
      'Implemented SIEM system using OpenSearch, Logstash',
      'Created custom correlation rules within OpenSearch',
      'Configured real-time alerting for security incidents',
      'Integrated and fine-tuned Snort and pfSense logs'
    ],
    technologies: [
      'OpenSearch', 'Logstash', 'SIEM', 'Snort', 'pfSense'
    ]
  }
].sort((a, b) => b.date.getTime() - a.date.getTime());

const getTechnologyIcon = (technology: string) => {
  const normalizedTech = technology.toLowerCase().trim();
  const iconMap: { [key: string]: React.ComponentType } = {
    'kubernetes': SiKubernetes,
    'docker': SiDocker,
    'helm': SiHelm,
    'terraform': SiTerraform,
    'consul': SiConsul,
    'vault': SiVault,
    'aws lambda': SiGooglecloud,
    'grafana': SiGrafana,
    'prometheus': SiPrometheus,
    'elasticsearch': SiElasticsearch,
    'logstash': SiLogstash,
    'git': SiGit,
    'github actions': SiGithubactions,
    'linux': SiLinux,
    'python': SiPython,
    'javascript': SiJavascript
  };
  
  // Exact match first
  if (iconMap[normalizedTech]) {
    return iconMap[normalizedTech];
  }
  
  // Partial match
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalizedTech.includes(key)) {
      return icon;
    }
  }
  
  // Return white circle if no match
  return FaMapMarkerAlt;
};

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const activeCardBgColor = useColorModeValue('blue.50', 'blue.900');
  const detailsBgColor = useColorModeValue('gray.50', 'gray.800');

  const colors = useMemo(() => ({
    bgColor,
    textColor,
    accentColor,
    borderColor,
    cardBgColor,
    activeCardBgColor,
    detailsBgColor
  }), [bgColor, textColor, accentColor, borderColor, cardBgColor, activeCardBgColor, detailsBgColor]);

  const toggleExperience = (index: number) => {
    setActiveExperience(activeExperience === index ? null : index);
  };

  const headingColor = useColorModeValue('blue.700', 'blue.300');

  return (
    <Container maxW="1250px" px={{ base: 4, md: 8 }} margin="0 auto">
      <Box 
        id="resume"
        bg={bgColor}
        py={16}
        px={0}
        position="relative"
        overflow="hidden"
      >
        {/* Vertical Timeline Line */}
        <Box
          position="absolute"
          left="50%"
          top="200px"
          bottom="0"
          width="4px"
          bg={borderColor}
          transform="translateX(-50%)"
          display={isMobile ? 'none' : 'block'}
          zIndex={1}
          opacity={0.7}
          borderRadius="full"
        />

        <VStack spacing={8} align="stretch" pt={8}>
          <Heading 
            textAlign="center" 
            fontSize={['2xl', '3xl', '4xl']} 
            color={headingColor}
            mb={12}
          >
            Professional Experience
          </Heading>

          <Box 
            position="relative" 
             alignItems="center"
            width="full" 
            zIndex={2}
      
          >
            {professionalExperiences.map((exp, index) => (
              <Flex 
                key={exp.title}
                width="full"
                position="relative"
                justifyContent={index % 2 === 0 ? "flex-start" : "flex-end"}
                pl={index % 2 === 0 ? ["0", "50px", "100px"] : "0"}
                pr={index % 2 === 0 ? "0" : ["0", "50px", "100px"]}
                gap={[2, 4, 6]}
              >
                {/* Timeline Dot */}
                {!isMobile && (
                  <Box
                    position="absolute"
                    left="50%"
                    top="30px"
                    transform="translateX(-50%)"
                    zIndex={2}
                  >
                    <Icon 
                      as={FaMapMarkerAlt} 
                      color={exp.color} 
                      boxSize={6} 
                      opacity={0.7}
                      transition="all 0.3s ease"
                      _hover={{
                        transform: 'scale(1.2)',
                        opacity: 1
                      }}
                    />
                  </Box>
                )}

                <Box
                  width={["full", "calc(50% - 75px)"]}
                  transition={{
                    duration: '0.6s', 
                    delay: `${index * 0.2}s`,
                    type: 'spring',
                    stiffness: 'medium'
                  }}
        
                >
                  <Box
                    borderWidth="1px"
                    borderRadius="xl"
                    boxShadow="md"
                    bg={colors.cardBgColor}
                    borderColor={colors.borderColor}
                    overflow="hidden"
                    transition="all 0.3s ease"
                    _hover={{
                      borderColor: useColorModeValue('blue.300', 'blue.600'),
                      boxShadow: 'lg'
                    }}
                  >
                    <Flex 
                      p={4}
                      alignItems="center"
                      cursor="pointer"
                      onClick={() => toggleExperience(index)}
                      bg={activeExperience === index 
                        ? colors.activeCardBgColor
                        : 'transparent'
                      }
                      transition="background-color 0.3s ease"
                    >
                      <HStack spacing={4} flex={1}>
                        <Icon 
                          as={exp.icon} 
                          color={exp.color} 
                          boxSize={10} 
                          opacity={0.7}
                        />
                        <VStack align="start" spacing={1} flex={1}>
                          <Heading size="md" color={colors.textColor}>
                            {exp.title}
                          </Heading>
                          <Text 
                            fontSize="sm" 
                            color={useColorModeValue('gray.600', 'gray.400')}
                          >
                            {exp.company} | {exp.location}
                          </Text>
                        </VStack>
                        <Badge 
                          colorScheme="blue" 
                          variant="subtle"
                          transition="all 0.3s ease"
                          _hover={{
                            transform: 'scale(1.1)'
                          }}
                        >
                          {exp.period}
                        </Badge>
                      </HStack>
                    </Flex>
 
                    {activeExperience === index && (
                      <Box 
                        p={4} 
                        borderTopWidth="1px"
                        borderTopColor={colors.borderColor}
                        bg={colors.detailsBgColor}

                        transition={{ duration: '0.3s' }}
                      >
                        <VStack align="stretch" spacing={3}>
                          {exp.responsibilities.map((responsibility, respIndex) => (
                            <HStack 
                              key={respIndex} 
                              spacing={3} 
                              align="start"
                            >
                              <Icon 
                                as={FaCode} 
                                color={exp.color} 
                                boxSize={4} 
                                mt={1}
                                opacity={0.7}
                              />
                              <Text 
                                flex={1}
                                fontSize="sm"
                                color={colors.textColor}
                              >
                                {responsibility}
                              </Text>
                            </HStack>
                          ))}

                          {exp.technologies && (
                            <HStack 
                              spacing={2} 
                              mt={4} 
                              flexWrap="wrap"
                            >
                              {exp.technologies.map((tech, techIndex) => {
                                const techIcon = getTechnologyIcon(tech);

                                return (
                                  <HStack 
                                    key={techIndex} 
                                    spacing={1} 
                                    align="center"
                                    transition="all 0.3s ease"
                                    _hover={{
                                      transform: 'scale(1.1)',
                                      opacity: 1
                                    }}
                                  >
                                    <Icon 
                                      as={techIcon} 
                                      boxSize={4} 
                                      opacity={0.7}
                                      color="gray.200"
                                    />
                                    <Badge 
                                      colorScheme="purple" 
                                      variant="subtle"
                                    >
                                      {tech}
                                    </Badge>
                                  </HStack>
                                );
                              })}
                            </HStack>
                          )}
                        </VStack>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Flex>
            ))}
          </Box>      </VStack>
      </Box>
    </Container>
  );
};
