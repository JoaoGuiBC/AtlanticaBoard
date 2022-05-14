import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Input } from '@components/Form/Input';
import { Sidebar } from '@components/Sidebar';
import { FieldMarker } from '@components/Form/FieldMarker';
import {
  schema,
  CreateClientFormData,
} from '@utils/schemas/createClientSchema';
import { useCreateClientMutation } from '@graphql/generated/graphql';
import { useAuth } from '@contexts/AuthContext';
import { useEffect } from 'react';

export function CreateClient() {
  const navigate = useNavigate();
  const { user, logOut, revalidate } = useAuth();
  const toast = useToast();

  const [loadCreate, { error, loading }] = useCreateClientMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: () => navigate('/clientes'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleOnSubmit(data: CreateClientFormData) {
    if (data.state) {
      data.state = data.state?.toUpperCase();
    }
    await revalidate(user);
    await loadCreate({ variables: { data } });
  }

  const onSubmit = (data: any) => handleOnSubmit(data);

  useEffect(() => {
    if (error) {
      if (error?.message) {
        toast({
          title: 'Erro',
          description: error?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
        if (
          error?.message === 'Autenticação inválida, por favor refaça login'
        ) {
          logOut();
        }
      }
    }
  }, [error]);

  return (
    <>
      <Header />

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={4}
            bg="gray.800"
            p={['6', '8']}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading size="lg" fontWeight="normal">
              Criar cliente
            </Heading>

            <Divider my="6" borderColor="gray.600" />

            <VStack spacing="8">
              <Input
                label="Nome"
                info="obrigatório"
                error={errors.name}
                {...register('name')}
              />

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  type="email"
                  label="E-mail"
                  info="obrigatório"
                  error={errors.email}
                  {...register('email')}
                />
                <Input
                  label="Contato"
                  error={errors.contact}
                  {...register('contact')}
                />
                <Input
                  label="Telefone"
                  error={errors.phoneNumber}
                  {...register('phoneNumber')}
                />
              </SimpleGrid>
            </VStack>

            <FieldMarker title="Fiscal" />

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                label="CPF / CNPJ"
                info="obrigatório"
                error={errors.document}
                {...register('document')}
              />
              <Input
                label="Inscrição estadual"
                error={errors.stateRegistration}
                {...register('stateRegistration')}
              />
            </SimpleGrid>

            <FieldMarker title="Endereço" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  label="Endereço"
                  info="obrigatório"
                  error={errors.street}
                  {...register('street')}
                />
                <Input
                  label="Número"
                  error={errors.number}
                  type="number"
                  {...register('number')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  label="Estado"
                  error={errors.state}
                  maxLength={2}
                  info="informe em formato de UF"
                  autoCapitalize="characters"
                  {...register('state')}
                />
                <Input
                  label="Cidade"
                  error={errors.city}
                  {...register('city')}
                />
                <Input
                  label="Bairro"
                  error={errors.district}
                  {...register('district')}
                />
              </SimpleGrid>

              <Input label="CEP" error={errors.cep} {...register('cep')} />
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link to="/clientes">
                  <Button
                    type="button"
                    colorScheme="whiteAlpha"
                    borderRadius={4}
                  >
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="blue"
                  borderRadius={4}
                  isLoading={loading}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
