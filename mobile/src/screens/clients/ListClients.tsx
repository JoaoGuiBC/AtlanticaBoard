import { useCallback, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box, Heading, Text, FlatList, VStack, Button, HStack, Icon, Divider, Spinner, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useDeleteClientMutation, useListClientsQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

export function ListClients() {
  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, revalidate } = UseAuth();

  const {
    data,
    refetch,
    loading: listLoading,
    error: listError,
  } = useListClientsQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    initialFetchPolicy: 'network-only',
  });
  const [loadDelete, { error, loading }] = useDeleteClientMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
  });

  async function handleDeleteClient(id: string) {
    await loadDelete({ variables: { deleteClientId: id } });

    if (!error) {
      refetch();
    }
  }

  function handleGoToUpdate(clientId: string) {
    navigate('clientUpdate', { id: clientId });
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
      <Header title="Clientes" />

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
            Erro ao carregar os clientes
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ padding: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48 }}
          data={data?.listClients.clients}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider bg="gray.600" />}
          renderItem={({ item }) => (
            <VStack py="5" justifyContent="space-between">
              <VStack>
                <Heading
                  color="darkBlue.400"
                  fontFamily="heading"
                  fontWeight={500}
                  fontSize="md"
                >
                  {item.name}
                </Heading>

                <Text
                  color="gray.200"
                  fontFamily="heading"
                  fontWeight={300}
                  fontSize="sm"
                >
                  {item.email}
                </Text>

                {item.contact && (
                  <Text
                    color="gray.400"
                    fontFamily="heading"
                    fontWeight={300}
                    fontSize="sm"
                  >
                    {item.contact}
                  </Text>
                )}

                {item.phoneNumber && (
                  <Text
                    color="gray.400"
                    fontFamily="heading"
                    fontWeight={300}
                    fontSize="sm"
                  >
                    {item.phoneNumber}
                  </Text>
                )}
              </VStack>

              <HStack mt="5" justifyContent="space-between">
                <VStack maxW="45%">
                  {!!item.document && (
                  <Box>
                    <Heading
                      color="gray.100"
                      fontFamily="heading"
                      fontWeight={400}
                      fontSize="md"
                    >
                      CPF / CNPJ
                    </Heading>
                    <Text
                      color="gray.300"
                      fontFamily="heading"
                      fontWeight={300}
                      fontSize="sm"
                      mb="1"
                    >
                      {item.document}
                    </Text>
                  </Box>
                  )}

                  {item.stateRegistration && (
                  <Box>
                    <Heading
                      color="gray.100"
                      fontFamily="heading"
                      fontWeight={400}
                      fontSize="md"
                    >
                      Inscrição estadual
                    </Heading>
                    <Text
                      color="gray.300"
                      fontFamily="heading"
                      fontWeight={300}
                      fontSize="sm"
                    >
                      {item.stateRegistration}
                    </Text>
                  </Box>
                  )}
                </VStack>

                <VStack maxW="50%">
                  <HStack>
                    <Text
                      color="gray.200"
                      fontFamily="heading"
                      fontWeight={300}
                      fontSize="md"
                    >
                      {item.address[0].street}
                    </Text>

                    {item.address[0].number && (
                    <Text
                      color="gray.200"
                      fontFamily="heading"
                      fontWeight={300}
                      fontSize="md"
                    >
                      {' '}
                      -
                      {' '}
                      {item.address[0].number}
                    </Text>
                    )}
                  </HStack>

                  {item.address[0].district && (
                    <Text
                      color="gray.400"
                      fontFamily="heading"
                      fontWeight={300}
                      fontSize="md"
                    >
                      {item.address[0].district}
                    </Text>
                  )}

                  <HStack>
                    {item.address[0].city && (
                      <Text
                        color="gray.400"
                        fontFamily="heading"
                        fontWeight={300}
                        fontSize="md"
                      >
                        {item.address[0].city}
                      </Text>
                    )}
                    {item.address[0].state && (
                      <Text
                        color="gray.400"
                        fontFamily="heading"
                        fontWeight={300}
                        fontSize="md"
                      >
                        {' '}
                        -
                        {' '}
                        {item.address[0].state}
                      </Text>
                    )}
                  </HStack>

                  {item.address[0].cep && (
                  <Text
                    color="gray.500"
                    fontFamily="heading"
                    fontWeight={300}
                    fontSize="md"
                  >
                    {item.address[0].cep}
                  </Text>
                  )}
                </VStack>
              </HStack>

              <HStack mt="5" space="2" alignSelf="flex-end">
                <Button isLoading={loading} onPress={() => handleGoToUpdate(item.id)} colorScheme="darkBlue">
                  <Icon as={Feather} name="edit-2" color="gray.50" size="4" />
                </Button>

                <Button isLoading={loading} onPress={() => handleDeleteClient(item.id)} colorScheme="error">
                  <Icon as={Feather} name="trash-2" color="gray.50" size="4" />
                </Button>
              </HStack>
            </VStack>
          )}
        />
      )}
    </Box>
  );
}
