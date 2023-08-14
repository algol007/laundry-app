import { setAxiosToken } from '@/libs/httpClient';
import { tokenStorage } from '@/libs/tokenStorage';
import authService, { RegisterPayload } from '@/services/authService';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterPayload>({
    name: '',
    phone: '',
    email: '',
    password: '',
    image_url:
      'https://www.staialazharymamuju.ac.id/wp-content/uploads/2023/01/no-image.jpg',
  });

  const handleSubmitLogin = () => {
    let error = false;
    setIsLoading(true);

    Object.keys(registerForm).map(function (key) {
      //@ts-ignore
      if (registerForm[key] === '') {
        error = true;
        return;
      }
    });

    if (error) {
      toast({
        description: 'Data is not  valid!',
        status: 'error',
      });
      return;
    }

    authService.register(registerForm).then((res) => {
      toast({
        description: res.message,
        status: res.status ? 'success' : 'error',
      });
      setIsLoading(false);

      if (res.status) {
        setAxiosToken(res.response);
        tokenStorage.store(res.response);
        navigate('/login');
      }
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} w={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color='brand.500'>
            Be Laundry
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Register Page
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isRequired id='name'>
              <FormLabel>Full name</FormLabel>
              <Input
                type='text'
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    name: e.target.value,
                  })
                }
                placeholder='Full name'
              />
            </FormControl>
            <FormControl isRequired id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    email: e.target.value,
                  })
                }
                placeholder='Email address'
              />
            </FormControl>
            <FormControl isRequired id='phone'>
              <FormLabel>Phone number</FormLabel>
              <Input
                type='number'
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    phone: e.target.value,
                  })
                }
                placeholder='Phone number'
              />
            </FormControl>
            <FormControl isRequired id='password' mb='7.5%'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                  placeholder='Password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmitLogin}
              >
                {isLoading ? <Spinner /> : 'Register'}
              </Button>
            </Stack>

            <Flex justify='center' gap={2}>
              <Text>Already a member?</Text>
              <Text color='brand.500'>
                <Link to='/login'>Login</Link>
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default LoginPage;
