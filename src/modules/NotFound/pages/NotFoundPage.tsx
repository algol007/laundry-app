import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box textAlign='center' py={10} px={6}>
          <Heading display='inline-block' as='h2' size='2xl'>
            404
          </Heading>
          <Text fontSize='18px' mt={3} mb={2}>
            Page Not Found
          </Text>
          <Text color={'gray.500'} mb={6}>
            The page you&apos;re looking for does not seem to exist
          </Text>

          <Button
            colorScheme='brand'
            bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
            color='white'
            variant='solid'
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}
