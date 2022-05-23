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
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import {
  useDeleteProductMutation,
  useListProductsQuery,
} from '@graphql/generated/graphql';
import { useAuth } from '@contexts/AuthContext';
import {
  Product,
  EditProductInfoModal,
} from '@components/Modals/EditProductInfoModal';
import { Pagination } from '@components/Pagination';

export function ProductList() {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logOut } = useAuth();
  const toast = useToast();

  const {
    data,
    loading: listLoading,
    error: listError,
    refetch,
  } = useListProductsQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { take: 10, skip: (page - 1) * 10 },
    initialFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
  });

  const [loadDelete, { error, loading }] = useDeleteProductMutation({
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

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);

    onOpen();
  }

  async function handleDeleteProduct(id: string) {
    await loadDelete({ variables: { deleteProductId: id } });

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
        <EditProductInfoModal
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetch}
          product={selectedProduct}
        />
      )}

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={4} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Produtos
              </Heading>

              <RouterLink to="/produtos/criar">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  borderRadius={4}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo produto
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
              <>
                <VStack>
                  {data?.listProducts.products.map(product => (
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      borderTop="1px"
                      py="5"
                      borderColor="gray.600"
                      key={product.id}
                    >
                      <VStack pr="5" alignItems="flex-start">
                        <Text fontWeight="bold" color="blue.400">
                          {product.name}
                        </Text>

                        <Text fontWeight="medium" color="gray.400">
                          Valor:{' '}
                          <Text as="span" fontWeight="light" color="gray.200">
                            R$ {product.price}
                          </Text>
                        </Text>

                        {product.cost && (
                          <Text fontWeight="medium" color="gray.400">
                            Custo:{' '}
                            <Text as="span" fontWeight="light" color="gray.200">
                              R$ {product.cost}
                            </Text>
                          </Text>
                        )}

                        {product.description && (
                          <Text fontWeight="normal" color="gray.200">
                            {product.description}
                          </Text>
                        )}
                      </VStack>

                      <VStack>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          w="100%"
                          borderRadius={4}
                          colorScheme="blue"
                          onClick={() => handleOpenModal(product)}
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
                          onClick={() => handleDeleteProduct(product.id)}
                          isLoading={loading}
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
                    </Flex>
                  ))}
                </VStack>

                <Pagination
                  totalCountOfRegisters={data?.listProducts.totalProducts || 0}
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
