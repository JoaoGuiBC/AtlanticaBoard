import { Feather } from '@expo/vector-icons';
import {
  Box, Heading, Text, FlatList, VStack, Button, HStack, Icon, Divider, Spinner,
} from 'native-base';

import { Header } from '@components/Header';
import { useListEmployeesQuery } from '@graphql/generated/graphql';

export function ListEmployess() {
  const {
    data,
    loading: listLoading,
    error: listError,
  } = useListEmployeesQuery({
    context: {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ1NDYwNTksImV4cCI6MTY1NDU4OTI1OSwic3ViIjoiMGY2ZjM1NzMtMzhhMS00MjQyLTgxMzctNzNkYWIyZjZjMjM1In0.gBITWyKiDRgES_McC2lh_MBz_d_yyJp2q3n8G7-vLqY',
      },
    },
    initialFetchPolicy: 'network-only',
  });

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Funcionários" />

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
            Erro ao carregar os funcionários
          </Text>
          <Icon as={Feather} name="alert-circle" color="gray.100" size="9" />
        </Box>
      ) : (
        <FlatList
          style={{ padding: 16, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 48 }}
          data={data?.listEmployees}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider bg="gray.600" />}
          renderItem={({ item }) => (
            <HStack py="5" justifyContent="space-between">
              <VStack>
                <Heading
                  color="darkBlue.400"
                  fontFamily="heading"
                  fontWeight={500}
                  fontSize="lg"
                >
                  {item.name}
                </Heading>

                <Text
                  color="gray.200"
                  fontFamily="heading"
                  fontWeight={300}
                  fontSize="md"
                >
                  {item.email}
                </Text>
              </VStack>

              {!item.isAdmin && (
                <Button colorScheme="error">
                  <Icon as={Feather} name="trash-2" color="gray.50" size="5" />
                </Button>
              )}
            </HStack>
          )}
        />
      )}
    </Box>
  );
}
