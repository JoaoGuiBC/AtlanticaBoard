import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box, Button, Heading, HStack, Icon, ScrollView, Spinner, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useGetProductQuery, useUpdateProductMutation } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Input } from '@components/Input';
import { Header } from '@components/Header';

import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { schema, UpdateProductFormData } from '@utils/schemas/product/updateProductSchema';

import { UpdateScreenNavigationProps } from '../../@types/navigation';

export function UpdateProduct() {
  const route = useRoute();
  const toast = useToast();
  const { user, revalidate } = UseAuth();

  const { goBack } = useNavigation();
  const { id } = route.params as UpdateScreenNavigationProps;

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data,
    loading: listLoading,
    error: listError,
  } = useGetProductQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    variables: { getProductId: id },
    initialFetchPolicy: 'network-only',
  });
  const [loadUpdate, { error, loading }] = useUpdateProductMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onCompleted: async () => {
      reset();
      goBack();
    },
  });

  async function handleOnSubmit(updateData: UpdateProductFormData) {
    await revalidate(user!);
    await loadUpdate({
      variables: {
        data: { id, ...updateData },
      },
    });
  }

  const onSubmit = (updateData: any) => handleOnSubmit(updateData);

  if (data?.getProduct) {
    register('description', { value: data.getProduct.description });
    register('price', { value: currencyFormatter(data.getProduct.price, true) });
    register('cost', {
      value: data.getProduct.cost ? currencyFormatter(data.getProduct.cost, true) : undefined,
    });
  }

  useEffect(() => {
    if (error || listError) {
      revalidate(user!);

      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error ? error.message : listError?.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
    }
  }, [listError, error, listLoading]);

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Produtos" />

      {listLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Spinner color="darkBlue.500" size="lg" />
        </Box>
      ) : listError ? (
        <Box flex={1} alignItems="center" justifyContent="center" mt={-200}>
          <Text
            color="gray.100"
            fontFamily="heading"
            fontWeight={500}
            fontSize="3xl"
            px="12"
            textAlign="center"
          >
            Erro ao carregar o produto
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <ScrollView flex={1} px="6" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>
          <Heading color="gray.50" fontSize="xl">{data?.getProduct.name}</Heading>

          <HStack space="2.5" mt="5">
            <Box flex={1}>
              <Input
                title="Preço"
                control={control}
                name="price"
                errors={errors}
                info="obrigatório"
                keyboardType="number-pad"
                leftContent="R$"
              />
            </Box>
            <Box flex={1}>
              <Input
                title="Custo"
                control={control}
                name="cost"
                errors={errors}
                keyboardType="number-pad"
                leftContent="R$"
              />
            </Box>
          </HStack>

          <Input
            title="Descrição"
            control={control}
            name="description"
            errors={errors}
            multiline
            autoCapitalize="sentences"
          />

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
              Salvar
            </Text>
          </Button>
        </ScrollView>
      )}
    </Box>
  );
}
