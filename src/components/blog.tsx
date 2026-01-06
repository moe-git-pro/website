import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  Badge,
  Link,
  Icon,
  chakra,
  shouldForwardProp,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface Article {
  source: string;
  content: string;
  image: string;
  title: string;
}

const BlogArticleCard = ({ article, index }: { article: Article; index: number }) => {
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('light.border', 'dark.border');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 } as any}
      bg={cardBg}
      borderRadius="3xl"
      border="1px solid"
      borderColor={borderColor}
      overflow="hidden"
      height="100%"
      display="flex"
      flexDirection="column"
      whileHover={{ translateY: -8, shadow: 'xl', borderColor: accentColor } as any}
    >
      <Box h="200px" overflow="hidden" position="relative">
        <Image
          src={article.image}
          alt={article.title || "Blog post"}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.5s ease"
          _hover={{ transform: 'scale(1.1)' }}
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme="brand"
          borderRadius="full"
          px={3}
        >
          Special Report
        </Badge>
      </Box>

      <VStack p={6} align="start" spacing={4} flex={1}>
        <Heading size="md" fontWeight="800" color={textColor} noOfLines={2}>
          {article.title || "Industry Insight"}
        </Heading>

        <Text fontSize="sm" color={mutedColor} noOfLines={4} lineHeight="tall">
          {article.content}
        </Text>

        <Box mt="auto" w="full">
          <Link
            href={article.source}
            isExternal
            display="flex"
            alignItems="center"
            color={accentColor}
            fontWeight="bold"
            fontSize="sm"
            _hover={{ textDecoration: 'none', opacity: 0.8 }}
          >
            Read Source Article <Icon as={FaExternalLinkAlt} ml={2} w={3} h={3} />
          </Link>
        </Box>
      </VStack>
    </MotionBox>
  );
};

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/website/components/article.json');
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box as="section" id="blog" py={24} bg={bgColor}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="purple" variant="subtle" px={4} py={1} borderRadius="full">
              Curated Content
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Tech Trends & News
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              Hand-picked insights and reports from leading cybersecurity
              and technology publishers.
            </Text>
          </VStack>

          {loading ? (
            <Flex justify="center" py={20}>
              <Spinner size="xl" color={accentColor} thickness="4px" />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {articles.map((article, index) => (
                <BlogArticleCard key={index} article={article} index={index} />
              ))}
            </SimpleGrid>
          )}

          {!loading && articles.length === 0 && (
            <Text textAlign="center" color={mutedColor}>No articles found.</Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Blog;