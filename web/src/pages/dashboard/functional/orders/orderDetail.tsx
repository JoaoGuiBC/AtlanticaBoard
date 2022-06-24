import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import {
  RiArrowLeftLine,
  RiArticleLine,
  RiCheckFill,
  RiCheckLine,
  RiCloseFill,
  RiDeleteBinLine,
  RiEdit2Line,
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
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { useAuth } from '@contexts/AuthContext';
import {
  useDeleteOrderMutation,
  useFinishOrderMutation,
  useGetOrderQuery,
} from '@graphql/generated/graphql';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { checkIsDeadlineClose } from '@utils/checkIsDeadlineClose';

export function OrderDetail() {
  const [searchParams] = useSearchParams();
  const { user, logOut } = useAuth();
  const toast = useToast();

  const {
    data,
    refetch,
    error: listError,
  } = useGetOrderQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { getOrderId: searchParams.get('id') || '' },
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
            <Flex mb="8" justify="flex-start" align="center">
              <RouterLink to="/pedidos">
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

            {listError ? (
              <Flex justify="center">
                <Text>Falha ao obter dados do orçamento.</Text>
              </Flex>
            ) : !data ? (
              <Flex justify="center">
                <Spinner />
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
                  <HStack>
                    <Text fontSize="xx-large">
                      Pedido {data.getOrder.serialNumber}
                    </Text>
                    <Text fontSize="xl" fontWeight="light" color="gray.100">
                      - orçamento {data.getOrder.budgetSerialNumber}
                    </Text>
                  </HStack>

                  {data.getOrder.deadline && (
                    <Text
                      fontWeight="light"
                      fontSize="md"
                      color={
                        checkIsDeadlineClose(data.getOrder.deadline)
                          ? 'red.500'
                          : 'gray.200'
                      }
                    >
                      Prazo de entrega:{' '}
                      {format(parseISO(data.getOrder.deadline), 'dd/MM/yyyy')}
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
                      <Text fontSize="lg">{data.getOrder.client.name}</Text>
                      <Text fontWeight="light" color="gray.200" fontSize="md">
                        {data.getOrder.client.email}
                      </Text>
                      <Text fontWeight="light" color="gray.300" fontSize="md">
                        {data.getOrder.client.contact}
                      </Text>
                      <Text fontWeight="light" color="gray.300" fontSize="md">
                        {data.getOrder.client.phoneNumber}
                      </Text>
                    </VStack>

                    {isWideVersion && (
                      <VStack spacing="0" align="flex-start">
                        <Heading fontSize="2xl">Info. produtos</Heading>
                        <Text fontSize="md">
                          Quantidade: {data.getOrder.products.length}
                        </Text>

                        {data.getOrder.color && (
                          <Text
                            fontWeight="light"
                            color="gray.200"
                            fontSize="md"
                            maxW="64"
                          >
                            info adicional: {data.getOrder.color}
                          </Text>
                        )}
                      </VStack>
                    )}
                  </HStack>

                  <VStack alignItems="flex-start" pt="6">
                    <HStack alignItems="center" gap="0">
                      <Text fontSize="md" fontWeight="normal" color="gray.100">
                        Assinado:
                      </Text>

                      {data.getOrder.signed ? (
                        <Icon
                          as={RiCheckFill}
                          fontSize="24"
                          color="green.500"
                        />
                      ) : (
                        <Icon as={RiCloseFill} fontSize="24" color="red.500" />
                      )}
                    </HStack>

                    <HStack alignItems="center" gap="0">
                      <Text fontSize="2xl" fontWeight="normal" color="gray.50">
                        Concluído:
                      </Text>

                      {data.getOrder.finished_at ? (
                        <Icon
                          as={RiCheckFill}
                          fontSize="32"
                          color="green.500"
                        />
                      ) : (
                        <Icon as={RiCloseFill} fontSize="32" color="red.500" />
                      )}
                    </HStack>
                  </VStack>

                  <Text fontWeight="medium" fontSize="xl" pt="10">
                    Preço:{' '}
                    {data.getOrder.discount
                      ? currencyFormatter(
                          (data.getOrder.price || 0) -
                            (data.getOrder.discount || 0),
                        )
                      : currencyFormatter(data.getOrder.price)}
                  </Text>

                  <Flex paddingTop="14" wrap="wrap" maxWidth="72" gap="0.5rem">
                    <Button
                      size="sm"
                      w="32"
                      fontSize="sm"
                      lineHeight="16"
                      borderRadius={4}
                      colorScheme="blue"
                      leftIcon={<Icon as={RiArticleLine} fontSize="16" />}
                    >
                      Gerar PDF
                    </Button>
                    <Button
                      size="sm"
                      w="32"
                      fontSize="sm"
                      lineHeight="16"
                      borderRadius={4}
                      colorScheme="teal"
                      leftIcon={<Icon as={RiEdit2Line} fontSize="16" />}
                    >
                      Assinar
                    </Button>

                    <Button
                      size="sm"
                      w="32"
                      fontSize="sm"
                      lineHeight="16"
                      borderRadius={4}
                      colorScheme="red"
                      isLoading={loading}
                      onClick={() => handleDeleteOrder(data.getOrder.id)}
                      leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                    >
                      Excluir
                    </Button>
                    <Button
                      size="sm"
                      w="32"
                      fontSize="sm"
                      lineHeight="16"
                      borderRadius={4}
                      colorScheme="green"
                      onClick={() => handleFinishOrder(data.getOrder.id)}
                      leftIcon={<Icon as={RiCheckLine} fontSize="16" />}
                    >
                      Concluir
                    </Button>
                  </Flex>
                </VStack>

                <Box>
                  <Heading fontSize="2xl" mb="4">
                    {data.getOrder.products.length === 1
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
                    {data.getOrder.products.map((product, index) => (
                      <VStack key={product.id}>
                        <Text color="blue.300">
                          {index + 1} - {product.product.name}
                        </Text>

                        <HStack spacing="4">
                          <Flex flexDir="column" alignItems="center">
                            <Text fontSize="16" color="gray.500">
                              BASE
                            </Text>
                            <Text>{product.base}</Text>
                          </Flex>

                          <Text>X</Text>

                          <Flex flexDir="column" alignItems="center">
                            <Text fontSize="16" color="gray.500">
                              ALTURA
                            </Text>
                            <Text>{product.height}</Text>
                          </Flex>

                          <Text>=</Text>

                          <Text>{product.height * product.base}</Text>
                        </HStack>
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
