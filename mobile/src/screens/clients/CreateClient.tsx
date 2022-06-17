import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Button, HStack, ScrollView, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useCreateClientMutation } from '@graphql/generated/graphql';
import { CreateClientFormData, schema } from '@utils/schemas/client/createClientSchema';

import { Input } from '@components/Input';
import { Toast } from '@components/Toast';
import { Header } from '@components/Header';
import { FieldMarker } from '@components/FieldMarker';

export function CreateClient() {
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

  const [loadCreation, { error, loading }] = useCreateClientMutation({
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

  async function handleCreateClient(data: CreateClientFormData) {
    await revalidate(user!);
    await loadCreation({
      variables: { data },
    });
  }

  const onSubmit = (data: any) => handleCreateClient(data);

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
      <Header title="Clientes" />

      <ScrollView flex={1} px="6" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>

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

        <HStack space="2.5">
          <Box flex={1}>
            <Input
              title="Contato"
              control={control}
              name="contact"
              errors={errors}
              autoCapitalize="words"
            />
          </Box>
          <Box flex={1}>
            <Input
              title="Telefone"
              control={control}
              name="phoneNumber"
              errors={errors}
              keyboardType="number-pad"
            />
          </Box>
        </HStack>

        <FieldMarker title="Fiscal" />

        <Input
          title="CPF / CNPJ"
          control={control}
          name="document"
          errors={errors}
        />

        <Input
          title="Inscrição estadual"
          control={control}
          name="stateRegistration"
          errors={errors}
        />

        <FieldMarker title="Endereço" />

        <HStack space="5">
          <Box flex={4}>
            <Input
              title="Endereço"
              control={control}
              name="street"
              errors={errors}
              info="obrigatório"
              autoCapitalize="words"
            />
          </Box>
          <Box flex={1}>
            <Input
              title="Nº"
              control={control}
              name="number"
              errors={errors}
              keyboardType="number-pad"
            />
          </Box>
        </HStack>

        <HStack space="5">
          <Box flex={2}>
            <Input
              title="Cidade"
              control={control}
              name="city"
              errors={errors}
              autoCapitalize="words"
            />
          </Box>
          <Box flex={1}>
            <Input
              title="Estado"
              control={control}
              name="state"
              errors={errors}
              autoCapitalize="characters"
              maxLength={2}
            />
          </Box>
        </HStack>

        <Input
          title="Bairro"
          control={control}
          name="district"
          errors={errors}
          autoCapitalize="words"
        />

        <Input
          title="CEP"
          control={control}
          name="cep"
          errors={errors}
          keyboardType="number-pad"
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
