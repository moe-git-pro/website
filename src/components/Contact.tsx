import React from 'react';
import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';

const Contact: React.FC = () => {
    const linkedInProfileUrl = 'https://www.linkedin.com/in/moetez-a-b5582221a/'; // Your LinkedIn URL
    const emailAddress = 'moetez.afif@supcom.tn'; // Your email address

    return (
        <Container maxW="1250px" px={{ base: 4, md: 8 }}>
            <Box padding={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" backgroundColor="gray.50" marginTop={8}>
                <Heading size="xl" marginBottom={4} textAlign="center">Get in Touch</Heading>
                <Text textAlign="center" marginBottom={4}>
                    Choose how you would like to reach out:
                </Text>
                <VStack spacing={4} align="stretch">
                    <Button 
                        as="a" 
                        href={linkedInProfileUrl} 
                        target="_blank" 
                        colorScheme="blue" 
                        size="lg" 
                        fontSize="lg"
                    >
                        Send LinkedIn Message
                    </Button>
                    <Button 
                        as="a" 
                        href={`mailto:${emailAddress}`} 
                        colorScheme="green" 
                        size="lg" 
                        fontSize="lg"
                    >
                        Send Email
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default Contact;
