import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  FaCode, 
  FaShieldAlt, 
  FaNetworkWired, 
  FaCloud 
} from 'react-icons/fa';

const AboutSection: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue(
    '0 4px 6px rgba(0, 0, 0, 0.1)', 
    '0 4px 6px rgba(255, 255, 255, 0.05)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.700', 'white');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');

  const AboutCards = [
    {
      icon: FaCode,
      title: 'Software Development',
      description: 'Proficient in creating robust, scalable applications using modern technologies and best practices.'
    },
    {
      icon: FaShieldAlt,
      title: 'Cybersecurity',
      description: 'Specialized in implementing comprehensive security measures and threat mitigation strategies.'
    },
    {
      icon: FaNetworkWired,
      title: 'DevSecOps',
      description: 'Integrating security practices throughout the software development lifecycle.'
    },
    {
      icon: FaCloud,
      title: 'Cloud Infrastructure',
      description: 'Expertise in designing and managing secure, efficient cloud-based solutions.'
    }
  ];

  return (
    <Box 
      as="section" 
      id="about" 
      py={20} 
      bg={bgColor}
    >
      <Container maxW="1250px">
        <VStack spacing={12} align="stretch">
          <VStack textAlign="center" spacing={4}>
            <Heading 
              as="h2" 
              size="2xl" 
              color={headingColor}
            >
              About Me
            </Heading>
            <Text 
              fontSize="xl" 
              color={textColor} 
              maxW="800px"
            >
              A dedicated Cybersecurity and DevSecOps Engineer with a passion for building secure, innovative technological solutions. 
              My approach combines technical expertise with a strategic mindset to enhance digital infrastructures and promote 
              robust software development practices.
            </Text>
          </VStack>

          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {AboutCards.map((card, index) => (
              <Box
                key={index}
                bg={cardBg}
                boxShadow={cardShadow}
                borderRadius="lg"
                p={6}
                textAlign="center"
                transition="all 0.3s ease"
                border="1px solid"
                borderColor={cardBorderColor}
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: useColorModeValue(
                    '0 10px 15px rgba(0, 0, 0, 0.15)', 
                    '0 10px 15px rgba(255, 255, 255, 0.1)'
                  )
                }}
              >
                <VStack spacing={4}>
                  <Icon 
                    as={card.icon} 
                    w={12} 
                    h={12} 
                    color={iconColor}
                  />
                  <Heading 
                    as="h3" 
                    size="md"
                    color={headingColor}
                  >
                    {card.title}
                  </Heading>
                  <Text color={textColor}>
                    {card.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutSection;
