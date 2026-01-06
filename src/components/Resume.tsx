import React, { useState } from 'react';
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
  Circle,
  Button,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCode,
  FaChevronDown,
  FaChevronUp
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

const MotionFlex = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  Keywords?: string[];
  icon: React.ElementType;
  color: string;
  date: Date;
}

const professionalExperiences: Experience[] = [
  {
    title: 'Technical Team',
    company: 'Hackfest',
    location: 'Tunis, Tunisia',
    period: 'Mar 2023 – Jun 2023',
    icon: FaBriefcase,
    color: 'orange.500',
    date: new Date(2023, 2, 1),
    responsibilities: [
      'Preparing challenges for the CTF competition (Web Exploitation, Cryptography)'
    ],
    Keywords: [
      'CTF', 'Web Exploitation', 'Cryptography'
    ]
  },
  {
    title: 'Internship',
    company: '6NLG(2SB) - SUP’COM',
    location: 'Tunis, Tunisia',
    period: 'Sep 2023 – Present',
    icon: FaBriefcase,
    color: 'green.500',
    date: new Date(2023, 8, 1),
    responsibilities: [
      'Secured cloud services using Reverse Proxy and Cloud Access Security Broker (CASB) solutions.',
      'Implemented robust cloud security, data protection, and access control leveraging Netskope CASB, SWG, and ZTNA technologies.',
      'Developed, enforced, and monitored security policies to ensure compliance, reduce risk, and protect sensitive data.'
    ],
    Keywords: [
      'Reverse Proxy', 'CASB', 'Netskope', 'SWG', 'ZTNA', 'Cloud Security'
    ]
  },
  {
    title: 'DevSecOps Engineer',
    company: 'Cytailor',
    location: 'Tunis, Tunisia',
    period: 'Jul 2023 – Present',
    icon: FaBriefcase,
    color: 'blue.500',
    date: new Date(2023, 6, 1),
    responsibilities: [
      'Designed and deployed secure CI/CD pipelines for 7+ microservices on Amazon EKS using GitHub Actions, ArgoCD, Helm, and Git, integrating Semgrep (SAST), Trivy (container scanning), and OWASP ZAP (DAST), achieving ~90% compliance with the DoD DevSecOps Playbook.',
      'Accelerated deployments by 40% and reduced pipeline failures by 25% through GitOps practices, continuous drift detection, and automated secrets management with HashiCorp Vault.',
      'Centralized credential handling using Vault and Vault Secrets Injection (Vault SCI), eliminating hardcoded secrets and enforcing secure, automated secrets distribution across microservices.',
      'Led the migration of multiple microservices from AWS to OVH, contributing to the design of a scalable, reliable, and secure infrastructure architecture.',
      'Deployed and operated HashiCorp Consul across multi-cluster Kubernetes environments on AWS (EKS) and OVH, reducing microservice latency by 30% and enforcing mTLS, RBAC, and ACL-based security.',
      'Designed and enforced Consul ACL policies with least-privilege access control, improving cluster security and compliance posture.',
      'Participated in a security consulting engagement for a French client, improving security posture through policy enforcement and governance controls.',
      'Designed and implemented a lightweight automated mini-SOC using Make automation and Google GAT+, enabling continuous monitoring and security reporting.',
      'Built an automated reporting mechanism delivering weekly summaries of high-risk or non-compliant activities for administrative review, aligned with organizational data protection policies.',
      'Conducted a workshop for a French 5G client on microservices security, covering secure API gateway configuration, HashiCorp Consul implementation, and best practices for securing their Dockerized 5G environment.',
      'Led DevSecOps security consulting for a French 5G organization, securing Docker and Kubernetes architectures with HashiCorp Consul for PKI, automated certificate management, and mTLS.',
      'Developed a cybersecurity knowledge base using a Retrieval-Augmented Generation (RAG) architecture, generating vector embeddings with Amazon Bedrock and storing them in Amazon Aurora PostgreSQL with pgvector to enable LLM-powered semantic search and querying.'
    ],
    Keywords: [
      'Amazon EKS', 'GitHub Actions', 'ArgoCD', 'Helm', 'Semgrep', 'Trivy', 'OWASP ZAP', 'Hashicorp Vault', 'GitOps', 'HashiCorp Consul', 'mTLS', 'RBAC', 'ACL', 'AWS', 'OVH', 'Docker', 'Kubernetes', 'Amazon Bedrock', 'Amazon Aurora', 'pgvector', 'RAG'
    ]
  }
];

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

  if (iconMap[normalizedTech]) return iconMap[normalizedTech];
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalizedTech.includes(key)) return icon;
  }
  return FaCode;
};

export const Resume: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState<number | null>(0);

  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const borderColor = useColorModeValue('light.border', 'dark.border');
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const accentColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <Box id="resume" bg={bgColor} py={24}>
      <Container maxW="container.lg">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
              Journey
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Professional Experience
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              My career path in Cybersecurity and DevSecOps, focusing on building
              secure, scalable, and resilient digital architectures.
            </Text>
          </VStack>

          <Box position="relative">
            {/* Timeline Line */}
            <Box
              position="absolute"
              left={{ base: "20px", md: "50%" }}
              top="0"
              bottom="0"
              width="2px"
              bg={borderColor}
              transform={{ base: "none", md: "translateX(-50%)" }}
              zIndex={0}
            />

            <VStack spacing={12} align="stretch" position="relative" zIndex={1}>
              {professionalExperiences.map((exp, index) => (
                <MotionFlex
                  key={`${exp.company}-${index}`}
                  display="flex"
                  flexDirection={{ base: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
                  alignItems="flex-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 } as any}
                >
                  {/* Timeline Dot */}
                  <Circle
                    size="40px"
                    bg={cardBg}
                    border="2px solid"
                    borderColor={accentColor}
                    position="absolute"
                    left={{ base: "0", md: "50%" }}
                    transform={{ base: "none", md: "translateX(-50%)" }}
                    zIndex={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="sm"
                  >
                    <Icon as={exp.icon} color={accentColor} w={4} h={4} />
                  </Circle>

                  {/* Spacer for Desktop Timeline */}
                  <Box flex={1} display={{ base: 'none', md: 'block' }} />

                  {/* Content Card */}
                  <Box
                    flex={1}
                    ml={{ base: 12, md: index % 2 === 0 ? 12 : 0 }}
                    mr={{ base: 0, md: index % 2 === 0 ? 0 : 12 }}
                  >
                    <MotionBox
                      bg={cardBg}
                      p={6}
                      borderRadius="2xl"
                      border="1px solid"
                      borderColor={borderColor}
                      boxShadow="sm"
                      whileHover={{ translateY: -5, boxShadow: 'lg' } as any}
                      transition={{ duration: 0.3 } as any}
                    >
                      <VStack align="stretch" spacing={4}>
                        <Flex justify="space-between" align="start" wrap="wrap" gap={2}>
                          <VStack align="start" spacing={1}>
                            <Heading size="md" fontWeight="bold">
                              {exp.title}
                            </Heading>
                            <HStack color={accentColor} spacing={2}>
                              <Text fontWeight="600">{exp.company}</Text>
                              <Text fontSize="xs">•</Text>
                              <HStack spacing={1} color={mutedColor}>
                                <Icon as={FaMapMarkerAlt} w={3} h={3} />
                                <Text fontSize="xs">{exp.location}</Text>
                              </HStack>
                            </HStack>
                          </VStack>
                          <Badge colorScheme="brand" variant="outline" borderRadius="full" px={3}>
                            {exp.period}
                          </Badge>
                        </Flex>

                        <VStack align="stretch" spacing={3}>
                          {exp.responsibilities.slice(0, activeExperience === index ? undefined : 3).map((resp, i) => (
                            <HStack key={i} align="start" spacing={3}>
                              <Icon as={FaCode} color={accentColor} mt={1} w={3} h={3} />
                              <Text fontSize="sm" color={textColor} lineHeight="tall">
                                {resp}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>

                        {exp.responsibilities.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveExperience(activeExperience === index ? null : index)}
                            rightIcon={activeExperience === index ? <FaChevronUp /> : <FaChevronDown />}
                            alignSelf="flex-start"
                            fontSize="xs"
                            color={accentColor}
                          >
                            {activeExperience === index ? 'Show Less' : `Show ${exp.responsibilities.length - 3} More Items`}
                          </Button>
                        )}

                        {exp.Keywords && (
                          <Flex wrap="wrap" gap={2} pt={2}>
                            {exp.Keywords.map((tech, i) => {
                              const TechIcon = getTechnologyIcon(tech);
                              return (
                                <HStack
                                  key={i}
                                  bg={useColorModeValue('gray.50', 'whiteAlpha.50')}
                                  px={2}
                                  py={1}
                                  borderRadius="md"
                                  border="1px solid"
                                  borderColor={borderColor}
                                >
                                  <Icon as={TechIcon} w={3} h={3} color={mutedColor} />
                                  <Text fontSize="2xs" fontWeight="bold" color={mutedColor}>
                                    {tech}
                                  </Text>
                                </HStack>
                              );
                            })}
                          </Flex>
                        )}
                      </VStack>
                    </MotionBox>
                  </Box>
                </MotionFlex>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
