import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  Link,
  Image,
  Badge,
  Container,
  Icon,
  VStack,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { useMediumArticles } from '../hooks/useMediumArticles';
import { HStack } from '@chakra-ui/react';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const NewsCard = ({
  title,
  date,
  description,
  tags,
  link,
  thumbnail
}: {
  title: string;
  date: string;
  description: string;
  tags: string[];
  link: string;
  thumbnail: string;
}) => {
  const cardBg = useColorModeValue('light.card', 'dark.card');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('light.border', 'dark.border');

  return (
    <MotionBox
      bg={cardBg}
      borderRadius="3xl"
      border="1px solid"
      borderColor={borderColor}
      overflow="hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 } as any}
      whileHover={{ translateY: -8, shadow: 'xl', borderColor: accentColor } as any}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Link
        href={link}
        isExternal
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {thumbnail && (
          <Box position="relative" overflow="hidden" h="240px">
            <Image
              src={thumbnail}
              alt={title}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.5s ease"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
            <Box
              position="absolute"
              top={4}
              right={4}
            >
              <Badge colorScheme="brand" variant="solid" borderRadius="full" px={3}>
                Article
              </Badge>
            </Box>
          </Box>
        )}

        <Box p={6} flex="1" display="flex" flexDirection="column">
          <HStack color={mutedColor} fontSize="xs" mb={3} spacing={2}>
            <Icon as={FaCalendarAlt} />
            <Text fontWeight="600">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </HStack>

          <Heading
            size="md"
            mb={3}
            noOfLines={2}
            fontWeight="800"
            lineHeight="shorter"
            color={textColor}
          >
            {title}
          </Heading>

          <Text
            noOfLines={3}
            color={mutedColor}
            fontSize="sm"
            mb={6}
            lineHeight="tall"
          >
            {description.replace(/<[^>]*>/g, '').substring(0, 160)}...
          </Text>

          <Box mt="auto">
            <Flex wrap="wrap" gap={2} mb={4}>
              {tags?.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="subtle"
                  colorScheme="gray"
                  fontSize="2xs"
                  px={2}
                  borderRadius="md"
                >
                  {tag}
                </Badge>
              ))}
            </Flex>

            <Flex align="center" color={accentColor} fontWeight="700" fontSize="sm">
              Read More <Icon as={FaExternalLinkAlt} ml={2} w={3} h={3} />
            </Flex>
          </Box>
        </Box>
      </Link>
    </MotionBox>
  );
};


export const Medium = () => {
  const { articles, loading, error } = useMediumArticles();

  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const spinnerColor = useColorModeValue('brand.500', 'brand.400');

  if (loading) {
    return (
      <Box py={32} display="flex" justifyContent="center" bg={bgColor}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color={spinnerColor} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={20} textAlign="center" bg={bgColor}>
        <Text color="red.500">Failed to load articles. Please check back later.</Text>
      </Box>
    );
  }

  return (
    <Box as="section" id="medium" py={24} bg={bgColor}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
              Insights
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Latest Articles & Publications
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              Exploring the intersections of Cybersecurity, DevSecOps, and
              Cloud Architecture through technical writing.
            </Text>
          </VStack>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={8}
          >
            {articles.map((article, index) => (
              <GridItem key={index}>
                <NewsCard
                  title={article.title}
                  date={article.pubDate}
                  description={article.description}
                  tags={article.categories}
                  link={article.link}
                  thumbnail={article.thumbnail}
                />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};
