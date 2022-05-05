import { Flex, Icon } from '@chakra-ui/react';
import { RiUserAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export function NotificationsNav() {
  return (
    <Flex
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Link to="/funcionarios/criar" style={{ display: 'flex' }}>
        <Icon as={RiUserAddLine} fontSize="20" />
      </Link>
    </Flex>
  );
}
