import React from 'react';
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
  VStack
} from '@chakra-ui/react';
import { useMediumArticles } from '../hooks/useMediumArticles';

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
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');
  const titleColor = useColorModeValue('gray.800', 'white');
  const descColor = useColorModeValue('gray.600', 'gray.300');
  const dateColor = useColorModeValue('gray.500', 'gray.400');
  const tagColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Link 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      bg={cardBg}
      borderRadius="xl"
      border="1px solid"
      borderColor={cardBorder}
      boxShadow="2xl"
      transition="all 0.4s ease"
      display="flex"
      flexDirection="column"
      width={{ base: "100%", sm: "340px", md: "400px" }}
      maxWidth="100%"
      height={{ base: "auto", sm: "500px" }}
      overflow="hidden"
      transform="scale(1)"
      _hover={{ 
        transform: 'scale(1.03)',
        boxShadow: '3xl',
        borderColor: 'blue.200'
      }}
    >
      {thumbnail && (
        <Box 
          height={{ base: "220px", sm: "260px", md: "300px" }}
          overflow="hidden" 
          borderTopRadius="xl"
        >
          <Box 
            backgroundImage={`url(${thumbnail})`}
            backgroundSize="cover"
            backgroundPosition="center"
            width="100%"
            height="100%"
            transition="transform 0.3s ease"
            _hover={{
              transform: 'scale(1.1)'
            }}
          />
        </Box>
      )}

      <Box 
        p={{ base: 4, md: 6 }}
        bg={cardBg}
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Text 
            fontSize={["sm", "md"]} 
            color={dateColor}
            mb={3}
            letterSpacing="wider"
            textTransform="uppercase"
          >
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <Heading 
            size={["sm", "md", "lg"]}
            mb={4}
            noOfLines={2}
            color={titleColor}
            lineHeight="shorter"
          >
            {title}
          </Heading>
          <Text 
            noOfLines={3} 
            color={descColor}
            fontSize={["xs", "sm", "md"]}
            mb={4}
            lineHeight="base"
          >
            {description.replace(/<[^>]*>/g, '').substring(0, 250)}
          </Text>
        </Box>

        {tags && tags.length > 0 && (
          <Flex 
            wrap="wrap"
            gap={2}
            mt="auto"
          >
            {tags.slice(0, 3).map((tag, index) => (
              <Text 
                key={index} 
                fontSize="xs" 
                color={tagColor}
                bg={useColorModeValue('blue.50', 'blue.900')}
                px={2}
                py={1}
                borderRadius="md"
              >
                {tag}
              </Text>
            ))}
          </Flex>
        )}
      </Box>
    </Link>
  );
};

export const News = () => {
  const { articles, loading, error } = useMediumArticles(import.meta.env.VITE_MEDIUM_USERNAME || 'moetezafif');

  const bgColor = useColorModeValue('white', 'gray.900');
  const headingColor = useColorModeValue('gray.700', 'white');
  const spinnerColor = useColorModeValue('gray.500', 'blue.300');

  if (loading) {
    return (
      <Box 
      maxWidth="1250px"
        id="news" 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
        bg={bgColor}
      >
        <Spinner size="xl" color={spinnerColor} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        id="news" 
        textAlign="center" 
        p={8}
        bg={bgColor}
      >
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box 
      id="news"
      maxW="100%"
      py={10} 
      px={{ base: 4, md: 6, lg: 8 }}
      bg={bgColor}
      width="100%"
      overflow="hidden"
    >
      <Heading 
        mb={8} 
        textAlign="center" 
        fontSize={['xl', '2xl', '3xl']}
        color={headingColor}
      >
        Latest Articles
      </Heading>
      <Flex 
        justifyContent="center" 
        alignItems="stretch"
        width="100%"
        overflow="hidden"
      >
        <Grid
          templateColumns={{ 
            base: 'repeat(1, 1fr)', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(2, 1fr)', 
            lg: 'repeat(3, 1fr)' 
          }}
          gap={{ base: 2, sm: 3, md: 4, lg: 5 }}
          width="100%"
          maxWidth="1200px"
          justifyContent="center"
          justifyItems="center"
          margin="0 auto"
          overflow="hidden"
        >
          {articles.map((article, index) => (
            <GridItem 
              key={index} 
              display="flex"
              justifyContent="center"
              alignItems="stretch"
              width="100%"
              maxWidth={{ base: "100%", sm: "340px", md: "400px" }}
              overflow="hidden"
            >
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
      </Flex>
    </Box>
  );
};
