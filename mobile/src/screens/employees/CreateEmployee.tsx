import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Button, ScrollView, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useCreateEmployeeMutation } from '@graphql/generated/graphql';
import { CreateEmployeeFormData, schema } from '@utils/schemas/createEmployeeSchema';

import { Input } from '@components/Input';
import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

export function CreateEmployee() {
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

  const [loadCreation, { error, loading }] = useCreateEmployeeMutation({
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

  async function handleCreateEmployee({ name, email, password }: CreateEmployeeFormData) {
    await revalidate(user!);
    await loadCreation({
      variables: { data: { email, name, password } },
    });
  }

  const onSubmit = (data: any) => handleCreateEmployee(data);

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
      <Header title="Funcionários" />

      <ScrollView flex={1} px="10" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>

        <Input
          title="E-mail"
          control={control}
          name="email"
          errors={errors}
          info="obrigatório"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          title="Nome"
          control={control}
          name="name"
          errors={errors}
          info="obrigatório"
          autoCapitalize="words"
        />
        <Input
          title="Senha"
          control={control}
          name="password"
          errors={errors}
          info="obrigatório"
          isSecret
        />
        <Input
          title="Confirme a senha"
          control={control}
          name="confirm_password"
          errors={errors}
          info="obrigatório"
          isSecret
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
