import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { RiAddLine, RiArticleLine, RiCheckLine, RiDeleteBinLine } from 'react-icons/ri';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
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
  useCreateOrderMutation,
  useDeleteBudgetMutation,
  useListBudgetsQuery,
} from '@graphql/generated/graphql';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

export function BudgetList() {
  const [page, setPage] = useState(1);

  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data,
    refetch,
    loading: listLoading,
    error: listError,
  } = useListBudgetsQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    initialFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
  });

  const [loadDelete, { error, loading }] = useDeleteBudgetMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
  });
  const [loadCreateOrder] = useCreateOrderMutation({
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

  async function handleDeleteBudget(id: string) {
    await loadDelete({ variables: { deleteBudgetId: id } });

    if (!error) {
      refetch();
    }
  }

  async function handleCreateOrder(id: string) {
    await loadCreateOrder({ variables: { budgetId: id } });
  }
  function handleGenerateBudgetPDF(id: string) {
    navigate(`/orcamentos/pdf?id=${id}`);
  }
  function handleSelectBudget(id: string) {
    navigate(`/orcamentos/orcamento?id=${id}`);
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
                Orçamentos
              </Heading>

              <RouterLink to="/orcamentos/criar">
                <Button
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  borderRadius={4}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo orçamento
                </Button>
              </RouterLink>
            </Flex>

            {listLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : listError ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos orçamentos.</Text>
              </Flex>
            ) : (
              <>
                <VStack divider={<StackDivider borderColor="gray.600" />}>
                  {data?.listBudgets.budgets.map(budget => (
                    <Flex w="100%" alignItems="center" gap="10" key={budget.id}>
                      <Flex
                        as="button"
                        flex="1"
                        py="5"
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => handleSelectBudget(budget.id)}
                      >
                        <VStack alignItems="flex-start" spacing="5">
                          <VStack spacing="0" alignItems="flex-start">
                            <Text fontSize="2xl">
                              Orçamento {budget.serialNumber}
                            </Text>
                            <Text
                              fontWeight="light"
                              fontSize="md"
                              color="gray.200"
                            >
                              Gerado em:{' '}
                              {format(
                                parseISO(budget.created_at),
                                'dd/MM/yyyy',
                              )}
                            </Text>
                            {budget.deadline && (
                              <Text
                                fontWeight="light"
                                fontSize="md"
                                color="gray.200"
                              >
                                Prazo de entrega:{' '}
                                {format(
                                  parseISO(budget.deadline),
                                  'dd/MM/yyyy',
                                )}
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
                              {budget.client.name}
                            </Text>
                          </VStack>
                        </VStack>

                        {isWideVersion && (
                          <VStack spacing="0" align="flex-start">
                            <Heading fontWeight="normal" fontSize="xl">
                              Info. produtos
                            </Heading>
                            <Text
                              fontSize="md"
                              fontWeight="light"
                              color="gray.200"
                            >
                              Quantidade: {budget.products.length}
                            </Text>
                            {budget.color && (
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
                                  {budget.color}
                                </Text>
                              </Box>
                            )}
                          </VStack>
                        )}

                        <VStack spacing="1" align="flex-start">
                          <Text fontSize="md">
                            Subtotal: {currencyFormatter(budget.price)}
                          </Text>
                          <Text fontSize="md">
                            Desconto: {currencyFormatter(budget.discount)}
                          </Text>
                          <Text fontWeight="bold" fontSize="lg">
                            Preço final:{' '}
                            {budget.discount
                              ? currencyFormatter(
                                  budget.price - budget.discount,
                                )
                              : currencyFormatter(budget.price)}
                          </Text>
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
                          onClick={() => handleGenerateBudgetPDF(budget.id)}
                        >
                          Gerar PDF
                        </Button>
                        <Button
                          size="sm"
                          w="100%"
                          fontSize="sm"
                          borderRadius={4}
                          colorScheme="red"
                          isLoading={loading}
                          onClick={() => handleDeleteBudget(budget.id)}
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
                          onClick={() => handleCreateOrder(budget.id)}
                          leftIcon={<Icon as={RiCheckLine} fontSize="16" />}
                        >
                          Aprovar
                        </Button>
                      </Flex>
                    </Flex>
                  ))}
                </VStack>

                <Pagination
                  totalCountOfRegisters={data?.listBudgets.totalBudgets || 0}
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
