import { useCallback, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box, Heading, Text, FlatList, VStack, Button, HStack, Icon, Divider, Spinner, useToast,
} from 'native-base';

import { UseAuth } from '@hooks/auth';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { useDeleteProductMutation, useListProductsQuery } from '@graphql/generated/graphql';

import { Toast } from '@components/Toast';
import { Header } from '@components/Header';

export function ListProducts() {
  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, revalidate } = UseAuth();

  const {
    data,
    refetch,
    loading: listLoading,
    error: listError,
  } = useListProductsQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    initialFetchPolicy: 'network-only',
  });
  const [loadDelete, { error, loading }] = useDeleteProductMutation({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
  });

  async function handleDeleteProduct(id: string) {
    await loadDelete({ variables: { deleteProductId: id } });

    if (!error) {
      refetch();
    }
  }

  function handleGoToUpdate(productId: string) {
    navigate('productUpdate', { id: productId });
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
  }, [error, listLoading]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Produtos" />

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
            Erro ao carregar os produtos
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ padding: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48 }}
          data={data?.listProducts.products}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider bg="gray.600" />}
          renderItem={({ item }) => (
            <VStack py="5" justifyContent="space-between">
              <Heading color="darkBlue.400" fontSize="16">{item.name}</Heading>

              <HStack mt="6" justifyContent="space-between">
                <HStack space="1.5">
                  <Text
                    color="gray.400"
                    fontFamily="body"
                    fontWeight={400}
                    fontSize="16"
                    lineHeight="16"
                  >
                    Valor:
                  </Text>
                  <Text
                    color="gray.200"
                    fontFamily="body"
                    fontWeight={300}
                    fontSize="16"
                    lineHeight="16"
                  >
                    {currencyFormatter(item.price)}
                  </Text>
                </HStack>

                <HStack space="1.5">
                  <Text
                    color="gray.400"
                    fontFamily="body"
                    fontWeight={400}
                    fontSize="16"
                    lineHeight="16"
                  >
                    Custo:
                  </Text>
                  <Text
                    color="gray.200"
                    fontFamily="body"
                    fontWeight={300}
                    fontSize="16"
                    lineHeight="16"
                  >
                    {currencyFormatter(item.cost)}
                  </Text>
                </HStack>
              </HStack>

              {item.description && (
                <Text
                  mt="6"
                  color="gray.200"
                  fontFamily="body"
                  fontWeight={400}
                  fontSize="14"
                  lineHeight="18"
                  textAlign="justify"
                >
                  {item.description}
                </Text>
              )}

              <HStack mt="5" space="2" alignSelf="flex-end">
                <Button onPress={() => handleGoToUpdate(item.id)} colorScheme="darkBlue">
                  <Icon as={Feather} name="edit-2" color="gray.50" size="4" />
                </Button>

                <Button isLoading={loading} onPress={() => handleDeleteProduct(item.id)} colorScheme="error">
                  <Icon as={Feather} name="trash-2" color="gray.50" size="4" />
                </Button>
              </HStack>
            </VStack>
          )}
        />
      )}
    </Box>
  );
}
