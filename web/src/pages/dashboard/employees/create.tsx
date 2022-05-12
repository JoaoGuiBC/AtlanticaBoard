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
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Input } from '@components/Form/Input';
import { Sidebar } from '@components/Sidebar';

import {
  CreateEmployeeFormData,
  schema,
} from '@utils/schemas/createEmployeeSchema';

export function CreateEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => console.log(data);

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
              <Button type="submit" colorScheme="blue" borderRadius={4}>
                Salvar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
