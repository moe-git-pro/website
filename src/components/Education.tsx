import React, { useState } from 'react';
import {
  Box,
  VStack,
  Icon,
  Heading,
  Text,
  Flex,
  Container,
  useColorModeValue,
  Badge,
  HStack,
  Circle,
  Collapse,
  Button,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const EducationCard = ({
  institution,
  degree,
  year,
  details,
  index,
  isExpanded,
  onToggle
}: {
  institution: string;
  degree: string;
  year: string;
  details: string[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('light.border', 'dark.border');

  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 } as any}
      bg={cardBg}
      borderRadius="3xl"
      border="1px solid"
      borderColor={isExpanded ? accentColor : borderColor}
      overflow="hidden"
      p={8}
      position="relative"
      whileHover={{ shadow: 'lg' } as any}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="start" gap={6}>
        <Circle size="60px" bg={useColorModeValue('brand.50', 'whiteAlpha.100')} color={accentColor}>
          <Icon as={FaGraduationCap} w={6} h={6} />
        </Circle>

        <VStack align="start" spacing={4} flex={1}>
          <VStack align="start" spacing={1}>
            <Heading size="md" color={textColor} fontWeight="800">
              {degree}
            </Heading>
            <HStack spacing={4} wrap="wrap">
              <HStack spacing={1} color={accentColor}>
                <Text fontWeight="700" fontSize="sm">{institution}</Text>
              </HStack>
              <HStack spacing={1} color={mutedColor} fontSize="xs">
                <Icon as={FaCalendarAlt} />
                <Text fontWeight="600">{year}</Text>
              </HStack>
            </HStack>
          </VStack>

          <Collapse in={isExpanded} animateOpacity>
            <VStack align="start" spacing={2} pt={2}>
              {details.map((detail, idx) => (
                <HStack key={idx} align="start" spacing={3}>
                  <Box mt={2} w={1.5} h={1.5} borderRadius="full" bg={accentColor} flexShrink={0} />
                  <Text fontSize="sm" color={mutedColor} lineHeight="tall">
                    {detail}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Collapse>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            rightIcon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            fontSize="xs"
            color={accentColor}
            p={0}
            _hover={{ bg: 'transparent', opacity: 0.8 }}
          >
            {isExpanded ? 'Hide Details' : 'View Focus Areas'}
          </Button>
        </VStack>
      </Flex>
    </MotionBox>
  );
};

const Education: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const educationItems = [
    {
      institution: 'Higher School of Communication of Tunis (SUP\'COM)',
      degree: 'ICT Engineering Diploma',
      year: '2021 - 2024',
      details: [
        'Specialized in Cybersecurity and Network infrastructure.',
        'Core curriculum in Cloud computing and Software engineering.',
        'In-depth study of Database management and Data science.',
        'Focused on Artificial intelligence and Radio systems.',
      ],
    },
    {
      institution: 'Monastir Preparatory Engineering Institute',
      degree: 'Preparatory Cycle (Math-Physics)',
      year: '2019 - 2021',
      details: [
        'Intensive study of advanced mathematics and physics.',
        'Achieved rank 19/900 in the National Engineering School Entrance Exam.',
      ],
    },
  ];

  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');

  return (
    <Box as="section" id="education" py={24} bg={bgColor}>
      <Container maxW="container.lg">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
              Academic
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Educational Journey
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              Foundational knowledge and specialized engineering training from
              leading technical institutions.
            </Text>
          </VStack>

          <VStack spacing={6} align="stretch">
            {educationItems.map((item, index) => (
              <EducationCard
                key={index}
                {...item}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Education;
