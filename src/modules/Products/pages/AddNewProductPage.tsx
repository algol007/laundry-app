import { DefaultLayout } from '@/layouts';
import productService, {
  Category,
  ProductPayload,
} from '@/services/productService';
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Show,
  Text,
  Image,
  useToast,
  Radio,
  RadioGroup,
  Spinner,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { defaultProductPayload } from '../constant';
import { useNavigate } from 'react-router-dom';

function AddNewProductPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<ProductPayload>(defaultProductPayload);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChangePayload = (id: string, value: string) => {
    setPayload({ ...payload, [id]: value });
  };

  const handleSubmitProduct = () => {
    setIsLoading(true);
    productService
      .createNewProduct(payload)
      .then((res) => {
        setIsLoading(false);
        toast({
          description: res.message,
          status: 'success',
        });
        navigate('/product');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchAllCategories = useCallback(() => {
    return productService
      .getAllCategories()
      .then((res) => {
        setCategories(res.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <DefaultLayout>
      <Flex direction={['column', 'row']}>
        <Box w={['100%', '67%']} mr='2%'>
          <Heading w='100%' textAlign={'left'} fontWeight='bold' mb='5%'>
            Add New Product
          </Heading>
          <FormControl mb='3%'>
            <FormLabel htmlFor='name' color='brand.500'>
              Product Name
            </FormLabel>
            <Input
              id='name'
              type='text'
              placeholder='Product Name'
              background='white'
              onChange={(e) => handleChangePayload('name', e.target.value)}
            />
          </FormControl>

          <FormControl mb='3%'>
            <FormLabel htmlFor='description' color='brand.500'>
              Description
            </FormLabel>
            <Textarea
              placeholder='Input description'
              rows={5}
              background='white'
              onChange={(e) =>
                handleChangePayload('description', e.target.value)
              }
            />
          </FormControl>

          <Flex mb='3%' direction={['column', 'row']} gap={3}>
            <FormControl>
              <FormLabel htmlFor='sku' color='brand.500'>
                SKU
              </FormLabel>
              <Input
                id='sku'
                placeholder='SKU'
                background='white'
                onChange={(e) => handleChangePayload('sku', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='stock' color='brand.500'>
                Stock
              </FormLabel>
              <Input
                id='stock'
                placeholder='Stock'
                background='white'
                onChange={(e) => handleChangePayload('stock', e.target.value)}
              />
            </FormControl>
          </Flex>

          <FormControl mb='3%'>
            <FormLabel htmlFor='category' color='brand.500'>
              Category
            </FormLabel>

            <RadioGroup
              onChange={(val) => handleChangePayload('category_id', val)}
            >
              <Stack direction='row' gap={4}>
                {categories.length > 0 &&
                  categories.map((data) => (
                    <Radio key={data.id} value={`${data.id}`}>
                      {data.name}
                    </Radio>
                  ))}
              </Stack>
            </RadioGroup>
          </FormControl>

          <Flex align='end' justify='space-between' mb='3%'>
            <FormControl w={['100%', '50%']}>
              <FormLabel htmlFor='price' color='brand.500'>
                Price
              </FormLabel>
              <Input
                id='price'
                placeholder='Price'
                background='white'
                type='number'
                onChange={(e) => handleChangePayload('price', e.target.value)}
              />
            </FormControl>

            <Show above='sm'>
              <Button
                colorScheme='green'
                w='7rem'
                onClick={handleSubmitProduct}
              >
                {isLoading ? <Spinner /> : 'Publish'}
              </Button>
            </Show>
          </Flex>
        </Box>

        <Box background='brand.100' p={4} w={['100%', '33%']}>
          <FormControl mb='10%' color='brand.500' background='white' p={4}>
            <FormLabel htmlFor='price'>
              <Input
                type='file'
                border='none'
                opacity='0'
                aria-hidden='true'
                height='100%'
                width='100%'
                position='absolute'
                top='0'
                left='0'
              />
              <Image
                src='https://www.staialazharymamuju.ac.id/wp-content/uploads/2023/01/no-image.jpg'
                alt='image'
              />
              <Text align='center' decoration='underline' fontWeight='bold'>
                Upload image here
              </Text>
            </FormLabel>
          </FormControl>

          <Show below='md'>
            <Button colorScheme='green' w='100%' onClick={handleSubmitProduct}>
              {isLoading ? <Spinner /> : 'Publish'}
            </Button>
          </Show>
        </Box>
      </Flex>
    </DefaultLayout>
  );
}

export default AddNewProductPage;
