import { DefaultLayout } from '@/layouts';
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
  Checkbox,
  Show,
  Text,
  Image,
} from '@chakra-ui/react';

function AddNewProductPage() {
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
            />
          </FormControl>

          <FormControl mb='3%'>
            <FormLabel htmlFor='description' color='brand.500'>
              Description
            </FormLabel>
            <Textarea
              placeholder='you@example.com'
              rows={5}
              background='white'
            />
          </FormControl>

          <Flex mb='3%' direction={['column', 'row']} gap={3}>
            <FormControl>
              <FormLabel htmlFor='sku' color='brand.500'>
                SKU
              </FormLabel>
              <Input id='sku' placeholder='SKU' background='white' />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='stock' color='brand.500'>
                Stock
              </FormLabel>
              <Input id='stock' placeholder='Stock' background='white' />
            </FormControl>
          </Flex>

          <FormControl mb='3%'>
            <FormLabel htmlFor='description' color='brand.500'>
              Description
            </FormLabel>

            <Stack spacing={5} direction={['column', 'row']}>
              <Checkbox>Wash and Fold</Checkbox>
              <Checkbox>Dry Clean</Checkbox>
              <Checkbox>Home</Checkbox>
              <Checkbox>Others</Checkbox>
            </Stack>
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
              />
            </FormControl>

            <Show above='sm'>
              <Button colorScheme='green' w='7rem'>
                Publish
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
            <Button colorScheme='green' w='100%'>
              Publish
            </Button>
          </Show>
        </Box>
      </Flex>
    </DefaultLayout>
  );
}

export default AddNewProductPage;
