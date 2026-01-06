import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Container,
  useColorModeValue,
  Flex,
  Icon,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import ProfileImage from '../assets/images/me.jpg';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Hero = () => {
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');

  return (
    <Box
      id="home"
      position="relative"
      pt={{ base: 32, md: 48 }}
      pb={{ base: 20, md: 32 }}
      bg={bgColor}
      overflow="hidden"
    >
      {/* Background Orbs */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="500px"
        h="500px"
        bg="brand.500"
        filter="blur(150px)"
        opacity={useColorModeValue(0.05, 0.1)}
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-5%"
        w="400px"
        h="400px"
        bg="purple.500"
        filter="blur(150px)"
        opacity={useColorModeValue(0.05, 0.1)}
        borderRadius="full"
        zIndex={0}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: 'column-reverse', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={12}
        >
          <MotionBox
            display="flex"
            flexDirection="column"
            alignItems={{ base: 'center', lg: 'flex-start' }}
            flex={1}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
          >
            <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={4}>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                lineHeight="shorter"
                textAlign={{ base: 'center', lg: 'left' }}
                fontWeight="800"
              >
                Safeguarding the <Text as="span" color={accentColor}>Future</Text> <br />
                of DevSecOps.
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={mutedColor}
                maxW="600px"
                textAlign={{ base: 'center', lg: 'left' }}
                lineHeight="tall"
              >
                Hi, I'm <Text as="span" fontWeight="bold" color={textColor}>Moetez</Text>.
                A Cybersecurity and DevSecOps Engineer graduated from SUP'COM Tunis.
                I specialize in building resilient systems and integrating security
                into every phase of the development lifecycle.
              </Text>
            </VStack>

            <HStack
              spacing={4}
              flexWrap="wrap"
              justify={{ base: 'center', lg: 'flex-start' }}
              mt={8}
            >
              <Button
                as="a"
                href="https://www.linkedin.com/in/moetez-a-b5582221a/"
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                size="lg"
                leftIcon={<FaLinkedin />}
                rightIcon={<FaChevronRight fontSize="12px" />}
              >
                Connect on LinkedIn
              </Button>
              <Button
                as="a"
                href="mailto:moetez.afif@supcom.tn"
                variant="outline"
                size="lg"
                leftIcon={<FaEnvelope />}
                borderColor={useColorModeValue('gray.200', 'whiteAlpha.300')}
                _hover={{
                  bg: useColorModeValue('gray.50', 'whiteAlpha.100'),
                  borderColor: accentColor
                }}
              >
                Get in touch
              </Button>
            </HStack>

            <Flex
              gap={8}
              pt={8}
              color={mutedColor}
              fontSize="sm"
              fontWeight="medium"
              display={{ base: 'none', sm: 'flex' }}
            >
              <HStack spacing={2}>
                <Icon as={FaChevronRight} color={accentColor} w={3} h={3} />
                <Text>Secure CI/CD</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaChevronRight} color={accentColor} w={3} h={3} />
                <Text>Cloud Security</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaChevronRight} color={accentColor} w={3} h={3} />
                <Text>Kubernetes</Text>
              </HStack>
            </Flex>
          </MotionBox>

          <MotionBox
            flex={1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 } as any}
            position="relative"
          >
            {/* Image Border/Frame */}
            <Box
              position="absolute"
              top="-20px"
              left="-20px"
              right="20px"
              bottom="20px"
              border="2px solid"
              borderColor={accentColor}
              borderRadius="3xl"
              zIndex={-1}
              opacity={0.3}
            />

            <MotionImage
              src={ProfileImage}
              alt="Moetez"
              borderRadius="3xl"
              w={{ base: '300px', md: '450px' }}
              h="auto"
              objectFit="cover"
              shadow="2xl"
              whileHover={{ scale: 1.02 } as any}
              transition={{ duration: 0.3 } as any}
            />

            {/* Experience Floating Card */}
            <MotionBox
              position="absolute"
              bottom="-20px"
              right="-20px"
              bg={useColorModeValue('white', 'dark.card')}
              p={4}
              borderRadius="2xl"
              shadow="xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.100', 'whiteAlpha.100')}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 } as any}
            >
              <VStack align="start" spacing={0}>
                <Text fontWeight="800" fontSize="xl" color={accentColor}>2+</Text>
                <Text fontSize="xs" fontWeight="bold" color={mutedColor}>YEARS EXP.</Text>
              </VStack>
            </MotionBox>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
