import { useCallback, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box, Heading, Text, FlatList, VStack, Button, HStack, Icon, Divider, Spinner, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useDeleteClientMutation, useListClientsQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

type Address = {
  __typename?: 'Address';
  cep?: string | null;
  city?: string | null;
  district?: string | null;
  id: string;
  number?: number | null;
  state?: string | null;
  street: string | null;
};

export type Client = {
  __typename?: 'Client';
  address: Address[];
  contact?: string | null;
  document?: string | null;
  email: string;
  id: string;
  name: string;
  phoneNumber?: string | null;
  stateRegistration?: string | null;
};

export function ListClients() {
  const [page, setPage] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [clients, setClients] = useState<Client[]>([]);

  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, revalidate } = UseAuth();

  const {
    refetch,
    loading: listLoading,
    error: listError,
  } = useListClientsQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    initialFetchPolicy: 'network-only',
    onCompleted(data) {
      setClients([...clients, ...data.listClients.clients]);
      setTotalClients(data.listClients.totalClients);
    },
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

  function handleFetchMore() {
    if (totalClients !== clients.length) {
      setPage(page + 1);
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
      setClients([]);
      setTotalClients(0);
      setPage(1);
      refetch();
    }, []),
  );

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Clientes" />

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
            Erro ao carregar os clientes
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ padding: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48, minHeight: '100%' }}
          data={clients}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider bg="gray.600" />}
          onEndReached={handleFetchMore}
          ListEmptyComponent={() => (
            <Box mb="24" flex={1} alignItems="center" justifyContent="center">
              <Spinner color="darkBlue.500" size="lg" />
            </Box>
          )}
          ListFooterComponentStyle={{ marginTop: 10 }}
          ListFooterComponent={totalClients !== clients.length ? () => (
            <Spinner color="darkBlue.500" size="lg" />
          ) : undefined}
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
                  <HStack flexWrap="wrap">
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
                <Button onPress={() => handleGoToUpdate(item.id)} colorScheme="darkBlue">
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
