import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Button, HStack, Icon, ScrollView, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useCreateBudgetMutation, useListClientsQuery } from '@graphql/generated/graphql';
import { CreateBudgetFormData, schema } from '@utils/schemas/budget/createBudgetSchema';

import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Toast } from '@components/Toast';
import { Header } from '@components/Header';
import { FieldMarker } from '@components/FieldMarker';

export function CreateBudget() {
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
      reset();
      goBack();
    },
  });

  async function handleCreateBudget(data: CreateBudgetFormData) {
    await revalidate(user!);
    // await loadCreation({
    //   variables: { data },
    // });
    console.log(data);
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

            <Button
              width="70%"
              h="12"
              alignSelf="center"
              colorScheme="darkBlue"
              onPress={handleSubmit(onSubmit)}
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
                />
              </Box>
            </HStack>

            <Input
              title="Info extra"
              control={control}
              name="color"
              errors={errors}
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
          </>
        )}

      </ScrollView>
    </Box>
  );
}
