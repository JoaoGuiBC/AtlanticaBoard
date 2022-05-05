import { Button, Flex, Stack } from '@chakra-ui/react';

import { Input } from '../components/Form/Input';

export function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={4}
        flexDir="column"
      >
        <Stack spacing="8">
          <Input type="email" name="email" label="E-mail" />
          <Input type="password" name="password" label="Senha" />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          borderRadius={4}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
