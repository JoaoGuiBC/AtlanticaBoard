import { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box, Text, FlatList, Icon, Spinner, useToast, Pressable,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { Client } from '@screens/clients/ListClients';
import { useDeleteBudgetMutation, useListBudgetsQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';
import { BudgetCard } from '@components/BudgetCard';

type BudgetProducts = {
  __typename?: 'ProductBudget',
  id: string,
  base: number,
  height: number,
  price: number,
  product: {
    __typename?: 'Product',
    id: string,
    name: string
  };
}

type Budget = {
  __typename?: 'Budget';
  client: Omit<Client, 'address' | 'id'>;
  color?: string | null;
  created_at: Date;
  deadline?: any;
  discount?: number | null;
  id: string;
  price: number;
  products: BudgetProducts[];
  serialNumber: number;
};

export function ListBudgets() {
  const [page, setPage] = useState(1);
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, revalidate } = UseAuth();

  const {
    refetch,
    loading: listLoading,
    error: listError,
  } = useListBudgetsQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    initialFetchPolicy: 'network-only',
    onCompleted(data) {
      setBudgets([...budgets, ...data.listBudgets.budgets]);
      setTotalBudgets(data.listBudgets.totalBudgets);
    },
  });
  const [loadDelete, { error, loading }] = useDeleteBudgetMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
  });

  async function handleDeleteBudget(id: string) {
    await loadDelete({ variables: { deleteBudgetId: id } });

    if (!error) {
      refetch();
    }
  }

  function handleFetchMore() {
    setPage(page + 1);
    refetch();
  }

  function handleGoToUpdate(budgetId: string) {
    // navigate('budgetUpdate', { id: budgetId });
    console.log(`Orçamento: ${budgetId}`);
  }

  useEffect(() => {
    if (error || listError) {
      revalidate(user!);

      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error ? error.message : listError?.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
    }
  }, [error, listLoading]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Orçamentos" />

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
            Erro ao carregar os orçamentos
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ paddingVertical: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48, minHeight: '100%' }}
          data={budgets}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReached={handleFetchMore}
          ListEmptyComponent={() => (
            <Box mb="24" flex={1} alignItems="center" justifyContent="center">
              <Spinner color="darkBlue.500" size="lg" />
            </Box>
          )}
          ListFooterComponentStyle={{ marginTop: 10 }}
          ListFooterComponent={totalBudgets !== budgets.length ? () => (
            <Spinner color="darkBlue.500" size="lg" />
          ) : undefined}
          renderItem={({ item }) => (
            <Pressable
              py="4"
              flex={1}
              alignItems="center"
              alignSelf="flex-end"
              onPress={() => console.log(item.id)}
            >
              <BudgetCard
                data={item}
                isLoading={loading}
                onDeleteBudget={handleDeleteBudget}
                onGoToUpdate={handleGoToUpdate}
              />
            </Pressable>
          )}
        />
      )}
    </Box>
  );
}
