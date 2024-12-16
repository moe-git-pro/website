import { Box, Heading, Text, VStack, Image, HStack, Button, Container, useColorModeValue } from '@chakra-ui/react';
import ProfileImage from '../assets/images/me.jpg';

const Hero = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const buttonBgColor = useColorModeValue('blue.500', 'blue.300');
  const buttonTextColor = useColorModeValue('white', 'gray.900');

  return (
    <Box 
      py={20} 
      px={8} 
      bg={bgColor}
      id="home"
    >
      <Container maxW="1250px" >
        <HStack spacing={12} align="center" justify="start">
          <VStack align="flex-start" flex={1} spacing={6}>
            <Heading 
              as="h1" 
              size="2xl"
              color={headingColor}
            >
              Hi there, I am Moetez
            </Heading>
            <Text 
              fontSize="xl" 
              color={textColor}
            >
              I'm a Cybersecurity and DevSecOps Engineer, proudly graduated from the Higher School of Communication of Tunis 🎓. My journey combines strong theoretical knowledge with hands-on expertise 💻, enabling me to enhance digital infrastructures and promote secure software development practices 🔐.
            </Text>
            <Text 
              fontSize="lg" 
              color={textColor}
            >
              With a passion for integrating cutting-edge cybersecurity measures into every phase of the development lifecycle, I focus on building resilient systems that stay ahead of emerging threats 🌐.
            </Text>
            <Text 
              fontSize="lg" 
              color={textColor}
            >
              I'm driven by the mission to safeguard digital ecosystems while fostering a culture of innovation and resilience in today's dynamic technological landscape 🚀.
            </Text>
            <Text 
              fontSize="lg" 
              color={textColor}
            >
              To simplify DevSecOps, one step at a time ✨.
            </Text>
            <HStack spacing={4} pt={4}>
              <Button 
                bg={buttonBgColor}
                color={buttonTextColor}
                size="lg"
                _hover={{
                  bg: useColorModeValue('blue.600', 'blue.400')
                }}
              >
                Get in touch
              </Button>
            </HStack>
          </VStack>


<Box 
  flex={1} 
  display="flex" 
  justifyContent="center" 
>            <Image
              src={ProfileImage}
              alt="Moetez"
              borderRadius="2xl"
              boxSize="450px"
              objectFit="cover"
              shadow="lg"
            />
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default Hero;
