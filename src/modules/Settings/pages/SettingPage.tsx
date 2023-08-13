'use client';

import { DefaultLayout } from '@/layouts';
import userService from '@/services/userService';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

function SettingPage() {
  const [name, setName] = useState<string>('');

  const fetchUserInfo = useCallback(() => {
    return userService
      .getUserInfo()
      .then((res) => {
        setName(res.response.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <DefaultLayout>
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit='cover'
            alt='#'
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000'
              }
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {name}
              </Heading>
              <Text color={'gray.500'}>Admin</Text>
            </Stack>
          </Box>
        </Box>
      </Center>
    </DefaultLayout>
  );
}

export default SettingPage;
