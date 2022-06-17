import { useCallback, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box, Text, FlatList, Icon, Spinner, useToast, Pressable,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useDeleteBudgetMutation, useListBudgetsQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';
import { BudgetCard } from '@components/BudgetCard';

export function ListBudgets() {
  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, revalidate } = UseAuth();

  const {
    data,
    refetch,
    loading: listLoading,
    error: listError,
  } = useListBudgetsQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    initialFetchPolicy: 'network-only',
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

      {listLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Spinner color="darkBlue.500" size="lg" />
        </Box>
      ) : listError ? (
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
          contentContainerStyle={{ paddingBottom: 48 }}
          data={data?.listBudgets.budgets}
          keyExtractor={(item) => item.id}
          numColumns={2}
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
