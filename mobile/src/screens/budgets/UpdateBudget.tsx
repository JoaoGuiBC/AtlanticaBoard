import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box, Button, FlatList, Heading, HStack, Icon, ScrollView, Spinner, Text, useToast, VStack,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useGetBudgetQuery, useUpdateBudgetInfoMutation } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { FieldMarker } from '@components/FieldMarker';

import { dateFormatter } from '@utils/formatter/dateFormatter';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { schema, UpdateBudgetFormData } from '@utils/schemas/budget/updateBudgetSchema';

import { UpdateScreenNavigationProps } from '../../@types/navigation';

const { width } = Dimensions.get('window');
const PRODUCT_LENGTH = width * 0.8;

export function UpdateBudget() {
  const route = useRoute();
  const toast = useToast();
  const { user, revalidate } = UseAuth();

  const { goBack } = useNavigation();
  const { id } = route.params as UpdateScreenNavigationProps;

  const {
    reset,
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchDiscount = watch('discount');

  const {
    data,
    loading: listLoading,
    error: listError,
  } = useGetBudgetQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    variables: { getBudgetId: id },
    initialFetchPolicy: 'network-only',
  });
  const [loadUpdate, { error, loading }] = useUpdateBudgetInfoMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onCompleted: async () => {
      reset();
      goBack();
    },
  });

  async function handleOnSubmit(updateData: UpdateBudgetFormData) {
    await revalidate(user!);
    await loadUpdate({
      variables: {
        data: { id, ...updateData },
      },
    });
  }

  const onSubmit = (updateData: any) => handleOnSubmit(updateData);

  if (data?.getBudget) {
    register('color', { value: data.getBudget.color || '' });
    register('discount', {
      value: data.getBudget.discount ? currencyFormatter(data.getBudget.discount, true) : undefined,
    });
    register('deadline', {
      value: data.getBudget.deadline ? dateFormatter(data.getBudget.deadline) : undefined,
    });
  }

  useEffect(() => {
    if (error || listError) {
      revalidate(user!);

      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error ? error.message : listError?.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
    }
  }, [listError, error, listLoading]);

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Orçamentos" />

      {listLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Spinner color="darkBlue.500" size="lg" />
        </Box>
      ) : listError ? (
        <Box flex={1} alignItems="center" justifyContent="center" mt={-200}>
          <Text
            color="gray.100"
            fontFamily="heading"
            fontWeight={500}
            fontSize="3xl"
            px="12"
            textAlign="center"
          >
            Erro ao carregar o produto
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : data?.getBudget ? (
        <ScrollView flex={1} px="6" w="100%" contentContainerStyle={{ paddingVertical: 32 }}>
          <Heading color="gray.50" fontSize="3xl">
            Orçamento:
            {' '}
            {data.getBudget.serialNumber}
          </Heading>

          <FlatList
            style={{ paddingVertical: 16, width: '100%' }}
            data={data.getBudget.products}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ padding: 3, paddingLeft: 8 }}
            renderItem={({ item }) => (
              <HStack
                bg="gray.900"
                space="2"
                p="5"
                w={PRODUCT_LENGTH}
                borderRadius="sm"
                shadow="9"
                mr="2.5"
              >
                <VStack
                  flex={1}
                  flexWrap="wrap"
                >

                  <Heading flexWrap="wrap" w={PRODUCT_LENGTH * 0.9} color="darkBlue.400" fontFamily="heading" fontSize="md">
                    {item.product.name}
                  </Heading>

                  <Text color="gray.400" fontFamily="body" fontSize="sm" fontWeight="500">
                    Orçamento do produto:
                    {' '}
                    <Text color="gray.300" fontFamily="body" fontSize="sm" fontWeight="300">
                      {currencyFormatter(item.price)}
                    </Text>
                  </Text>
                </VStack>
              </HStack>
            )}
          />

          <FieldMarker title="Info. adicional" />

          <HStack space="2.5">
            <Box flex={1}>
              <Input
                title="Desconto"
                control={control}
                name="discount"
                errors={errors}
                keyboardType="number-pad"
                leftContent="R$"
              />
            </Box>
            <Box flex={1}>
              <Input
                title="Prazo de entrega"
                control={control}
                name="deadline"
                errors={errors}
                keyboardType="number-pad"
                placeholder="DD-MM-AAAA"
              />
            </Box>
          </HStack>

          <Input
            title="Info extra"
            control={control}
            name="color"
            errors={errors}
          />

          <Text
            color="gray.100"
            fontFamily="body"
            fontWeight={500}
            fontSize="md"
          >
            Valor dos produtos:
            {' '}
            {currencyFormatter(data.getBudget.price)}
          </Text>

          <Text
            mb="5"
            color="gray.50"
            fontFamily="body"
            fontWeight={500}
            fontSize="xl"
          >
            Valor do orçamento:
            {' '}
            {watchDiscount
              ? currencyFormatter(data.getBudget.price - watchDiscount)
              : currencyFormatter(data.getBudget.price - 0)}
          </Text>

          <Button
            width="100%"
            h="12"
            colorScheme="darkBlue"
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              color="gray.50"
              fontFamily="body"
              fontWeight={700}
              fontSize="lg"
            >
              Salvar
            </Text>
          </Button>
        </ScrollView>
      ) : (
        <Box flex={1} alignItems="center" justifyContent="center" mt={-200}>
          <Text
            color="gray.100"
            fontFamily="heading"
            fontWeight={500}
            fontSize="3xl"
            px="12"
            textAlign="center"
          >
            Erro ao carregar o produto
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      )}
    </Box>
  );
}
