import {
  Box, ScrollView, Text, useTheme, VStack,
} from 'native-base';
import { BarChart } from 'react-native-chart-kit';

import { UseAuth } from '@hooks/auth';

import { Header } from '@components/Header';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const data = {
  labels: ['21 Jun', '22 Jun', '23 Jun', '24 Jun', '25 Jun', '26 Jun', '27 Jun'],
  datasets: [
    {
      data: [8, 5, 2, 0, 9, 3, 1],
    },
  ],
};

export function Infographics() {
  // const { user } = UseAuth();
  const theme = useTheme();

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Infográficos" />

      <ScrollView pt="5" w="100%">
        <VStack ml="5">
          <Text color="gray.100" fontWeight="medium" fontSize="xl">
            Lucro desse mês:
          </Text>
          <Text color="gray.200" fontWeight="medium" fontSize="lg">
            R$ 1.500,00
          </Text>
        </VStack>

        <Box flex={1} alignItems="center" justifyContent="center" my="5">
          <BarChart
            data={data}
            width={width * 0.9}
            height={350}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              decimalPlaces: 0,
              barPercentage: 0.5,
              backgroundGradientFrom: theme.colors.gray[900],
              backgroundGradientTo: theme.colors.gray[900],
              color: () => theme.colors.gray[200],
            }}
            verticalLabelRotation={90}
          />
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center" my="10">
          <BarChart
            data={data}
            width={width * 0.9}
            height={350}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              decimalPlaces: 0,
              barPercentage: 0.5,
              backgroundGradientFrom: theme.colors.gray[900],
              backgroundGradientTo: theme.colors.gray[900],
              color: () => theme.colors.gray[200],
            }}
            verticalLabelRotation={90}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
