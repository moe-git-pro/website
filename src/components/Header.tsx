import { Link, Box, Flex, HStack, Image } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box as="header" py={4} px={8} position="fixed" w="100%" bg="white" boxShadow="sm" zIndex={10}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Image src="/brain-icon.png" alt="Logo" h="30px" fallbackSrc="https://via.placeholder.com/30" />
        
        {/* Ensure you're using HStack here */}
        <HStack spacing={8}>
          <Link href="/">Home</Link>
          <Link href="/news">News</Link>
          <Link href="/about">About</Link>
          <Link href="/cv">CV</Link>
          <Link href="/publications">Publications</Link>
          <Link href="/blog">Blog</Link>
        </HStack>
        
        <HStack spacing={4}>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</Link>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</Link>
          <Link href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">Google Scholar</Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
