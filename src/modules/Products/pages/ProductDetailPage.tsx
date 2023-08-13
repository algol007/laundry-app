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
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductDetailPage() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Text>Product Detail</Text>
    </DefaultLayout>
  );
}

export default ProductDetailPage;
