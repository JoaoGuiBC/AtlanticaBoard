import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import {
  RiAddLine,
  RiCheckLine,
  RiDeleteBinLine,
  RiPencilLine,
} from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';
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
import { useAuth } from '@contexts/AuthContext';
import {
  useDeleteBudgetMutation,
  useListBudgetsQuery,
} from '@graphql/generated/graphql';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

export function BudgetList() {
  const { user, logOut } = useAuth();
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

  async function handleDeleteBudget(id: string) {
    await loadDelete({ variables: { deleteBudgetId: id } });

    if (!error) {
      refetch();
    }
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
                <Text>Falha ao obter dados dos produtos.</Text>
              </Flex>
            ) : (
              <VStack divider={<StackDivider borderColor="gray.600" />}>
                {data?.listBudgets.map(budget => (
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    py="5"
                    key={budget.id}
                  >
                    <VStack
                      spacing="0"
                      flex={1}
                      align="flex-start"
                      alignSelf="flex-start"
                    >
                      <Text fontSize="xx-large">
                        Orçamento {budget.serialNumber}
                      </Text>
                      <Text fontWeight="light" fontSize="md">
                        Gerado em:{' '}
                        {format(parseISO(budget.created_at), 'dd/MM/yyyy')}
                      </Text>
                      {budget.deadline && (
                        <Text fontWeight="light" fontSize="md">
                          Prazo de entrega:{' '}
                          {format(parseISO(budget.deadline), 'dd/MM/yyyy')}
                        </Text>
                      )}
                      <HStack
                        justify="space-between"
                        w="100%"
                        pr="10"
                        paddingTop="20"
                      >
                        <VStack spacing="0" align="flex-start">
                          <Heading fontSize="2xl">Cliente</Heading>
                          <Text fontSize="lg">{budget.client.name}</Text>
                          <Text
                            fontWeight="light"
                            color="gray.200"
                            fontSize="md"
                          >
                            {budget.client.email}
                          </Text>
                          <Text
                            fontWeight="light"
                            color="gray.300"
                            fontSize="md"
                          >
                            {budget.client.contact}
                          </Text>
                          <Text
                            fontWeight="light"
                            color="gray.300"
                            fontSize="md"
                          >
                            {budget.client.phoneNumber}
                          </Text>
                        </VStack>

                        {isWideVersion && (
                          <VStack spacing="0" align="flex-start">
                            <Heading fontSize="2xl">Info. produtos</Heading>
                            <Text fontSize="md">
                              Quantidade: {budget.products.length}
                            </Text>

                            {budget.color && (
                              <Text
                                fontWeight="light"
                                color="gray.200"
                                fontSize="md"
                                maxW="64"
                              >
                                info: {budget.color}
                              </Text>
                            )}
                          </VStack>
                        )}
                      </HStack>
                      <VStack spacing="1" align="flex-start" paddingTop="20">
                        <Text fontSize="md">
                          Subtotal: {currencyFormatter(budget.price)}
                        </Text>
                        <Text fontSize="md">
                          Desconto: {currencyFormatter(budget.discount)}
                        </Text>
                        <Text fontWeight="bold" fontSize="lg">
                          Preço final:{' '}
                          {budget.discount
                            ? currencyFormatter(budget.price - budget.discount)
                            : currencyFormatter(budget.price)}
                        </Text>
                      </VStack>

                      <Flex
                        paddingTop="14"
                        wrap="wrap"
                        maxWidth="32"
                        gap="0.5rem"
                      >
                        <Button
                          size="sm"
                          w="100%"
                          fontSize="sm"
                          borderRadius={4}
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        >
                          Editar
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
                          leftIcon={<Icon as={RiCheckLine} fontSize="16" />}
                        >
                          Aprovar
                        </Button>
                      </Flex>
                    </VStack>

                    <Box>
                      <Heading fontSize="2xl" mb="4">
                        {budget.products.length === 1 ? 'Produto' : 'Produtos'}
                      </Heading>
                      <VStack
                        w="96"
                        maxH="xl"
                        overflow="auto"
                        alignSelf="center"
                        spacing="8"
                        divider={<StackDivider borderColor="gray.600" />}
                      >
                        {budget.products.map((product, index) => (
                          <VStack key={product.id}>
                            <Text color="blue.300">
                              {index + 1} - {product.product.name}
                            </Text>

                            <HStack spacing="4">
                              <Flex flexDir="column" alignItems="center">
                                <Text fontSize="10" color="gray.500">
                                  BASE
                                </Text>
                                <Text>{product.base}</Text>
                              </Flex>

                              <Text>X</Text>

                              <Flex flexDir="column" alignItems="center">
                                <Text fontSize="10" color="gray.500">
                                  ALTURA
                                </Text>
                                <Text>{product.height}</Text>
                              </Flex>

                              <Text>=</Text>

                              <Text>{product.height * product.base}</Text>
                            </HStack>

                            <Text>
                              Preço: {currencyFormatter(product.price)}
                            </Text>
                          </VStack>
                        ))}
                      </VStack>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
