import {
  Box, Icon, Pressable, Menu, Divider, HStack, Text,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Screens = 'client' | 'product' | 'employee'

export function HeaderMenu() {
  const { navigate } = useNavigation();

  function handleNavigate(screen: Screens) {
    navigate(screen);
  }

  return (
    <Box alignItems="flex-start">
      <Menu
        closeOnSelect
        w="250"
        bg="gray.900"
        trigger={(triggerProps) => (
          <Pressable {...triggerProps}>
            <Icon as={Feather} name="menu" color="gray.50" size="6" />
          </Pressable>
        )}
      >
        <Menu.Group title="GERAL" _title={{ fontSize: 16 }}>
          <Menu.Item
            _pressed={{ bg: 'gray.700' }}
          >
            <HStack alignItems="center" space="2.5">
              <Icon as={Feather} name="trello" color="gray.50" size="5" />
              <Text color="gray.50" fontSize="16" fontWeight="400">
                Infográficos
              </Text>
            </HStack>
          </Menu.Item>
        </Menu.Group>

        <Divider mt="3" w="90%" bg="gray.400" alignSelf="center" />

        <Menu.Group title="CADASTRO / CONSULTA" _title={{ fontSize: 16 }}>
          <Menu.Item
            _pressed={{ bg: 'gray.700' }}
            onPress={() => handleNavigate('client')}
          >
            <HStack alignItems="center" space="2.5">
              <Icon as={Feather} name="user" color="gray.50" size="5" />
              <Text color="gray.50" fontSize="16" fontWeight="400">
                Clientes
              </Text>
            </HStack>
          </Menu.Item>

          <Menu.Item
            _pressed={{ bg: 'gray.700' }}
            onPress={() => handleNavigate('product')}
          >
            <HStack alignItems="center" space="2.5">
              <Icon as={Feather} name="tool" color="gray.50" size="5" />
              <Text color="gray.50" fontSize="16" fontWeight="400">
                Produtos
              </Text>
            </HStack>
          </Menu.Item>

          <Menu.Item
            _pressed={{ bg: 'gray.700' }}
            onPress={() => handleNavigate('employee')}
          >
            <HStack alignItems="center" space="2.5">
              <Icon as={Feather} name="users" color="gray.50" size="5" />
              <Text color="gray.50" fontSize="16" fontWeight="400">
                Funcionários
              </Text>
            </HStack>
          </Menu.Item>
        </Menu.Group>

        <Divider mt="3" w="90%" bg="gray.400" alignSelf="center" />

        <Menu.Group title="FUNCIONAL" _title={{ fontSize: 16 }}>
          <Menu.Item
            _pressed={{ bg: 'gray.700' }}
          >
            <HStack alignItems="center" space="2.5">
              <Icon as={Feather} name="clipboard" color="gray.50" size="5" />
              <Text color="gray.50" fontSize="16" fontWeight="400">
                Orçamentos
              </Text>
            </HStack>
          </Menu.Item>

          <Menu.Item
            _pressed={{ bg: 'gray.700' }}
          >
            <HStack alignItems="center" space="2.5">
              <Icon as={Feather} name="book-open" color="gray.50" size="5" />
              <Text color="gray.50" fontSize="16" fontWeight="400">
                Pedidos de compra
              </Text>
            </HStack>
          </Menu.Item>
        </Menu.Group>
      </Menu>
    </Box>
  );
}
