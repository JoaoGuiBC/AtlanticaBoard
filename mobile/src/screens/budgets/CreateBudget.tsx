import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Button, HStack, ScrollView, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useCreateBudgetMutation } from '@graphql/generated/graphql';
import { CreateBudgetFormData, schema } from '@utils/schemas/budget/createBudgetSchema';

import { Input } from '@components/Input';
import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

export function CreateBudget() {
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
