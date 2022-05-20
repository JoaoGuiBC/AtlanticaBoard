import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine, RiFileAddLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  StackDivider,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Input } from '@components/Form/Input';
import { Sidebar } from '@components/Sidebar';
import { useAuth } from '@contexts/AuthContext';
import {
  useCreateBudgetMutation,
  useListClientsQuery,
} from '@graphql/generated/graphql';
import { Select } from '@components/Form/Select';
import { Option } from '@components/Form/Select/Option';
import { FieldMarker } from '@components/Form/FieldMarker';
import {
  AddProductToBudgetModal,
  Product,
} from '@components/Modals/AddProductToBudgetModal';
import {
  CreateBudgetFormData,
  schema,
} from '@utils/schemas/budget/createBudgetSchema';

export interface SelectedProductData extends Product {
  instanceId: number;
  base: number;
  height: number;
}

export function CreateBudget() {
  const [price, setPrice] = useState(0);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedproducts, setSelectedProducts] = useState<
    SelectedProductData[]
  >([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logOut, revalidate } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data: listData,
    loading: listLoading,
    error: listError,
  } = useListClientsQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
  });

  const [loadCreate, { error, loading }] = useCreateBudgetMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: () => navigate('/orcamentos'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchDiscount = watch('discount');

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handleOnSubmit(data: CreateBudgetFormData) {
    const parsedProducts = selectedproducts.map(product => ({
      base: product.base,
      height: product.height,
      productId: product.id,
      price: product.base * product.height * product.price,
    }));

    await revalidate(user);
    await loadCreate({
      variables: {
        data: {
          ...data,
          products: parsedProducts,
          deadline: data.deadline ? new Date(data.deadline) : null,
        },
      },
    });
  }

  function handleAddProduct(product: SelectedProductData) {
    const productPrice = product.price * (product.base * product.height);

    setPrice(price + productPrice);
    setSelectedProducts([...selectedproducts, product]);
  }
  function handleRemoveProduct(productId: number) {
    const newProductList = selectedproducts.filter(product => {
      if (product.instanceId !== productId) {
        return product;
      }
      const productPrice = product.price * (product.base * product.height);
      setPrice(price - productPrice);

      return undefined;
    });
    setSelectedProducts(newProductList);
  }

  const onSubmit = (data: any) => handleOnSubmit(data);

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
        listError?.message ===
          'Autenticação inválida, por favor refaça login' ||
        error?.message === 'Autenticação inválida, por favor refaça login'
      ) {
        logOut();
      }
    }
  }, [listError, error]);

  return (
    <>
      <Header />

      <AddProductToBudgetModal
        isOpen={isOpen}
        onClose={onClose}
        onAddProduct={handleAddProduct}
      />

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={4}
            bg="gray.800"
            p={['6', '8']}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading size="lg" fontWeight="normal">
              Criar orçamento
            </Heading>

            <Divider my="6" borderColor="gray.600" />

            <Select
              label="Cliente"
              placeholder="Selecione um cliente"
              {...register('clientId', {
                onChange: e => setSelectedClient(e.currentTarget.value),
              })}
            >
              {!listLoading &&
                !listError &&
                listData?.listClients.map(client => (
                  <Option
                    key={client.id}
                    text={client.name}
                    value={client.id}
                  />
                ))}
            </Select>

            {selectedClient && (
              <>
                <FieldMarker title="Info. produto" />

                <Button
                  size="md"
                  fontSize="md"
                  w="16rem"
                  borderRadius={4}
                  colorScheme="blue"
                  onClick={() => onOpen()}
                  leftIcon={<Icon as={RiFileAddLine} fontSize="20" />}
                >
                  Adicionar produto
                </Button>

                <VStack
                  spacing="2"
                  divider={<StackDivider borderColor="gray.600" />}
                >
                  {selectedproducts.map(product => (
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      py="5"
                      key={product.instanceId}
                    >
                      <VStack pr="4" alignItems="flex-start">
                        <Text fontWeight="bold" color="blue.400" fontSize="sm">
                          {product.name}
                        </Text>

                        <Text
                          fontWeight="medium"
                          color="gray.400"
                          fontSize="sm"
                        >
                          Orçamento do produto:{' '}
                          <Text
                            as="span"
                            fontWeight="light"
                            color="gray.200"
                            fontSize="sm"
                          >
                            R$ {product.price * (product.base * product.height)}
                          </Text>
                        </Text>

                        {product.description && (
                          <Text
                            fontWeight="normal"
                            color="gray.200"
                            fontSize="sm"
                          >
                            {product.description}
                          </Text>
                        )}
                      </VStack>

                      <VStack>
                        <Button
                          size="sm"
                          fontSize="sm"
                          w="100%"
                          borderRadius={4}
                          colorScheme="red"
                          onClick={() =>
                            handleRemoveProduct(product.instanceId)
                          }
                          leftIcon={
                            isWideVersion && (
                              <Icon as={RiDeleteBinLine} fontSize="16" />
                            )
                          }
                        >
                          {isWideVersion ? (
                            'Remover'
                          ) : (
                            <Icon as={RiDeleteBinLine} fontSize="16" />
                          )}
                        </Button>
                      </VStack>
                    </Flex>
                  ))}
                </VStack>

                <FieldMarker title="Info. adicional" />

                <VStack spacing="8">
                  <SimpleGrid
                    minChildWidth="240px"
                    spacing={['6', '8']}
                    w="100%"
                  >
                    <Input
                      label="Info extra"
                      error={errors.color}
                      {...register('color')}
                    />
                    <Input
                      label="Prazo de entrega"
                      type="date"
                      error={errors.deadline}
                      {...register('deadline')}
                    />
                  </SimpleGrid>

                  <Input
                    label="Desconto"
                    type="number"
                    leftContent="R$"
                    step="0.01"
                    error={errors.discount}
                    {...register('discount', { value: 0 })}
                  />

                  <Text fontSize={18} alignSelf="flex-start">
                    Valor dos produtos: R${price}
                  </Text>

                  <Text fontSize={22} alignSelf="flex-start">
                    Valor do orçamento: R${price - watchDiscount}
                  </Text>
                </VStack>

                <Flex mt="8" justify="flex-end">
                  <HStack spacing="4">
                    <Link to="/orcamentos">
                      <Button
                        type="button"
                        colorScheme="whiteAlpha"
                        borderRadius={4}
                      >
                        Cancelar
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      borderRadius={4}
                      isLoading={loading}
                    >
                      Salvar
                    </Button>
                  </HStack>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
