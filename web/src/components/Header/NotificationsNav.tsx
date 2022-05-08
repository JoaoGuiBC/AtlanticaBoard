import { Button, Flex, Icon } from '@chakra-ui/react';
import { RiLogoutBoxLine, RiUserAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

export function NotificationsNav() {
  const { logOut } = useAuth();

  async function handleLogOut() {
    await logOut();
  }

  return (
    <Flex
      mx={['6', '8']}
      pr={['6', '6']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
      gap="4"
    >
      <Link to="/funcionarios/criar" style={{ display: 'flex' }}>
        <Icon as={RiUserAddLine} fontSize="20" />
      </Link>

      <Button variant="link" color="gray.300" onClick={handleLogOut}>
        <Icon as={RiLogoutBoxLine} fontSize="20" />
      </Button>
    </Flex>
  );
}
