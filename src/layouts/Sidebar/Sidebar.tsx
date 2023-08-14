import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiFolder, FiSettings } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  url: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children: React.ReactNode;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', url: '/dashboard', icon: FiHome },
  { name: 'Products', url: '/product', icon: FiFolder },
  { name: 'Sales', url: '/sales', icon: FiTrendingUp },
  { name: 'Settings', url: '/setting', icon: FiSettings },
];

const NavItem = ({ icon, url, children, ...rest }: NavItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(url)}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'rgba(255, 255, 255, 0.5)',
          color: 'brand.500',
        }}
        color={location.pathname === url ? 'brand.500' : 'white'}
        background={location.pathname === url ? 'white' : 'transparent'}
        fontWeight={location.pathname === url ? 'bold' : 'normal'}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            color={location.pathname === url ? 'brand.500' : 'white'}
            fontSize='16'
            _groupHover={{
              color: 'brand.500',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('brand.500', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontWeight='bold' color='white'>
          BeLaundry
        </Text>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
          color='white'
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem icon={link.icon} key={link.name} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default Sidebar;
