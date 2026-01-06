import React from 'react';
import { Box, Text, Link, Stack, useColorModeValue, Container, IconButton, HStack, Divider, VStack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
    const borderColor = useColorModeValue('light.border', 'dark.border');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const mutedColor = useColorModeValue('light.muted', 'dark.muted');
    const accentColor = useColorModeValue('brand.500', 'brand.400');

    return (
        <Box as="footer" py={12} bg={useColorModeValue('light.bg', 'dark.bg')}>
            <Container maxW="container.xl">
                <Divider borderColor={borderColor} mb={12} />
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align="center"
                    spacing={8}
                >
                    <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                        <Text fontWeight="bold" fontSize="lg" color={textColor}>
                            Moetez Afif
                        </Text>
                        <Text color={mutedColor} fontSize="sm">
                            DevSecOps & Cybersecurity Engineer
                        </Text>
                    </VStack>

                    <VStack spacing={4}>
                        <HStack spacing={4}>
                            <IconButton
                                as={Link}
                                href="https://github.com/moetezafif-git"
                                isExternal
                                aria-label="GitHub"
                                icon={<FaGithub />}
                                variant="ghost"
                                borderRadius="full"
                                _hover={{ color: accentColor }}
                            />
                            <IconButton
                                as={Link}
                                href="https://www.linkedin.com/in/moetez-a-b5582221a/"
                                isExternal
                                aria-label="LinkedIn"
                                icon={<FaLinkedin />}
                                variant="ghost"
                                borderRadius="full"
                                _hover={{ color: accentColor }}
                            />
                            <IconButton
                                as={Link}
                                href="mailto:moetez.afif@supcom.tn"
                                aria-label="Email"
                                icon={<FaEnvelope />}
                                variant="ghost"
                                borderRadius="full"
                                _hover={{ color: accentColor }}
                            />
                        </HStack>
                        <Text color={mutedColor} fontSize="xs">
                            &copy; {new Date().getFullYear()} Moetez Afif. All rights reserved.
                        </Text>
                    </VStack>

                    <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
                        <Link href="#home" fontSize="sm" color={mutedColor} _hover={{ color: accentColor }}>Home</Link>
                        <Link href="#about" fontSize="sm" color={mutedColor} _hover={{ color: accentColor }}>About</Link>
                        <Link href="#projects" fontSize="sm" color={mutedColor} _hover={{ color: accentColor }}>Projects</Link>
                    </HStack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
