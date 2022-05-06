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
import { Textarea } from '../../../components/Form/Textarea';

export function CreateProduct() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log('Sucesso!');

    navigate('/produtos');
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
              Criar produto
            </Heading>

            <Divider my="6" borderColor="gray.600" />

            <VStack spacing="8">
              <Input name="name" label="Nome" info="obrigatório" />

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  name="price"
                  label="Preço"
                  info="obrigatório"
                  leftContent="R$"
                />
                <Input name="cost" label="Custo" leftContent="R$" />
              </SimpleGrid>

              <Textarea name="description" label="Descrição" />
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link to="/produtos">
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
