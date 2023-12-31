import { setAxiosToken } from '@/libs/httpClient';
import { tokenStorage } from '@/libs/tokenStorage';
import authService, { LoginPayload } from '@/services/authService';
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
  const [loginForm, setLoginForm] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  const handleSubmitLogin = () => {
    let error = false;

    Object.keys(loginForm).map(function (key) {
      //@ts-ignore
      if (loginForm[key] === '') {
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

    setIsLoading(true);
    authService.login(loginForm).then((res) => {
      toast({
        description: res.message,
        status: res.status ? 'success' : 'error',
      });
      setIsLoading(false);

      if (res.status) {
        setAxiosToken(res.response);
        tokenStorage.store(res.response);
        navigate('/dashboard');
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
            Login Page
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isRequired id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    email: e.target.value,
                  })
                }
                placeholder='Email address'
              />
            </FormControl>
            <FormControl isRequired id='password' mb='7.5%'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  onChange={(e) =>
                    setLoginForm({
                      ...loginForm,
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
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </Stack>

            <Flex justify='center' gap={2}>
              <Text>Not a member?</Text>
              <Text color='brand.500'>
                <Link to='/register'>Register now</Link>
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default LoginPage;
