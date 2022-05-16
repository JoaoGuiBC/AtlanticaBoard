import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Input } from '@components/Form/Input';
import { Sidebar } from '@components/Sidebar';
import { useAuth } from '@contexts/AuthContext';
import { useCreateEmployeeMutation } from '@graphql/generated/graphql';

import {
  CreateEmployeeFormData,
  schema,
} from '@utils/schemas/createEmployeeSchema';

export function CreateEmployee() {
  const { user, logOut, revalidate } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [loadCreation, { error, loading }] = useCreateEmployeeMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: () => navigate('/funcionarios'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleOnSubmit({
    email,
    name,
    password,
  }: CreateEmployeeFormData) {
    await revalidate(user);
    await loadCreation({
      variables: { data: { email, name, password } },
    });
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
              Adicionar funcionário
            </Heading>

            <Divider my="6" borderColor="gray.600" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  label="Nome"
                  info="obrigatório"
                  error={errors.name}
                  {...register('name')}
                />

                <Input
                  type="email"
                  label="E-mail"
                  info="obrigatório"
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  label="Senha"
                  info="obrigatório"
                  type="password"
                  error={errors.password}
                  {...register('password')}
                />

                <Input
                  label="Confirme a senha"
                  info="obrigatório"
                  type="password"
                  error={errors.confirm_password}
                  {...register('confirm_password')}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <Button
                type="submit"
                colorScheme="blue"
                borderRadius={4}
                isLoading={loading}
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
