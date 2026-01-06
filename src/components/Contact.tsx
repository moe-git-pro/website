import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, useColorModeValue } from '@chakra-ui/react';
import Footer from './Footer';

const Contact: React.FC = () => {
    const linkedInProfileUrl = 'https://www.linkedin.com/in/moetez-a-b5582221a/'; // Your LinkedIn URL
    const emailAddress = 'moetez.afif@supcom.tn'; // Your email address
    const bgColor = useColorModeValue('rgba(173, 216, 230, 0.05)', 'gray.800');
    const textColor = useColorModeValue('black', 'white');
   
    return (
        <Container maxW="1250px" px={{ base: 4, md: 8 }}>
            <Box padding={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" backgroundColor={bgColor} marginTop={8}>
                <Heading size="xl" marginBottom={4} textAlign="center" color={textColor}>Get in Touch</Heading>
                <Text textAlign="center" marginBottom={4} color={textColor}>
                    Choose how you would like to reach out:
                </Text>
                <VStack spacing={4} align="stretch">
                    <Button 
                        as="a" 
                        href={linkedInProfileUrl} 
                        target="_blank" 
                        colorScheme={useColorModeValue('blue', 'blue')} 
                        size="lg" 
                        fontSize="lg"
                    >
                        Send LinkedIn Message
                    </Button>
                    <Button 
                        as="a" 
                        href={`mailto:${emailAddress}`} 
                        colorScheme={useColorModeValue('green', 'green')} 
                        size="lg" 
                        fontSize="lg"
                    >
                        Send Email
                    </Button>
                </VStack>
            </Box>
            <Footer />
        </Container>
    );
};

export default Contact;
