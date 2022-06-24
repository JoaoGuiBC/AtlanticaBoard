import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiDeleteBinLine,
  RiPencilLine,
} from 'react-icons/ri';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
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
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { useAuth } from '@contexts/AuthContext';
import {
  useCreateOrderMutation,
  useDeleteBudgetMutation,
  useGetBudgetQuery,
} from '@graphql/generated/graphql';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import {
  Budget,
  EditBudgetInfoModal,
} from '@components/Modals/EditBudgetInfoModal';

export function BudgetDetail() {
  const [selectedBudget, setSelectedBudget] = useState<Budget>();

  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logOut } = useAuth();
  const toast = useToast();

  const {
    data,
    refetch,
    loading: listLoading,
    error: listError,
  } = useGetBudgetQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { getBudgetId: searchParams.get('id') || '' },
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

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleOpenModal(budget: Budget) {
    setSelectedBudget(budget);

    onOpen();
  }

  function handleCloseModal() {
    setSelectedBudget(undefined);

    onClose();
  }

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

      <EditBudgetInfoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        refetch={refetch}
        budget={selectedBudget}
      />

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={4} bg="gray.800" p="8">
            <Flex mb="8" justify="flex-start" align="center">
              <RouterLink to="/orcamentos">
                <Button
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  borderRadius={4}
                  leftIcon={<Icon as={RiArrowLeftLine} fontSize="20" />}
                >
                  Voltar
                </Button>
              </RouterLink>
            </Flex>

            {listLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : listError ? (
              <Flex justify="center">
                <Text>Falha ao obter dados do orçamento.</Text>
              </Flex>
            ) : (
              <Flex
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                py="5"
              >
                <VStack
                  spacing="0"
                  flex={1}
                  align="flex-start"
                  alignSelf="flex-start"
                >
                  <Text fontSize="xx-large">
                    Orçamento {data?.getBudget.serialNumber}
                  </Text>
                  <Text fontWeight="light" fontSize="md">
                    Gerado em:{' '}
                    {format(parseISO(data?.getBudget.created_at), 'dd/MM/yyyy')}
                  </Text>
                  {data?.getBudget.deadline && (
                    <Text fontWeight="light" fontSize="md">
                      Prazo de entrega:{' '}
                      {format(parseISO(data?.getBudget.deadline), 'dd/MM/yyyy')}
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
                      <Text fontSize="lg">{data?.getBudget.client.name}</Text>
                      <Text fontWeight="light" color="gray.200" fontSize="md">
                        {data?.getBudget.client.email}
                      </Text>
                      <Text fontWeight="light" color="gray.300" fontSize="md">
                        {data?.getBudget.client.contact}
                      </Text>
                      <Text fontWeight="light" color="gray.300" fontSize="md">
                        {data?.getBudget.client.phoneNumber}
                      </Text>
                    </VStack>

                    {isWideVersion && (
                      <VStack spacing="0" align="flex-start">
                        <Heading fontSize="2xl">Info. produtos</Heading>
                        <Text fontSize="md">
                          Quantidade: {data?.getBudget.products.length}
                        </Text>

                        {data?.getBudget.color && (
                          <Text
                            fontWeight="light"
                            color="gray.200"
                            fontSize="md"
                            maxW="64"
                          >
                            info: {data?.getBudget.color}
                          </Text>
                        )}
                      </VStack>
                    )}
                  </HStack>
                  <VStack spacing="1" align="flex-start" paddingTop="20">
                    <Text fontSize="md">
                      Subtotal: {currencyFormatter(data?.getBudget.price)}
                    </Text>
                    <Text fontSize="md">
                      Desconto: {currencyFormatter(data?.getBudget.discount)}
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      Preço final:{' '}
                      {data?.getBudget.discount
                        ? currencyFormatter(
                            (data?.getBudget.price || 0) -
                              (data?.getBudget.discount || 0),
                          )
                        : currencyFormatter(data?.getBudget.price)}
                    </Text>
                  </VStack>

                  <Flex paddingTop="14" wrap="wrap" maxWidth="32" gap="0.5rem">
                    <Button
                      size="sm"
                      w="100%"
                      fontSize="sm"
                      borderRadius={4}
                      colorScheme="blue"
                      onClick={() => handleOpenModal(data?.getBudget!)}
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
                      onClick={() => handleDeleteBudget(data?.getBudget.id!)}
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
                      onClick={() => handleCreateOrder(data?.getBudget.id!)}
                      leftIcon={<Icon as={RiCheckLine} fontSize="16" />}
                    >
                      Aprovar
                    </Button>
                  </Flex>
                </VStack>

                <Box>
                  <Heading fontSize="2xl" mb="4">
                    {data?.getBudget.products.length === 1
                      ? 'Produto'
                      : 'Produtos'}
                  </Heading>
                  <VStack
                    w="96"
                    maxH="xl"
                    overflow="auto"
                    alignSelf="center"
                    spacing="8"
                    divider={<StackDivider borderColor="gray.600" />}
                  >
                    {data?.getBudget.products.map((product, index) => (
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

                        <Text>Preço: {currencyFormatter(product.price)}</Text>
                      </VStack>
                    ))}
                  </VStack>
                </Box>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
