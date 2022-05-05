import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Input } from '../../../components/Form/Input';
import { Sidebar } from '../../../components/Sidebar';
import { FieldMarker } from '../../../components/Form/FieldMarker';

export function CreateClient() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log('Sucesso!');

    navigate('/clientes');
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
              Criar cliente
            </Heading>

            <Divider my="6" borderColor="gray.600" />

            <VStack spacing="8">
              <Input name="name" label="Nome" info="obrigatório" />

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  info="obrigatório"
                />
                <Input name="contact" label="Contato" />
                <Input name="phone" label="Telefone" />
              </SimpleGrid>
            </VStack>

            <FieldMarker title="Fiscal" />

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input name="cpfCnpj" label="CPF / CNPJ" info="obrigatório" />
              <Input name="stateRegistration" label="Inscrição estadual" />
            </SimpleGrid>

            <FieldMarker title="Endereço" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input name="address" label="Endereço" info="obrigatório" />
                <Input name="number" label="Número" type="number" />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input name="state" label="Estado" />
                <Input name="city" label="Cidade" />
                <Input name="district" label="Bairro" />
              </SimpleGrid>

              <Input name="cep" label="CEP" />
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link to="/clientes">
                  <Button as="a" colorScheme="whiteAlpha" borderRadius={4}>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" colorScheme="blue" borderRadius={4}>
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
