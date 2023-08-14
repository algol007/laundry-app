import { DefaultImage, DefaultModal } from '@/components';
import { DefaultLayout } from '@/layouts';
import { convertToRp } from '@/libs/convertToRp';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  Flex,
  useDisclosure,
  Text,
  Image,
  Stack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService, { Product } from '@/services/productService';

function ProductListPage() {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [products, setProducts] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<Product>();

  const columns: TableColumn<Product>[] = [
    {
      name: 'SKU',
      selector: (row) => row.sku,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
    },
    {
      name: 'Price',
      selector: (row) => convertToRp(Number(row.price)),
    },
    {
      name: 'Created At',
      selector: (row) => row.created_at.slice(0, 10),
    },
    {
      name: 'Action',
      cell: (row) => (
        <Stack direction='row'>
          <Tooltip label='See product detail'>
            <IconButton
              onClick={() => navigate(`/product/${row.id}`)}
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
              onClick={() => {
                navigate(`/product/${row.id}/edit`);
              }}
            />
          </Tooltip>
          <Tooltip label='Delete product'>
            <IconButton
              colorScheme='red'
              aria-label='Delete product'
              icon={<DeleteIcon />}
              onClick={() => {
                onOpen();
                setProductSelected(row);
              }}
            />
          </Tooltip>
        </Stack>
      ),
    },
  ];

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
        <DataTable columns={columns} data={products} pagination />
      </Card>
      <DefaultModal title='Delete product' isOpen={isOpen} onClose={onClose}>
        <Text fontSize='2xl'>
          Are you sure to delete{' '}
          <Text fontWeight='bold'>{productSelected?.name}?</Text>
        </Text>
      </DefaultModal>
    </DefaultLayout>
  );
}

export default ProductListPage;
