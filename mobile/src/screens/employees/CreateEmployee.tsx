import {
  Box, Button, ScrollView, Text,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreateEmployeeFormData, schema } from '@utils/schemas/createEmployeeSchema';

import { Header } from '@components/Header';
import { Input } from '@components/Input';

export function CreateEmployee() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleCreateEmployee({ name, email, password }: CreateEmployeeFormData) {
    console.log({ name, email, password });
  }

  const onSubmit = (data: any) => handleCreateEmployee(data);

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Funcionários" />

      <ScrollView flex={1} px="10" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>

        <Input
          title="E-mail"
          control={control}
          name="email"
          errors={errors}
          autoCapitalize="none"
        />
        <Input
          title="Nome"
          control={control}
          name="name"
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
        <Input
          title="Confirme a senha"
          control={control}
          name="confirm_password"
          errors={errors}
          isSecret
        />

        <Button
          width="100%"
          h="12"
          colorScheme="darkBlue"
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            color="gray.50"
            fontFamily="body"
            fontWeight={700}
            fontSize="lg"
          >
            Adicionar
          </Text>
        </Button>

      </ScrollView>
    </Box>
  );
}
