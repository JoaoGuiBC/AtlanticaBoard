import {
  Box, Button, Heading, HStack, Icon, Text, VStack,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { dateFormatter } from '@utils/formatter/dateFormatter';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

type Client = {
  id: string;
  name: string;
}

type Products = {
  product: {
    name: string;
  };
}

type Order = {
  id: string;
  serialNumber: number;
  budgetSerialNumber: number;
  price: number;
  color?: string | null | undefined;
  deadline?: any;
  products: Products[];
  client: Client;
  signed: boolean;
  finished_at?: any;
}

interface OrderCardProps {
  data: Order;
  isLoading: boolean;
  onDeleteOrder: (id: string) => Promise<void>; // eslint-disable-line
  onSignOrder: (orderId: string, clientId: string) => Promise<void>; // eslint-disable-line
}

export function OrderCard({
  data, isLoading, onDeleteOrder, onSignOrder,
}: OrderCardProps) {
  const {
    id, serialNumber, budgetSerialNumber, deadline, price, client, products, signed, finished_at,
  } = data;

  return (
    <Box bg="gray.900" w="40" height="96" borderRadius="sm" p="2" position="relative">
      <Heading color="darkBlue.400" fontSize="19">
        Pedido
        {' '}
        {serialNumber}
      </Heading>

      <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="14">
        Orçamento
        {' '}
        {budgetSerialNumber}
      </Text>

      {deadline && (
        <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="14" mt="2">
          Prazo de entrega:
          {'\n'}
          <Text fontFamily="body" color="gray.400" fontSize="13">
            {dateFormatter(deadline)}
          </Text>
        </Text>
      )}

      <Text fontFamily="body" color="gray.200" fontSize="15" lineHeight="15" mt="6">
        Cliente:
        {'\n'}
        <Text fontFamily="body" color="gray.300" fontSize="13">
          {client.name}
        </Text>
      </Text>

      <Text fontFamily="body" color="gray.300" fontSize="15" lineHeight="15" mt="5">
        Produtos:
        {' '}
        <Text fontFamily="body" color="gray.400" fontSize="15">
          {products.length}
        </Text>
      </Text>

      <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="15" mt="4">
        Preço:
        {' '}
        <Text fontFamily="body" color="gray.400" fontSize="13">
          {currencyFormatter(price)}
        </Text>
      </Text>

      <HStack mt="4" alignItems="center">
        <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="15">Assinado:</Text>
        <Icon
          ml="1"
          as={Feather}
          name={signed ? 'check' : 'x'}
          color={signed ? 'emerald.500' : 'red.500'}
          size="5"
        />
      </HStack>
      <HStack alignItems="center">
        <Text fontFamily="body" color="gray.100" fontSize="17" lineHeight="17">Concluído:</Text>
        <Icon
          ml="1"
          as={Feather}
          name={finished_at ? 'check' : 'x'}
          color={finished_at ? 'emerald.500' : 'red.500'}
          size="5"
        />
      </HStack>

      <VStack
        mt="5"
        px="4"
        position="absolute"
        bottom="3"
        right="0"
        left="0"
        space="3"
      >
        <HStack justifyContent="space-evenly">
          <Button colorScheme="darkBlue">
            <Icon as={Feather} name="file-text" color="gray.50" size="4" />
          </Button>

          <Button isLoading={isLoading} onPress={() => onSignOrder(id, client.id)} colorScheme="teal">
            <Icon as={Feather} name="edit-3" color="gray.50" size="4" />
          </Button>
        </HStack>

        <HStack
          justifyContent="space-evenly"
        >
          <Button isLoading={isLoading} onPress={() => onDeleteOrder(id)} colorScheme="error">
            <Icon as={Feather} name="trash-2" color="gray.50" size="4" />
          </Button>

          <Button isLoading={isLoading} colorScheme="emerald">
            <Icon as={Feather} name="check" color="gray.50" size="4" />
          </Button>
        </HStack>

      </VStack>
    </Box>
  );
}
