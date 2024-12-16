import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  UnorderedList,
  ListItem,
  Divider,
  Flex,
  Grid,
  GridItem,
  Container,
} from '@chakra-ui/react';
import { Experience } from './types'; // Adjust the import path based on your file structure

interface ProfessionalSectionProps {
  experiences?: Experience[];
}

const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({ experiences = [] }) => {
  console.log('Experiences passed to ProfessionalSection:', experiences);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDetails = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Container maxW="1250px" px={{ base: 4, md: 8 }} margin="0 auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Professional Experience</Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {experiences.length > 0 ? (
          experiences.map((experience, index) => (
            <GridItem key={index} borderWidth="1px" borderRadius="lg" padding={4} backgroundColor="white" boxShadow="md">
              <Flex direction="column">
                <Text fontWeight="bold">{experience.title}</Text>
                <Text>{experience.period}</Text>
                <Text color="gray.600">{experience.company}</Text>
                <UnorderedList spacing={1} marginTop={2}>
                  {experience.responsibilities?.map((responsibility, i) => (
                    <ListItem key={i}>{responsibility}</ListItem>
                  ))}
                </UnorderedList>
                <Box marginTop={2}>
                  <Text fontWeight="bold">Technologies:</Text>
                  <Text>{experience.technologies?.join(', ')}</Text>
                </Box>
              </Flex>
            </GridItem>
          ))
        ) : (
          <Text>No professional experience available.</Text>
        )}
      </Grid>
    </Container>
  );
};

export default ProfessionalSection;
