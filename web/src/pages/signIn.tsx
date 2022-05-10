import { Button, Flex, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@components/Form/Input';

import { useAuth } from '@contexts/AuthContext';
import { schema, SignInFormData } from '@utils/schemas/signInSchema';

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const { signIn, user, isAuthLoading } = useAuth();

  function handleSignIn({ email, password }: SignInFormData) {
    signIn(email, password);
  }

  const onSubmit = (data: any) => handleSignIn(data);

  useEffect(() => {
    if (user.email) {
      navigate('/dashboard');
    }
  }, [user]);

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing="8">
          <Input label="E-mail" error={errors.email} {...register('email')} />
          <Input
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          borderRadius={4}
          isLoading={isAuthLoading}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
