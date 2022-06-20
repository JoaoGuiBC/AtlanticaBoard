import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Modal, Button, Text, HStack, Box,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useListProductsQuery } from '@graphql/generated/graphql';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { schema, AddProductToBudgetData } from '@utils/schemas/budget/addProductToBudgetSchema';

import { BudgetProduct } from '@screens/budgets/CreateBudget';

import { Select } from './Select';
import { Input } from './Input';

export type Product = {
  id: string;
  name: string;
  price: number;
  cost?: number | null | undefined;
  description?: string | null | undefined;
};

interface AddBudgetProductModalInterface {
  isModalVisible: boolean;
  setPrice: Dispatch<SetStateAction<number>>
  setModalVisible: Dispatch<SetStateAction<boolean>>
  selectProduct: Dispatch<SetStateAction<BudgetProduct[]>>
}

export function AddBudgetProductModal({
  isModalVisible,
  setPrice,
  setModalVisible,
  selectProduct,
}: AddBudgetProductModalInterface) {
  const [selectedproduct, setSelectedProduct] = useState<Product>();

  const { user } = UseAuth();

  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchBase = watch('base')?.replace(/,/, '.');
  const watchHeight = watch('height')?.replace(/,/, '.');
  const watchProduct = watch('productId');

  const {
    data: listData,
  } = useListProductsQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    initialFetchPolicy: 'network-only',
  });

  function handleSelectProduct(id: string) {
    const filterProduct = listData?.listProducts.products.find(
      (product) => product.id === id,
    );

    setSelectedProduct(filterProduct);
  }

  function handleAddProduct(data: AddProductToBudgetData) {
    const filteredProduct = listData?.listProducts.products.find(
      (product) => product.id === data.productId,
    );

    if (filteredProduct) {
      const price = filteredProduct.price * (data.base * data.height);

      selectProduct((oldState) => ([...oldState, {
        id: filteredProduct.id,
        name: filteredProduct.name,
        price,
        cost: filteredProduct.cost,
        description: filteredProduct.description,
        base: data.base,
        height: data.height,
      }]));

      setPrice((oldPrice) => oldPrice + price);

      reset();
      setModalVisible(false);
    }
  }

  const onSubmit = (data: any) => handleAddProduct(data);

  useEffect(() => {
    handleSelectProduct(watchProduct);
  }, [watchProduct]);

  return (
    <Modal
      isOpen={isModalVisible}
      onClose={() => setModalVisible(false)}
      size="xl"
    >
      <Modal.Content bg="gray.800" borderRadius="sm">
        <Modal.CloseButton />
        <Modal.Header bg="gray.800" color="gray.50">
          <Text color="gray.50" fontWeight="500" fontSize="18">Adicionar produto</Text>
        </Modal.Header>
        <Modal.Body>
          <Select
            control={control}
            errors={errors}
            name="productId"
            title="Escolha um produto"
            info="obrigatório"
            data={listData?.listProducts.products.map(
              (product) => ({ label: product.name, value: product.id }),
            )!}
          />

          {selectedproduct && (
            <>
              <HStack space="2.5">
                <Box flex={1}>
                  <Input
                    title="Base"
                    control={control}
                    info="obrigatório"
                    name="base"
                    errors={errors}
                    keyboardType="number-pad"
                  />
                </Box>
                <Box flex={1}>
                  <Input
                    title="Altura"
                    control={control}
                    info="obrigatório"
                    name="height"
                    errors={errors}
                    keyboardType="number-pad"
                  />
                </Box>
              </HStack>

              <HStack alignItems="center">
                <Text color="gray.100" fontSize="24">{watchBase || 0}</Text>
                <Text color="gray.50" mx="1">X</Text>
                <Text color="gray.100" fontSize="24">{watchHeight || 0}</Text>
                <Text color="gray.50" mx="1">=</Text>
                <Text color="gray.100" fontSize="24">{!watchBase || !watchHeight ? 0 : watchBase * watchHeight}</Text>
                <Text color="gray.100" alignSelf="flex-end">M²</Text>
              </HStack>

              <Text color="gray.100" mt="5" fontSize="15">
                Preço do produto:
                {' '}
                {currencyFormatter(selectedproduct.price)}
              </Text>
              <Text color="gray.50" fontSize="18">
                Preço final:
                {' '}
                {watchBase && watchHeight
                  ? currencyFormatter(selectedproduct.price * (watchBase * watchHeight))
                  : currencyFormatter(selectedproduct.price)}
              </Text>
            </>
          )}
        </Modal.Body>
        <Modal.Footer bg="gray.800" justifyContent="center" color="gray.50">
          <Button
            bg="darkBlue.500"
            onPress={handleSubmit(onSubmit)}
          >
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
