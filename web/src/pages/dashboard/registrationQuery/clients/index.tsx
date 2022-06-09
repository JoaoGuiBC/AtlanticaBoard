import { useEffect, useState } from 'react';
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { useAuth } from '@contexts/AuthContext';
import {
  useDeleteClientMutation,
  useListClientsQuery,
} from '@graphql/generated/graphql';
import {
  Client,
  EditClientInfoModal,
} from '@components/Modals/EditClientInfoModal';
import { Pagination } from '@components/Pagination';

export function ClientList() {
  const [page, setPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logOut } = useAuth();
  const toast = useToast();

  const {
    data,
    loading: listLoading,
    error: listError,
    refetch,
  } = useListClientsQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    initialFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
  });

  const [loadDelete, { error, loading }] = useDeleteClientMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleOpenModal(client: Client) {
    setSelectedClient(client);

    onOpen();
  }

  async function handleDeleteClient(id: string) {
    await loadDelete({ variables: { deleteClientId: id } });

    if (!error) {
      refetch();
    }
  }

  useEffect(() => {
    if (listError) {
      toast({
        title: 'Erro',
        description: listError?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      if (
        listError?.message === 'Autenticação inválida, por favor refaça login'
      ) {
        logOut();
      }
    }
  }, [listError]);

  return (
    <>
      <Header />

      {isOpen && (
        <EditClientInfoModal
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetch}
          client={selectedClient}
        />
      )}

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={4} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Clientes
              </Heading>

              <RouterLink to="/clientes/criar">
                <Button
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  borderRadius={4}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo cliente
                </Button>
              </RouterLink>
            </Flex>

            {listLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : listError ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos clientes.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Cliente</Th>
                      <Th>Fiscal</Th>
                      <Th>Endereço</Th>
                      <Th width="8" />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.listClients.clients.map(client => (
                      <Tr key={client.id}>
                        <Td>
                          <Box>
                            <Text fontWeight="bold" color="blue.400">
                              {client.name}
                            </Text>
                            <Text fontSize="sm" color="gray.300">
                              {client.email}
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                              {client.contact}
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                              {client.phoneNumber}
                            </Text>
                          </Box>
                        </Td>

                        {/* {(client.document || client.stateRegistration) && ( */}
                        <Td>
                          {client.document && (
                            <>
                              <Text fontSize="sm" color="gray.100">
                                CPF / CNPJ
                              </Text>
                              <Text fontSize="sm" color="gray.400">
                                {client.document}
                              </Text>
                            </>
                          )}
                          {client.stateRegistration && (
                            <>
                              <Text fontSize="sm" color="gray.100" mt={2}>
                                Inscrição estadual
                              </Text>
                              <Text fontSize="sm" color="gray.400">
                                {client.stateRegistration}
                              </Text>
                            </>
                          )}
                        </Td>
                        {/* )} */}

                        <Td>
                          <Text fontSize="sm" color="gray.200">
                            {client.address[0].street}{' '}
                            {client.address[0].number &&
                              `- ${client.address[0].number}`}
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            {client.address[0].district}
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            {client.address[0].city}{' '}
                            {client.address[0].state &&
                              `- ${client.address[0].state}`}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            {client.address[0].cep}
                          </Text>
                        </Td>

                        <Td>
                          <VStack>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              w="100%"
                              borderRadius={4}
                              colorScheme="blue"
                              onClick={() => handleOpenModal(client)}
                              leftIcon={
                                isWideVersion ? (
                                  <Icon as={RiPencilLine} fontSize="16" />
                                ) : undefined
                              }
                            >
                              {isWideVersion ? (
                                'Editar'
                              ) : (
                                <Icon as={RiPencilLine} fontSize="16" />
                              )}
                            </Button>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              w="100%"
                              borderRadius={4}
                              colorScheme="red"
                              isLoading={loading}
                              onClick={() => handleDeleteClient(client.id)}
                              leftIcon={
                                isWideVersion ? (
                                  <Icon as={RiDeleteBinLine} fontSize="16" />
                                ) : undefined
                              }
                            >
                              {isWideVersion ? (
                                'Excluir'
                              ) : (
                                <Icon as={RiDeleteBinLine} fontSize="16" />
                              )}
                            </Button>
                          </VStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data?.listClients.totalClients || 0}
                  currentPage={page}
                  onPageChange={setPage}
                  registerPerPage={10}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
