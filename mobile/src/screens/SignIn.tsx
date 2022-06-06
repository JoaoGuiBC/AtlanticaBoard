import {
  Box, Button, FormControl, Heading, Input, Text,
} from 'native-base';

export function SignIn() {
  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center" px="12">
      <Heading color="gray.50" fontFamily="heading" fontSize="4xl" py="4" mt={-60} mb="7">
        Atlantica
        <Heading color="darkBlue.400" fontFamily="heading" fontSize="4xl" py="4">Board</Heading>
      </Heading>

      <FormControl mb="8">
        <FormControl.Label>
          <Text
            color="gray.50"
            fontFamily="heading"
            fontWeight={700}
            fontSize="lg"
          >
            E-mail
          </Text>
        </FormControl.Label>

        <Input color="gray.50" />

        <FormControl.ErrorMessage>
          Informe um email válido
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl mb="12">
        <FormControl.Label>
          <Text
            color="gray.50"
            fontFamily="heading"
            fontWeight={700}
            fontSize="lg"
          >
            Senha
          </Text>

        </FormControl.Label>
        <Input />
        <FormControl.ErrorMessage>
          Informe um email válido
        </FormControl.ErrorMessage>
      </FormControl>

      <Button width="100%" colorScheme="darkBlue">
        <Text
          color="gray.50"
          fontFamily="body"
          fontWeight={700}
          fontSize="lg"
        >
          Entrar
        </Text>
      </Button>
    </Box>
  );
}
