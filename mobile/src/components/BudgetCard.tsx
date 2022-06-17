import {
  Box, Button, Heading, HStack, Icon, Text,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { dateFormatter } from '@utils/formatter/dateFormatter';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

type Client = {
  name: string;
  email: string;
  contact?: string | null | undefined;
  phoneNumber?: string | null | undefined;
}

type Products = {
  id: string;
  base: number;
  height: number;
  price: number;
  product: {
    id: string;
    name: string;
  };
}

type Budget = {
  id: string;
  serialNumber: number;
  price: number;
  color?: string | null | undefined;
  deadline?: any;
  discount?: number | null | undefined;
  created_at: any;
  products: Products[];
  client: Client;
}

interface BudgetCardProps {
  data: Budget;
  isLoading: boolean;
  onDeleteBudget: (id: string) => Promise<void>; // eslint-disable-line
  onGoToUpdate: (budgetId: string) => void; // eslint-disable-line
}

export function BudgetCard({
  data, isLoading, onDeleteBudget, onGoToUpdate,
}: BudgetCardProps) {
  const {
    id, serialNumber, created_at, deadline, price, discount, client, products,
  } = data;

  return (
    <Box bg="gray.900" w="40" height="96" borderRadius="sm" p="2" position="relative">
      <Heading color="darkBlue.400" fontSize="19">
        Orçamento
        {' '}
        {serialNumber}
      </Heading>

      <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="14" mt="2">
        Gerado em:
        {'\n'}
        <Text fontFamily="body" color="gray.400" fontSize="13">
          {dateFormatter(created_at)}
        </Text>
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

      <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="15" mt="5">
        Subtotal:
        {' '}
        <Text fontFamily="body" color="gray.400" fontSize="13">
          {currencyFormatter(price)}
        </Text>
      </Text>

      <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="15" mt="1">
        Desconto:
        {' '}
        <Text fontFamily="body" color="gray.400" fontSize="13">
          {currencyFormatter(discount)}
        </Text>
      </Text>

      <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="15" mt="1">
        Total:
        {' '}
        <Text fontFamily="body" color="gray.400" fontSize="13">
          {discount
            ? currencyFormatter(
              price - discount,
            )
            : currencyFormatter(price)}
        </Text>
      </Text>

      <HStack
        mt="5"
        px="3"
        justifyContent="space-evenly"
        position="absolute"
        bottom="3"
        right="0"
        left="0"
      >
        <Button onPress={() => onGoToUpdate(id)} colorScheme="darkBlue">
          <Icon as={Feather} name="edit-2" color="gray.50" size="4" />
        </Button>

        <Button isLoading={isLoading} onPress={() => onDeleteBudget(id)} colorScheme="error">
          <Icon as={Feather} name="trash-2" color="gray.50" size="4" />
        </Button>
      </HStack>
    </Box>
  );
}
