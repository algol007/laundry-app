import { DefaultImage } from '@/components';
import { DefaultLayout } from '@/layouts';
import { convertToRp } from '@/libs/convertToRp';
import productService, { Product } from '@/services/productService';
import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Simple() {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState<Product>();

  const fetchProduct = useCallback(() => {
    return productService
      .getProductDetail(Number(params.id))
      .then((res) => {
        setProduct(res.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [params]);

  return (
    <DefaultLayout>
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            {product?.image ? (
              <Image
                rounded={'md'}
                alt={product?.name}
                src={product?.image}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            ) : (
              <DefaultImage />
            )}
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product?.name} - {product?.sku}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                {convertToRp(product?.price || 0)}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}
                >
                  Stock : {product?.stock}
                </Text>
                <Text fontSize={'lg'}>{product?.description}</Text>
              </VStack>
            </Stack>

            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              colorScheme='blue'
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              leftIcon={<EditIcon />}
              onClick={() => navigate(`/product/${params.id}/edit`)}
            >
              Edit Product
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </DefaultLayout>
  );
}
