import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Input } from '../../../components/Form/Input';
import { Sidebar } from '../../../components/Sidebar';

export function CreateEmployee() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log('Sucesso!');

    navigate('/funcionarios');
  }

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
            onSubmit={handleSubmit}
          >
            <Heading size="lg" fontWeight="normal">
              Adicionar funcionário
            </Heading>

            <Divider my="6" borderColor="gray.600" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input name="name" label="Nome" info="obrigatório" />

                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  info="obrigatório"
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  name="password"
                  label="Senha"
                  info="obrigatório"
                  type="password"
                />

                <Input
                  name="passwordConfirm"
                  label="Confirme a senha"
                  info="obrigatório"
                  type="password"
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
