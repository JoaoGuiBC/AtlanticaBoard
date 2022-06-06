import { Box, Text } from 'native-base';

import { Header } from '@components/Header';

export function CreateEmployee() {
  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Funcionários" />

      <Box flex={1} alignItems="center" justifyContent="center" mt={-200}>
        <Text
          color="gray.100"
          fontFamily="heading"
          fontWeight={500}
          fontSize="md"
        >
          Criar funcionário
        </Text>
      </Box>
    </Box>
  );
}
