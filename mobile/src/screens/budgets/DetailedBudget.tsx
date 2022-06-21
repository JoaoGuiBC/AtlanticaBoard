import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {
  Box, FlatList, Heading, HStack, Icon, ScrollView, Spinner, Text, useToast, VStack,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { useGetBudgetQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

import { dateFormatter } from '@utils/formatter/dateFormatter';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

import { UpdateScreenNavigationProps } from '../../@types/navigation';

const { width } = Dimensions.get('window');
const PRODUCT_LENGTH = width * 0.8;

export function DetailedBudget() {
  const route = useRoute();
  const toast = useToast();
  const { user, revalidate } = UseAuth();

  const { id } = route.params as UpdateScreenNavigationProps;

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

  useEffect(() => {
    if (listError) {
      revalidate(user!);

      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={listError.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
    }
  }, [listError, listLoading]);

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
            Orçamento
            {' '}
            {data.getBudget.serialNumber}
          </Heading>

          <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="14" mt="2">
            Gerado em:
            {' '}
            <Text fontFamily="body" color="gray.400" fontSize="13">
              {dateFormatter(data.getBudget.created_at)}
            </Text>
          </Text>

          {data.getBudget.deadline && (
          <Text fontFamily="body" color="gray.300" fontSize="14" lineHeight="14" mt="2">
            Prazo de entrega:
            {' '}
            <Text fontFamily="body" color="gray.400" fontSize="13">
              {dateFormatter(data.getBudget.deadline)}
            </Text>
          </Text>
          )}

          <Text
            mt="5"
            color="gray.500"
            fontFamily="heading"
            fontWeight={400}
            fontSize="sm"
            pl="4"
          >
            produtos:
            {' '}
            {data.getBudget.products.length}
          </Text>

          <FlatList
            style={{ marginBottom: 16, width: '100%' }}
            data={data.getBudget.products}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ padding: 3, paddingLeft: 8 }}
            renderItem={({ item }) => (
              <HStack
                bg="gray.900"
                space="2"
                p="4"
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

          {data.getBudget.color && (
            <Text
              color="gray.300"
              fontFamily="body"
              fontWeight={500}
              fontSize="md"
              mb="6"
            >
              Info:
              {' '}
              <Text
                color="gray.400"
                fontFamily="body"
                fontWeight="300"
                fontSize="md"
              >
                {data.getBudget.color}

              </Text>
            </Text>
          )}

          <VStack mb="6">
            <Text
              color="gray.100"
              fontFamily="body"
              fontWeight={500}
              fontSize="2xl"
              lineHeight="sm"
            >
              Cliente
            </Text>

            <Text
              color="gray.200"
              fontFamily="body"
              fontWeight={400}
              fontSize="lg"
              lineHeight="sm"
            >
              {data.getBudget.client.name}
            </Text>

            <Text
              color="gray.300"
              fontFamily="body"
              fontWeight={300}
              fontSize="md"
              lineHeight="md"
            >
              {data.getBudget.client.email}
            </Text>

            {data.getBudget.client.contact && (
              <Text
                color="gray.400"
                fontFamily="body"
                fontWeight={300}
                fontSize="md"
                lineHeight="md"
              >
                {data.getBudget.client.contact}
              </Text>
            )}

            {data.getBudget.client.phoneNumber && (
              <Text
                color="gray.400"
                fontFamily="body"
                fontWeight={300}
                fontSize="md"
                lineHeight="md"
              >
                {data.getBudget.client.phoneNumber}
              </Text>
            )}
          </VStack>

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
            color="gray.100"
            fontFamily="body"
            fontWeight={500}
            fontSize="md"
          >
            Desconto:
            {' '}
            {currencyFormatter(data.getBudget.discount)}
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
            {data.getBudget.discount
              ? currencyFormatter(data.getBudget.price - data.getBudget.discount)
              : currencyFormatter(data.getBudget.price - 0)}
          </Text>
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
