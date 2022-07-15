import { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';
import {
  Box, Text, FlatList, Icon, Spinner, useToast, Pressable,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useDeleteOrderMutation, useFinishOrderMutation, useListOrdersQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';
import { OrderCard } from '@components/OrderCard';

type BudgetProducts = {
  __typename?: 'ProductBudget';
  product: {
    __typename?: 'Product';
    name: string;
  }
}

type Order = {
  __typename?: 'Order';
  id: string;
  serialNumber: number;
  budgetSerialNumber: number;
  price: number;
  color?: string | null;
  discount: number;
  deadline?: any;
  signed: boolean;
  finished_at?: any;
  client: {
    id: string;
    name: string;
  }
  products: BudgetProducts[];
};

export function ListOrders() {
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, revalidate } = UseAuth();

  function handleError(message: string) {
    revalidate(user!);

    toast.show({
      render: () => (
        <Toast
          title="Erro"
          description={message}
          type="error"
        />
      ),
      placement: 'top-right',
    });
  }

  const {
    refetch,
    loading: listLoading,
    error: listError,
  } = useListOrdersQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    onCompleted(data) {
      setOrders([...orders, ...data.listOrders.orders]);
      setTotalOrders(data.listOrders.totalOrders);
    },
  });
  const [loadDelete, deleteOrderParams] = useDeleteOrderMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
  });
  const [loadFinish] = useFinishOrderMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
  });

  async function handleDeleteBudget(id: string) {
    await loadDelete({
      variables: { deleteOrderId: id },
      onCompleted: () => {
        const filteredOrder = orders.filter((order) => id !== order.id);
        setOrders(filteredOrder);
      },
      onError: (error) => handleError(error.message),
    });
  }
  async function handleFinishOrder(id: string) {
    await loadFinish({
      variables: { finishOrderId: id },
      onError: (error) => handleError(error.message),
    });
  }

  function handleFetchMore() {
    if (totalOrders !== orders.length) {
      setPage(page + 1);
      refetch();
    }
  }

  async function handleSignOrder(orderId: string, clientId: string) {
    await WebBrowser.openBrowserAsync(
      `https://atlantica-board.vercel.app/assinarPedido?cliente=${clientId}&pedido=${orderId}`,
    );
    await Clipboard.setStringAsync(
      `https://atlantica-board.vercel.app/assinarPedido?cliente=${clientId}&pedido=${orderId}`,
    );

    toast.show({
      render: () => (
        <Toast
          title="Copiado"
          description="Link copiado para a sua área de transferência"
          type="success"
        />
      ),
      placement: 'top-right',
    });
  }

  function handleGoToDetail(orderId: string) {
    navigate('orderDetail', { id: orderId });
  }

  useEffect(() => {
    if (listError) {
      handleError(listError.message);
    }
  }, [listLoading]);

  useFocusEffect(
    useCallback(() => {
      setOrders([]);
      setTotalOrders(0);
      setPage(1);
      refetch();
    }, []),
  );

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Pedidos" />

      {listError ? (
        <Box flex={1} alignItems="center" justifyContent="center" mt={-200}>
          <Text
            color="gray.100"
            fontFamily="heading"
            fontWeight={500}
            fontSize="3xl"
            px="12"
            textAlign="center"
          >
            Erro ao carregar os pedidos
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ paddingVertical: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48, minHeight: '100%' }}
          data={orders}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReached={handleFetchMore}
          ListEmptyComponent={() => (
            <Box mb="24" flex={1} alignItems="center" justifyContent="center">
              <Spinner color="darkBlue.400" size="lg" />
            </Box>
          )}
          ListFooterComponentStyle={{ marginTop: 10 }}
          ListFooterComponent={totalOrders !== orders.length ? () => (
            <Spinner color="darkBlue.500" size="lg" />
          ) : undefined}
          renderItem={({ item }) => (
            <Pressable
              py="4"
              flex={1}
              alignItems="center"
              alignSelf="flex-end"
              onPress={() => handleGoToDetail(item.id)}
            >
              <OrderCard
                data={item}
                isLoading={deleteOrderParams.loading}
                onDeleteOrder={handleDeleteBudget}
                onSignOrder={handleSignOrder}
                onFinishOrder={handleFinishOrder}
              />
            </Pressable>
          )}
        />
      )}
    </Box>
  );
}
