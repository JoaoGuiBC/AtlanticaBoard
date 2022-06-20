import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box, Button, Heading, HStack, Icon, ScrollView, Spinner, Text, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useGetClientQuery, useUpdateClientMutation } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { FieldMarker } from '@components/FieldMarker';
import { schema, UpdateClientFormData } from '@utils/schemas/client/updateClientSchema';

import { UpdateScreenNavigationProps } from '../../@types/navigation';

export function UpdateClient() {
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
  } = useGetClientQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    variables: { getClientId: id },
    initialFetchPolicy: 'network-only',
  });
  const [loadUpdate, { error, loading }] = useUpdateClientMutation({
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

  async function handleOnSubmit(updateData: UpdateClientFormData) {
    await revalidate(user!);
    await loadUpdate({
      variables: {
        data: {
          id: data?.getClient.id!,
          idAddress: data?.getClient.address[0].id!,
          ...updateData,
        },
      },
    });
  }

  const onSubmit = (updateData: any) => handleOnSubmit(updateData);

  if (data?.getClient) {
    register('contact', { value: data.getClient.contact });
    register('phoneNumber', { value: data.getClient.phoneNumber });
    register('stateRegistration', { value: data.getClient.stateRegistration });
    register('street', { value: data.getClient.address[0].street });
    register('city', { value: data.getClient.address[0].city });
    register('state', { value: data.getClient.address[0].state });
    register('district', { value: data.getClient.address[0].district });
    register('cep', { value: data.getClient.address[0].cep });
    register('number', {
      value: data.getClient.address[0].number ? String(data.getClient.address[0].number) : '',
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
      <Header title="Clientes" />

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
            Erro ao carregar o cliente
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <ScrollView flex={1} px="6" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>
          <Heading color="gray.50" fontSize="3xl">{data?.getClient.name}</Heading>
          <Text color="gray.400" fontSize="md" mb="12">{data?.getClient.email}</Text>

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
      )}
    </Box>
  );
}
