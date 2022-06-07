import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Box, Heading, Text, FlatList, VStack, Button, HStack, Icon, Divider, Spinner, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useDeleteEmployeeMutation, useListEmployeesQuery } from '@graphql/generated/graphql';

import { Header } from '@components/Header';
import { Toast } from '@components/Toast';

export function ListEmployess() {
  const toast = useToast();
  const { user, revalidate } = UseAuth();

  const {
    data,
    refetch,
    loading: listLoading,
    error: listError,
  } = useListEmployeesQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    initialFetchPolicy: 'network-only',
  });
  const [loadDelete, { error, loading }] = useDeleteEmployeeMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
  });

  async function handleDeleteEmployee(id: string) {
    await loadDelete({ variables: { deleteEmployeeId: id } });

    if (!error) {
      refetch();
    }
  }

  useEffect(() => {
    if (error || listError) {
      revalidate(user!);

      toast.show({
        render: () => (
          <Toast
            title="Teste"
            description={error ? error.message : listError?.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
    }
  }, [error, listLoading]);

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Funcionários" />

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
            Erro ao carregar os funcionários
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ padding: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48 }}
          data={data?.listEmployees}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider bg="gray.600" />}
          renderItem={({ item }) => (
            <HStack py="5" justifyContent="space-between">
              <VStack>
                <Heading
                  color="darkBlue.400"
                  fontFamily="heading"
                  fontWeight={500}
                  fontSize="lg"
                >
                  {item.name}
                </Heading>

                <Text
                  color="gray.200"
                  fontFamily="heading"
                  fontWeight={300}
                  fontSize="md"
                >
                  {item.email}
                </Text>
              </VStack>

              {(!item.isAdmin && user?.isAdmin) && (
                <Button isLoading={loading} onPress={() => handleDeleteEmployee(item.id)} colorScheme="error">
                  <Icon as={Feather} name="trash-2" color="gray.50" size="5" />
                </Button>
              )}
            </HStack>
          )}
        />
      )}
    </Box>
  );
}
