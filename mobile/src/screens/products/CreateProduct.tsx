import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Button, HStack, ScrollView, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useCreateProductMutation } from '@graphql/generated/graphql';
import { CreateProductFormData, schema } from '@utils/schemas/product/createProductSchema';

import { Input } from '@components/Input';
import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

export function CreateProduct() {
  const { goBack } = useNavigation();
  const { user, revalidate } = UseAuth();
  const toast = useToast();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loadCreation, { error, loading }] = useCreateProductMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onCompleted: () => {
      reset();
      goBack();
    },
  });

  async function handleCreateProduct(data: CreateProductFormData) {
    await revalidate(user!);
    await loadCreation({
      variables: { data },
    });
  }

  const onSubmit = (data: any) => handleCreateProduct(data);

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
      <Header title="Produtos" />

      <ScrollView flex={1} px="6" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>

        <Input
          title="Nome"
          control={control}
          name="name"
          errors={errors}
          info="obrigatório"
          autoCapitalize="sentences"
        />

        <HStack space="2.5">
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
            Adicionar
          </Text>
        </Button>

      </ScrollView>
    </Box>
  );
}
