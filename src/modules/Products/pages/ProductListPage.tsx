import { DefaultLayout } from '@/layouts';
import { convertToRp } from '@/libs/convertToRp';
import productService, { Product } from '@/services/productService';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  Flex,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip,
  TableCaption,
  Image,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductListPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  const fetchAllProducts = useCallback(() => {
    return productService
      .getAllProducts()
      .then((res) => {
        setProducts(res.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DefaultLayout>
      <Flex justify={'flex-end'} mb={4}>
        <Button
          colorScheme='brand'
          leftIcon={<AddIcon />}
          onClick={() => navigate('/create-product')}
        >
          Add Product
        </Button>
      </Flex>

      <Card>
        <TableContainer>
          <Table variant='simple'>
            {products.length === 0 && (
              <TableCaption color='gray.300' py='8'>
                Product not found
              </TableCaption>
            )}
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Name</Th>
                <Th isNumeric>Stock</Th>
                <Th>Price</Th>
                <Th>Image</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((data) => (
                  <Tr key={data.id}>
                    <Td>{data.sku}</Td>
                    <Td>{data.name}</Td>
                    <Td isNumeric>{data.stock}</Td>
                    <Td>{convertToRp(data.price)}</Td>
                    <Td>
                      <Image src={data.image} />
                    </Td>
                    <Td>
                      <Stack direction='row'>
                        <Tooltip label='See product detail'>
                          <IconButton
                            onClick={() => navigate(`/product/${data.id}`)}
                            colorScheme='blue'
                            aria-label='See product detail'
                            icon={<ViewIcon />}
                          />
                        </Tooltip>
                        <Tooltip label='Edit product'>
                          <IconButton
                            colorScheme='yellow'
                            aria-label='Edit product'
                            icon={<EditIcon />}
                          />
                        </Tooltip>
                        <Tooltip label='Delete product'>
                          <IconButton
                            colorScheme='red'
                            aria-label='Delete product'
                            icon={<DeleteIcon />}
                          />
                        </Tooltip>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </DefaultLayout>
  );
}

export default ProductListPage;
