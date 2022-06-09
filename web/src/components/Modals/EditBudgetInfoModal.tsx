import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, parse, parseISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { RiDeleteBinLine, RiFileAddLine } from 'react-icons/ri';
import {
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import {
  GetBudgetQuery,
  UpdateBudgetInfoInput,
  useUpdateBudgetInfoMutation,
  useUpdateBudgetProductsMutation,
} from '@graphql/generated/graphql';
import { useAuth } from '@contexts/AuthContext';
import { Input } from '@components/Form/Input';
import { FieldMarker } from '@components/Form/FieldMarker';
import { schema } from '@utils/schemas/budget/updateBudgetSchema';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { SelectedProductData } from '@pages/dashboard/functional/budgets/create';
import { AddProductToBudgetModal } from './AddProductToBudgetModal';

type Client = {
  name: string;
  email: string;
  contact?: string | null;
  phoneNumber?: string | null;
};

type Product = {
  id: string;
  base: number;
  height: number;
  price: number;
  product: {
    id: string;
    name: string;
  };
};

export type Budget = {
  id: string;
  serialNumber: number;
  price: number;
  color?: string | null;
  deadline?: any | null;
  discount?: number | null;
  created_at: any;
  products: Product[];
  client: Client;
};

type SelectedProduct = {
  id: string;
  base: number;
  height: number;
  price: number;
  productId: string;
  productName: string;
};

interface EditBudgetInfoModalProps {
  refetch: (variables?: any) => Promise<ApolloQueryResult<GetBudgetQuery>>; // eslint-disable-line
  onClose: () => void;
  isOpen: boolean;
  budget?: Budget;
}

export function EditBudgetInfoModal({
  onClose,
  refetch,
  isOpen,
  budget,
}: EditBudgetInfoModalProps) {
  const [budgetPrice, setBudgetPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApolloError>();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const {
    isOpen: isProductModalOpen,
    onOpen: onOpenProductModal,
    onClose: onCloseProductModal,
  } = useDisclosure();
  const { user, logOut, revalidate } = useAuth();
  const toast = useToast();

  const [loadUpdateProducts] = useUpdateBudgetProductsMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: async () => {
      await refetch();
      onClose();
    },
    onError: productsError => setError(productsError),
  });

  const [loadUpdateInfo] = useUpdateBudgetInfoMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: async () => {
      await refetch();
      onClose();
    },
    onError: infoError => setError(infoError),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchDiscount = watch('discount');

  async function handleOnSubmit(data: UpdateBudgetInfoInput) {
    setLoading(true);
    await revalidate(user);
    await loadUpdateInfo({
      variables: {
        data: {
          ...data,
          id: budget?.id!,
          deadline: data.deadline
            ? parse(data.deadline, 'yyyy-MM-dd', new Date())
            : null,
        },
      },
    });
    setLoading(false);
  }

  async function handleSubmitNewProductList() {
    setLoading(true);
    const products = selectedProducts.map(product => ({
      base: product.base,
      height: product.height,
      price: product.price,
      productId: product.productId,
    }));

    await revalidate(user);
    await loadUpdateProducts({
      variables: {
        data: { id: budget?.id!, budgetProducts: products },
      },
    });
    setLoading(false);
  }

  function handleAddProduct(product: SelectedProductData) {
    const id = Math.random() * (9999999 - 1) + 1;
    const price = product.base * product.height * product.price;

    setBudgetPrice(budgetPrice + price);

    setSelectedProducts([
      ...selectedProducts,
      {
        id: String(id),
        price,
        base: product.base,
        height: product.height,
        productId: product.id,
        productName: product.name,
      },
    ]);
  }

  function handleRemoveProduct(id: string) {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
    const newProductList = selectedProducts.filter(product => {
      if (product.id !== id) {
        return product;
      }
      setBudgetPrice(budgetPrice - product.price);

      return undefined;
    });
    setSelectedProducts(newProductList);
  }

  function handleCloseModal() {
    reset();
    onClose();
  }

  const onSubmit = (data: any) => handleOnSubmit(data);

  useEffect(() => {
    if (error) {
      if (error?.message) {
        toast({
          title: 'Erro',
          description: error?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
        if (
          error?.message === 'Autenticação inválida, por favor refaça login'
        ) {
          logOut();
        }
      }
    }
  }, [error]);

  useEffect(() => {
    if (budget) {
      const productsPrices = budget.products.map(
        productBudget => productBudget.price,
      );
      const price = productsPrices.reduce((accum, curr) => accum + curr);

      setSelectedProducts(
        budget.products.map(product => ({
          base: product.base,
          height: product.height,
          id: product.id,
          price: product.price,
          productId: product.product.id,
          productName: product.product.name,
        })),
      );
      setBudgetPrice(price);
    }
  }, [budget]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      motionPreset="scale"
      size="6xl"
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(3px)" />
      <ModalContent bg="gray.800" borderRadius={4}>
        <ModalHeader>
          {budget && (
            <Heading fontSize="2xl">Orçamento {budget.serialNumber}</Heading>
          )}

          <AddProductToBudgetModal
            isOpen={isProductModalOpen}
            onClose={onCloseProductModal}
            onAddProduct={handleAddProduct}
          />
        </ModalHeader>
        <ModalCloseButton />
        {budget && (
          <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
            <Button
              size="md"
              fontSize="md"
              w="16rem"
              borderRadius={4}
              colorScheme="blue"
              onClick={() => onOpenProductModal()}
              leftIcon={<Icon as={RiFileAddLine} fontSize="20" />}
            >
              Adicionar produto
            </Button>

            <VStack
              spacing="2"
              divider={<StackDivider borderColor="gray.600" />}
            >
              {selectedProducts.map(product => (
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  py="5"
                  key={product.id}
                >
                  <VStack pr="4" alignItems="flex-start">
                    <Text fontWeight="bold" color="blue.400" fontSize="sm">
                      {product.productName}
                    </Text>

                    <Text fontWeight="medium" color="gray.400" fontSize="sm">
                      Orçamento do produto:{' '}
                      <Text
                        as="span"
                        fontWeight="light"
                        color="gray.200"
                        fontSize="sm"
                      >
                        {currencyFormatter(product.price)}
                      </Text>
                    </Text>
                  </VStack>

                  <VStack>
                    <Button
                      size="sm"
                      fontSize="sm"
                      w="100%"
                      borderRadius={4}
                      colorScheme="red"
                      onClick={() => handleRemoveProduct(product.id)}
                      leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                    >
                      Remover
                    </Button>
                  </VStack>
                </Flex>
              ))}
              <Button
                type="button"
                size="lg"
                fontSize="md"
                borderRadius={4}
                colorScheme="blue"
                isLoading={loading}
                onClick={handleSubmitNewProductList}
                alignSelf="flex-start"
              >
                Salvar produtos
              </Button>
            </VStack>

            <FieldMarker title="Info. adicional" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  label="Info extra"
                  defaultValue={String(budget.color)}
                  error={errors.color}
                  {...register('color')}
                />
                <Input
                  label="Prazo de entrega"
                  type="date"
                  defaultValue={
                    budget.deadline
                      ? format(parseISO(budget.deadline), 'yyyy-MM-dd')
                      : ''
                  }
                  error={errors.deadline}
                  {...register('deadline')}
                />
              </SimpleGrid>

              <Input
                label="Desconto"
                type="number"
                leftContent="R$"
                step="0.01"
                defaultValue={budget.discount || 0}
                error={errors.discount}
                {...register('discount')}
              />

              <Text fontSize={18} alignSelf="flex-start">
                Valor dos produtos: {currencyFormatter(budgetPrice)}
              </Text>

              <Text fontSize={22} alignSelf="flex-start">
                Valor do orçamento: {currencyFormatter(budgetPrice)} -{' '}
                {currencyFormatter(watchDiscount)} ={' '}
                {currencyFormatter(budgetPrice - watchDiscount)}
              </Text>
            </VStack>
            <ModalFooter gap={4}>
              <Button
                type="button"
                size="md"
                fontSize="sm"
                borderRadius={4}
                colorScheme="whiteAlpha"
                onClick={handleCloseModal}
              >
                Fechar
              </Button>
              <Button
                type="submit"
                size="md"
                fontSize="sm"
                borderRadius={4}
                // isLoading={loading}
                colorScheme="blue"
              >
                Salvar info
              </Button>
            </ModalFooter>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
