import {
  Box, Button, Heading, Text,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UseAuth } from '@hooks/auth';
import { schema, SignInFormData } from '@utils/schemas/signInSchema';

import { Input } from '@components/Input';

export function SignIn() {
  const { signIn, isLoggingIn } = UseAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSignIn({ email, password }: SignInFormData) {
    signIn(email, password);
  }

  const onSubmit = (data: any) => handleSignIn(data);

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center" px="12">
      <Heading color="gray.50" fontFamily="heading" fontSize="4xl" py="4" mt={-60} mb="7">
        Atlantica
        <Heading color="darkBlue.400" fontFamily="heading" fontSize="4xl" py="4">Board</Heading>
      </Heading>

      <Input
        title="E-mail"
        control={control}
        name="email"
        errors={errors}
        autoCapitalize="none"
      />
      <Input
        title="Senha"
        control={control}
        name="password"
        errors={errors}
        isSecret
      />

      <Button
        width="100%"
        h="12"
        colorScheme="darkBlue"
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoggingIn}
      >
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
