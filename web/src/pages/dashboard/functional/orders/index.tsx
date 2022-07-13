import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
  RiCheckLine,
  RiDeleteBinLine,
  RiCheckFill,
  RiCloseFill,
  RiArticleLine,
  RiEdit2Line,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  StackDivider,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { Pagination } from '@components/Pagination';
import { useAuth } from '@contexts/AuthContext';
import {
  useDeleteOrderMutation,
  useFinishOrderMutation,
  useListOrdersQuery,
} from '@graphql/generated/graphql';

import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { checkIsDeadlineClose } from '@utils/checkIsDeadlineClose';

export function OrderList() {
  const [page, setPage] = useState(1);

  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data,
    refetch,
    error: listError,
  } = useListOrdersQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    initialFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
  });

  const [loadDelete, { error, loading }] = useDeleteOrderMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
  });

  const [loadFinish] = useFinishOrderMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onError: err =>
      toast({
        title: 'Erro',
        description: err.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      }),
  });

  async function handleDeleteOrder(id: string) {
    await loadDelete({ variables: { deleteOrderId: id } });

    if (!error) {
      refetch();
    }
  }

  async function handleFinishOrder(id: string) {
    await loadFinish({ variables: { finishOrderId: id } });

    if (!error) {
      refetch();
    }
  }

  function handleSelectOrder(id: string) {
    navigate(`/pedidos/pedido?id=${id}`);
  }
  function handleGenerateOrderPDF(id: string) {
    navigate(`/pedidos/pdf?id=${id}`);
  }
  function handleSignOrder(clientId: string, orderId: string) {
    navigate(`/assinarPedido?cliente=${clientId}&pedido=${orderId}`);
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    if (listError || error) {
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
  }, [listError, error]);

  return (
    <>
      <Header />

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={4} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Pedidos
              </Heading>
            </Flex>

            {listError ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos pedidos.</Text>
              </Flex>
            ) : !data ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <>
                <VStack divider={<StackDivider borderColor="gray.600" />}>
                  {data.listOrders.orders.map(order => (
                    <Flex
                      w="100%"
                      alignItems="center"
                      gap={isWideVersion ? '32' : '10'}
                      key={order.id}
                    >
                      <Flex
                        as="button"
                        flex="1"
                        py="5"
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => handleSelectOrder(order.id)}
                      >
                        <VStack
                          alignItems="flex-start"
                          spacing="5"
                          alignSelf="flex-start"
                        >
                          <VStack spacing="0" alignItems="flex-start">
                            <HStack>
                              <Text fontSize="2xl">
                                Pedido {order.serialNumber}
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight="light"
                                color="gray.100"
                              >
                                - orçamento {order.budgetSerialNumber}
                              </Text>
                            </HStack>

                            {order.deadline && (
                              <Text
                                fontWeight="light"
                                fontSize="md"
                                color={
                                  checkIsDeadlineClose(order.deadline)
                                    ? 'red.500'
                                    : 'gray.200'
                                }
                              >
                                Prazo de entrega:{' '}
                                {format(parseISO(order.deadline), 'dd/MM/yyyy')}
                              </Text>
                            )}
                          </VStack>

                          <VStack spacing="0" alignItems="flex-start">
                            <Heading fontWeight="normal" fontSize="xl">
                              Cliente
                            </Heading>
                            <Text
                              fontSize="md"
                              fontWeight="light"
                              color="gray.200"
                            >
                              {order.client.name}
                            </Text>
                          </VStack>

                          <HStack alignItems="center" gap="0">
                            <Text
                              fontSize="md"
                              fontWeight="normal"
                              color="gray.100"
                            >
                              Assinado:
                            </Text>

                            {order.signed ? (
                              <Icon
                                as={RiCheckFill}
                                fontSize="24"
                                color="green.500"
                              />
                            ) : (
                              <Icon
                                as={RiCloseFill}
                                fontSize="24"
                                color="red.500"
                              />
                            )}
                          </HStack>

                          <HStack alignItems="center" gap="0">
                            <Text
                              fontSize="2xl"
                              fontWeight="normal"
                              color="gray.50"
                            >
                              Concluído:
                            </Text>

                            {order.finished_at ? (
                              <Icon
                                as={RiCheckFill}
                                fontSize="32"
                                color="green.500"
                              />
                            ) : (
                              <Icon
                                as={RiCloseFill}
                                fontSize="32"
                                color="red.500"
                              />
                            )}
                          </HStack>
                        </VStack>

                        <VStack spacing="0" align="flex-start">
                          <Text
                            fontWeight="bold"
                            fontSize="lg"
                            textAlign="left"
                            mb="2"
                          >
                            Preço:
                            <Text fontWeight="normal">
                              {order.discount
                                ? currencyFormatter(
                                    order.price - order.discount,
                                  )
                                : currencyFormatter(order.price)}
                            </Text>
                          </Text>

                          <Heading fontWeight="normal" fontSize="xl">
                            Info. produtos
                          </Heading>
                          <Text
                            fontSize="md"
                            fontWeight="light"
                            color="gray.200"
                          >
                            Quantidade: {order.products.length}
                          </Text>
                          {order.color && (
                            <Box>
                              <Text
                                fontWeight="light"
                                color="gray.200"
                                fontSize="md"
                                maxW="56"
                                textAlign="left"
                              >
                                info adicional:
                              </Text>
                              <Text
                                fontWeight="light"
                                color="gray.400"
                                fontSize="md"
                                maxW="56"
                                textAlign="left"
                              >
                                {order.color}
                              </Text>
                            </Box>
                          )}
                        </VStack>
                      </Flex>

                      <Flex wrap="wrap" maxWidth="32" gap="0.5rem">
                        <Button
                          size="sm"
                          w="100%"
                          fontSize="sm"
                          colorScheme="blue"
                          borderRadius={4}
                          leftIcon={<Icon as={RiArticleLine} fontSize="20" />}
                          onClick={() => handleGenerateOrderPDF(order.id)}
                        >
                          Gerar PDF
                        </Button>
                        <Button
                          size="sm"
                          w="100%"
                          fontSize="sm"
                          colorScheme="teal"
                          borderRadius={4}
                          leftIcon={<Icon as={RiEdit2Line} fontSize="20" />}
                          onClick={() =>
                            handleSignOrder(order.client.id, order.id)
                          }
                        >
                          Assinar
                        </Button>
                        <Button
                          size="sm"
                          w="100%"
                          fontSize="sm"
                          borderRadius={4}
                          colorScheme="red"
                          isLoading={loading}
                          onClick={() => handleDeleteOrder(order.id)}
                          leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                        >
                          Excluir
                        </Button>
                        <Button
                          size="sm"
                          w="100%"
                          fontSize="sm"
                          borderRadius={4}
                          colorScheme="green"
                          onClick={() => handleFinishOrder(order.id)}
                          leftIcon={<Icon as={RiCheckLine} fontSize="16" />}
                        >
                          Concluir
                        </Button>
                      </Flex>
                    </Flex>
                  ))}
                </VStack>

                <Pagination
                  totalCountOfRegisters={data.listOrders.totalOrders || 0}
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
