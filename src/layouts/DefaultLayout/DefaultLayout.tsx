import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { Navbar, Sidebar } from '..';
import { useCallback, useEffect, useState } from 'react';
import userService from '@/services/userService';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} name={name} />
      <Box ml={{ base: 0, md: 60 }} p='4' background='brand.100' minH='100vh'>
        {children}
      </Box>
    </Box>
  );
};

export default DefaultLayout;
