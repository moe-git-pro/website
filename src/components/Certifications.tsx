import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  Button,
  useColorModeValue,
  Spinner,
  Badge,
  Container,
  VStack,
  Icon,
  HStack,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, isValidMotionProp } from 'framer-motion';
import { FaExternalLinkAlt, FaAward, FaBuilding } from 'react-icons/fa';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface Certificate {
  title: string;
  issueDate: string;
  issuer: string;
  description: string;
  link?: string;
  credlyLink?: string;
  photo: string;
}

const CertificateCard = ({
  title,
  issueDate,
  issuer,
  description,
  link,
  credlyLink,
  photo,
}: Certificate) => {
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
      height="100%"
      p={6}
      position="relative"
      overflow="hidden"
      whileHover={{ translateY: -5, shadow: 'xl', borderColor: accentColor } as any}
      transition={{ duration: 0.3 } as any}
    >
      <VStack align="stretch" spacing={6} h="100%">
        <Box
          bg={useColorModeValue('gray.50', 'whiteAlpha.50')}
          borderRadius="2xl"
          p={4}
          display="flex"
          justifyContent="center"
          h="160px"
        >
          <Image
            src={photo}
            alt={title}
            maxH="100%"
            objectFit="contain"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Box>

        <VStack align="start" spacing={3} flex={1}>
          <HStack spacing={2}>
            <Icon as={FaAward} color={accentColor} />
            <Text
              fontSize="xs"
              color={accentColor}
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {new Date(issueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </Text>
          </HStack>

          <Heading size="md" fontWeight="800" color={textColor} lineHeight="shorter">
            {title}
          </Heading>

          <HStack spacing={2} color={mutedColor}>
            <Icon as={FaBuilding} w={3} h={3} />
            <Text fontSize="sm" fontWeight="600">
              {issuer}
            </Text>
          </HStack>

          <Text fontSize="sm" color={mutedColor} noOfLines={3} lineHeight="tall">
            {description}
          </Text>
        </VStack>

        <HStack spacing={3} pt={4}>
          {credlyLink ? (
            <Button
              as={Link}
              href={credlyLink}
              isExternal
              variant="solid"
              size="sm"
              borderRadius="full"
              flex={1}
              _hover={{ textDecoration: 'none' }}
            >
              Verify Credly
            </Button>
          ) : link && (
            <Button
              as={Link}
              href={link}
              isExternal
              variant="solid"
              size="sm"
              borderRadius="full"
              flex={1}
              _hover={{ textDecoration: 'none' }}
            >
              View Certificate
            </Button>
          )}
          {link && credlyLink && (
            <Button
              as={Link}
              href={link}
              isExternal
              variant="outline"
              size="sm"
              borderRadius="full"
              _hover={{ textDecoration: 'none' }}
              leftIcon={<FaExternalLinkAlt fontSize="10px" />}
            >
              Cert
            </Button>
          )}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export const Certificates = ({ certificates }: { certificates: Certificate[] }) => {
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const mutedColor = useColorModeValue('light.muted', 'dark.muted');
  const accentColor = useColorModeValue('brand.500', 'brand.400');

  if (!certificates || certificates.length === 0) {
    return (
      <Box py={24} bg={bgColor} display="flex" justifyContent="center">
        <Spinner size="xl" color={accentColor} />
      </Box>
    );
  }

  return (
    <Box as="section" id="certifications" py={24} bg={bgColor}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="brand" variant="subtle" px={4} py={1} borderRadius="full">
              Validation
            </Badge>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="800">
              Professional Certifications
            </Heading>
            <Text color={mutedColor} fontSize="lg" maxW="2xl">
              Verified credentials demonstrating expertise in cybersecurity,
              cloud security, and network management.
            </Text>
          </VStack>

          <Box
            sx={{
              '.swiper-button-next, .swiper-button-prev': {
                color: accentColor,
                '&::after': { fontSize: '20px', fontWeight: 'bold' }
              },
              '.swiper-pagination-bullet-active': {
                bg: accentColor
              }
            }}
          >
            <Swiper
              style={{ padding: '20px 0 50px 0' }}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                md: { slidesPerView: 2 },
                lg: { slidesPerView: 3 },
              }}
              modules={[Navigation, Pagination, Autoplay]}
            >
              {certificates.map((certificate, index) => (
                <SwiperSlide key={index}>
                  <CertificateCard {...certificate} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};