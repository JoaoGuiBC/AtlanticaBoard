import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Button, Heading, HStack, Icon, ScrollView, Text, useToast, VStack,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useCreateBudgetMutation, useListClientsQuery } from '@graphql/generated/graphql';
import { CreateBudgetFormData, schema } from '@utils/schemas/budget/createBudgetSchema';

import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Toast } from '@components/Toast';
import { Header } from '@components/Header';
import { FieldMarker } from '@components/FieldMarker';
import { AddBudgetProductModal, Product } from '@components/AddBudgetProductModal';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

export type BudgetProduct = Product & {
  base: number;
  height: number;
}

export function CreateBudget() {
  const [price, setPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState<BudgetProduct[]>([]);

  const { goBack } = useNavigation();
  const { user, revalidate } = UseAuth();
  const toast = useToast();

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchClient = watch('clientId');
  const watchDiscount = watch('discount');

  const {
    data: listData,
  } = useListClientsQuery({
    context: {
      headers: {
        Authorization: user?.token!,
      },
    },
  });

  const [loadCreation, { error, loading }] = useCreateBudgetMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onCompleted: () => {
      setProducts([]);
      setPrice(0);
      reset();
      goBack();
    },
  });

  async function handleCreateBudget(data: CreateBudgetFormData) {
    await revalidate(user!);

    if (products.length === 0) {
      toast.show({
        render: () => (
          <Toast
            title="Atenção"
            description="Por favor, selecione pelo menos um produto"
            type="info"
          />
        ),
        placement: 'top-right',
      });

      return;
    }

    let deadline: Date | undefined;

    if (data.deadline) {
      const dateInfo = data.deadline?.split('-')!;

      deadline = new Date(`${dateInfo[2]}-${dateInfo[1]}-${Number(dateInfo[0]) + 1}`);
    }

    await loadCreation({
      variables: {
        data: {
          products: products.map((product) => ({
            productId: product.id,
            base: product.base,
            height: product.height,
            price: product.price,
          })),
          ...data,
          deadline: deadline || null,
        },
      },
    });
  }

  function handleRemoveProduct(id: string) {
    const newProductList = products.filter((product) => product.id !== id);
    const [removedProduct] = products.filter((product) => product.id === id);

    const removalPrice = removedProduct.price * (removedProduct.base * removedProduct.height);

    setProducts(newProductList);
    setPrice(price - removalPrice);
  }

  const onSubmit = (data: any) => handleCreateBudget(data);

  useEffect(() => {
    if (error) {
      revalidate(user!);

      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error && error.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
    }
  }, [error]);

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Orçamentos" />

      <AddBudgetProductModal
        setPrice={setPrice}
        selectProduct={setProducts}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
      />

      <ScrollView flex={1} px="6" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>

        <Select
          title="Escolha um cliente"
          control={control}
          name="clientId"
          errors={errors}
          info="obrigatório"
          data={listData?.listClients.clients.map(
            (client) => ({ label: client.name, value: client.id }),
          )!}
        />

        {watchClient && (
          <>
            <FieldMarker title="Info. produto" />

            {products.map((product, index) => (
              <HStack
                key={product.id}
                w="100%"
                space="2"
                mb="5"
                pb="5"
                borderBottomColor="gray.700"
                borderBottomWidth={products.length - 1 !== index ? '1' : '0'}
              >
                <VStack flex={1}>
                  <Heading color="darkBlue.400" fontFamily="heading" fontSize="md">
                    {product.name}
                  </Heading>

                  <Text color="gray.400" fontFamily="body" fontSize="sm" fontWeight="500">
                    Orçamento do produto:
                    {' '}
                    <Text color="gray.300" fontFamily="body" fontSize="sm" fontWeight="300">
                      {currencyFormatter(product.price)}
                    </Text>
                  </Text>
                </VStack>

                <Button
                  isLoading={loading}
                  onPress={() => handleRemoveProduct(product.id)}
                  colorScheme="error"
                >
                  <Icon as={Feather} name="trash-2" color="gray.50" size="4" />
                </Button>
              </HStack>
            ))}

            <Button
              width="70%"
              h="12"
              mt="2"
              alignSelf="center"
              colorScheme="darkBlue"
              onPress={() => setIsModalVisible(true)}
            >
              <HStack space="1" alignItems="center">
                <Icon as={Feather} name="file-plus" color="gray.50" size="4" />
                <Text
                  color="gray.50"
                  fontFamily="body"
                  fontWeight={400}
                  fontSize="md"
                >
                  Adicionar produto
                </Text>
              </HStack>
            </Button>

            <FieldMarker title="Info. adicional" />

            <HStack space="2.5">
              <Box flex={1}>
                <Input
                  title="Desconto"
                  control={control}
                  name="discount"
                  errors={errors}
                  keyboardType="number-pad"
                  leftContent="R$"
                />
              </Box>
              <Box flex={1}>
                <Input
                  title="Prazo de entrega"
                  control={control}
                  name="deadline"
                  errors={errors}
                  keyboardType="number-pad"
                  placeholder="DD-MM-AAAA"
                />
              </Box>
            </HStack>

            <Input
              title="Info extra"
              control={control}
              name="color"
              errors={errors}
            />

            <Text
              color="gray.100"
              fontFamily="body"
              fontWeight={500}
              fontSize="md"
            >
              Valor dos produtos:
              {' '}
              {currencyFormatter(price)}
            </Text>

            <Text
              mb="5"
              color="gray.50"
              fontFamily="body"
              fontWeight={500}
              fontSize="xl"
            >
              Valor do orçamento:
              {' '}
              {watchDiscount
                ? currencyFormatter(price - watchDiscount)
                : currencyFormatter(price - 0)}
            </Text>

            <Button
              width="100%"
              h="12"
              colorScheme="darkBlue"
              isLoading={loading}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                color="gray.50"
                fontFamily="body"
                fontWeight={700}
                fontSize="lg"
              >
                Adicionar
              </Text>
            </Button>
          </>
        )}

      </ScrollView>
    </Box>
  );
}
