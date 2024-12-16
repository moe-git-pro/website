import React, { useState } from 'react';
import { Box, VStack, HStack, Icon, Heading, Text, Flex, UnorderedList, ListItem, Grid, GridItem, Container, Input, Textarea, Button, Center } from '@chakra-ui/react';
import { FaGraduationCap } from 'react-icons/fa';

const EducationCard = ({ institution, degree, year, details, index, selectedIndex, toggleDetails }) => {
  return (
    <Box
    maxWidth="1250px"
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="md"
      backgroundColor="white"
      borderColor="gray.200"
      alignContent="center"
      justifyContent="center"
      overflow="hidden"
      transition="all 0.3s ease"
      transform={selectedIndex === index ? 'scale(1.05)' : 'scale(1)'}
      zIndex={selectedIndex === index ? 1 : 0}
      _hover={{
        transform: 'scale(1.01)',
        boxShadow: 'xl',
      }}
    >
      <Flex padding={4} alignItems="center" cursor="pointer" onClick={() => toggleDetails(index)} flexDirection="column">
        <HStack align="start" spacing={4} flex={1}>
          <Icon as={FaGraduationCap} color="blue.500" boxSize={10} opacity={0.7} marginRight={4} />
          <VStack align="start" spacing={1} flex={1}>
            <Heading size="md">{degree}</Heading>
            <Text fontSize="sm" color="gray.600">
              {institution} | {year}
            </Text>
          </VStack>
        </HStack>
      </Flex>
      {selectedIndex === index && (
        <Box padding={4} borderTopWidth="1px" borderTopColor="gray.200" backgroundColor="gray.50">
          <UnorderedList spacing={1} fontSize="sm" color="gray.700">
            {details.map((detail, index) => (
              <ListItem key={index}>
                • {detail}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    </Box>
  );
};

const Education: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleDetails = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  const educationItems = [
    {
      institution: 'Higher School of Communication of Tunis',
      degree: 'ICT Engineering Diploma & Telecommunication',
      year: '2021 - 2024',
      details: [
        'Information and Communication Technology Engineering program focusing on:',
        'Network infrastructure',
        'Cybersecurity',
        'Cloud computing',
        'Software engineering',
        'Database management',
        'Data science',
        'Artificial intelligence',
        'Radio systems and signals',
      ],
    },
    {
      institution: 'Monastir Preparatory Engineering Institute',
      degree: 'Preparatory Cycle',
      year: '2019 - 2021',
      details: [
        'Studied the basics of mathematics and physics, achieving a rank of 19/900 in the national engineering school entrance exam.',
      ],
    },
  ];


  return (
    <VStack spacing={8} align="center" pt={8} >
      <Heading textAlign="center" fontSize={['2xl', '3xl', '4xl']} mb={12}>
        Education
      </Heading>
      <Container maxW="1250px" px={{ base: 4, md: 8 }}>
        <Flex direction="column" gap={6}>
          {educationItems.map((item, index) => (
            <Box key={item.institution} width="100%" paddingBottom={4}>
              <EducationCard 
                institution={item.institution} 
                degree={item.degree} 
                year={item.year} 
                details={item.details} 
                index={index}
                selectedIndex={selectedIndex}
                toggleDetails={toggleDetails}
              />
            </Box>
          ))}
        </Flex>
      </Container>
    </VStack>
  );
};

export default Education;
