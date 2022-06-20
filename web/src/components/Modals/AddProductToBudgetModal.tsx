import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';

import { Select } from '@components/Form/Select';
import { Input } from '@components/Form/Input';
import { Option } from '@components/Form/Select/Option';
import { useAuth } from '@contexts/AuthContext';
import { useListProductsQuery } from '@graphql/generated/graphql';
import { SelectedProductData } from '@pages/dashboard/functional/budgets/create';
import {
  schema,
  AddProductToBudgetData,
} from '@utils/schemas/budget/addProductToBudgetSchema';

export type Product = {
  id: string;
  name: string;
  price: number;
  cost?: number | null | undefined;
  description?: string | null | undefined;
};

interface AddProductToBudgetModalProps {
  onAddProduct: (product: SelectedProductData) => void; // eslint-disable-line
  onClose: () => void;
  isOpen: boolean;
}

export function AddProductToBudgetModal({
  isOpen,
  onClose,
  onAddProduct,
}: AddProductToBudgetModalProps) {
  const [selectedproduct, setSelectedProduct] = useState<Product>();

  const { user, logOut } = useAuth();
  const toast = useToast();

  const {
    data: listData,
    loading: listLoading,
    error: listError,
  } = useListProductsQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchBase = watch('base');
  const watchHeight = watch('height');

  function handleSelectProduct(id: string) {
    const filterProduct = listData?.listProducts.products.find(
      product => product.id === id,
    );

    setSelectedProduct(filterProduct);
  }

  async function handleOnSubmit(data: AddProductToBudgetData) {
    const instanceId = Math.random() * (9999999 - 1) + 1;

    onAddProduct({
      ...selectedproduct!,
      base: data.base,
      height: data.height,
      instanceId,
    });

    onClose();
  }

  const onSubmit = (data: any) => handleOnSubmit(data);

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
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" size="6xl">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(3px)" />
      <ModalContent bg="gray.800" borderRadius={4}>
        <ModalHeader>
          <Heading fontSize="2xl">Adicionar produto</Heading>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <VStack spacing="8">
              <Select
                label="Produto"
                placeholder="Selecione um produto"
                {...register('productId', {
                  onChange: e => handleSelectProduct(e.currentTarget.value),
                })}
              >
                {!listLoading &&
                  !listError &&
                  listData?.listProducts.products.map(product => (
                    <Option
                      key={product.id}
                      text={product.name}
                      value={product.id}
                    />
                  ))}
              </Select>

              {selectedproduct && (
                <>
                  <HStack spacing={['6', '8']} w="100%" alignItems="flex-end">
                    <Input
                      label="Base"
                      info="obrigatório"
                      type="number"
                      step="0.01"
                      error={errors.base}
                      {...register('base', { value: 0 })}
                    />
                    <Heading userSelect="none">X</Heading>
                    <Input
                      label="Altura"
                      info="obrigatório"
                      type="number"
                      step="0.01"
                      error={errors.height}
                      {...register('height', { value: 0 })}
                    />
                    <Heading userSelect="none">=</Heading>
                    <Text fontSize={25}>
                      {!watchBase || !watchHeight ? 0 : watchBase * watchHeight}
                      &nbsp;
                      <Text as="span" fontSize={15}>
                        M²
                      </Text>
                    </Text>
                  </HStack>

                  <Text fontSize={18} alignSelf="flex-start">
                    Preço do produto: R${selectedproduct.price}
                  </Text>

                  <Text fontSize={22} alignSelf="flex-start">
                    Orçamento do produto:
                    {selectedproduct.price} x{' '}
                    {watchBase || watchHeight ? watchBase * watchHeight : 0} =
                    R$
                    {watchBase || watchHeight
                      ? selectedproduct.price * (watchBase * watchHeight)
                      : 0}
                  </Text>
                </>
              )}
            </VStack>
          </Box>
          <ModalFooter gap={4}>
            <Button
              type="button"
              size="md"
              fontSize="sm"
              borderRadius={4}
              colorScheme="whiteAlpha"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button
              type="submit"
              size="md"
              fontSize="sm"
              borderRadius={4}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
