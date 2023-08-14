import { DefaultModal } from '@/components';
import { DefaultLayout } from '@/layouts';
import { convertToRp } from '@/libs/convertToRp';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  Flex,
  useDisclosure,
  Text,
  Stack,
  IconButton,
  Tooltip,
  useToast,
  ModalFooter,
  Spinner,
  Box,
} from '@chakra-ui/react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService, { Product } from '@/services/productService';

function ProductListPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    return productService
      .getAllProducts()
      .then((res) => {
        setIsLoading(false);
        setProducts(res.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteSelectedProduct = useCallback((id: number) => {
    setIsLoading(true);
    return productService
      .deleteProduct(id)
      .then((res) => {
        setIsLoading(false);
        toast({
          description: res.message,
          status: 'success',
        });
        fetchAllProducts();
        onClose();
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

      {isLoading ? (
        <Flex justify='center'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <Card>
          <DataTable columns={columns} data={products} pagination />
        </Card>
      )}
      <DefaultModal title='' isOpen={isOpen} onClose={onClose}>
        <Text fontSize='xl'>
          Are you sure to delete{' '}
          <Text fontWeight='bold'>{productSelected?.name}?</Text>
        </Text>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='ghost'
            color='red.500'
            onClick={() => deleteSelectedProduct(Number(productSelected?.id))}
          >
            {isLoading ? <Spinner /> : 'Delete'}
          </Button>
        </ModalFooter>
      </DefaultModal>
    </DefaultLayout>
  );
}

export default ProductListPage;
