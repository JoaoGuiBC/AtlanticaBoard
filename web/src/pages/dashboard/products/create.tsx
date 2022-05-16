import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { Textarea } from '@components/Form/Textarea';
import { useAuth } from '@contexts/AuthContext';
import { useCreateProductMutation } from '@graphql/generated/graphql';
import {
  CreateProductFormData,
  schema,
} from '@utils/schemas/createProductSchema';

export function CreateProduct() {
  const navigate = useNavigate();
  const { user, logOut, revalidate } = useAuth();
  const toast = useToast();

  const [loadCreate, { error, loading }] = useCreateProductMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: () => navigate('/produtos'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleOnSubmit(data: CreateProductFormData) {
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
              Criar produto
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
                  label="Preço"
                  info="obrigatório"
                  leftContent="R$"
                  type="number"
                  step="0.01"
                  error={errors.price}
                  {...register('price')}
                />
                <Input
                  label="Custo"
                  leftContent="R$"
                  type="number"
                  step="0.01"
                  error={errors.cost}
                  {...register('cost')}
                />
              </SimpleGrid>

              <Textarea label="Descrição" {...register('description')} />
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link to="/produtos">
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
