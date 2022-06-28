import {
  Box, Flex, ScrollView, Spinner, Text, useTheme, useToast, VStack,
} from 'native-base';
import { BarChart } from 'react-native-chart-kit';

import { UseAuth } from '@hooks/auth';

import { Header } from '@components/Header';
import { Dimensions } from 'react-native';
import { Toast } from '@components/Toast';
import { useGetMonthlyProfitQuery, useListLastOrdersCreatedQuery, useListLastOrdersFinishedQuery } from '@graphql/generated/graphql';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import { createChartData } from '@utils/createChartData';

const { width } = Dimensions.get('window');

export function Infographics() {
  const { user, signOut } = UseAuth();
  const toast = useToast();
  const theme = useTheme();

  const { data: lastOrdersCreated } = useListLastOrdersCreatedQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onCompleted(v) { createChartData(v.listLastOrdersCreated); },
    onError(error) {
      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
      if (error.message === 'Autenticação inválida, por favor refaça login') {
        signOut();
      }
    },
  });

  const { data: lastOrdersFinished } = useListLastOrdersFinishedQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onError(error) {
      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
      if (error.message === 'Autenticação inválida, por favor refaça login') {
        signOut();
      }
    },
  });

  const { data: monthProfit } = useGetMonthlyProfitQuery({
    context: {
      headers: {
        Authorization: user?.token,
      },
    },
    onError(error) {
      toast.show({
        render: () => (
          <Toast
            title="Erro"
            description={error.message}
            type="error"
          />
        ),
        placement: 'top-right',
      });
      if (error.message === 'Autenticação inválida, por favor refaça login') {
        signOut();
      }
    },
  });

  return (
    <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
      <Header title="Infográficos" />

      <ScrollView pt="5" w="100%">
        {monthProfit ? (
          <VStack ml="5">
            <Text color="gray.100" fontWeight="medium" fontSize="xl">
              Lucro desse mês:
            </Text>
            <Text color="gray.200" fontWeight="medium" fontSize="lg">
              {currencyFormatter(monthProfit.getMonthlyProfit)}
            </Text>
          </VStack>
        ) : (
          <Flex alignItems="flex-start" ml="8">
            <Spinner color="darkBlue.500" size="sm" />
          </Flex>
        )}

        <Box flex={1} alignItems="center" justifyContent="center" my="4">
          <Text
            alignSelf="flex-start"
            ml="5"
            color="gray.200"
            fontWeight="light"
            fontSize="lg"
          >
            Projetos aceitos por dia
          </Text>

          {lastOrdersCreated ? (
            <BarChart
              style={{ borderRadius: 4 }}
              data={createChartData(lastOrdersCreated.listLastOrdersCreated)}
              width={width * 0.9}
              height={350}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                decimalPlaces: 1,
                barPercentage: 0.5,
                backgroundGradientFrom: theme.colors.gray[900],
                backgroundGradientTo: theme.colors.gray[900],
                color: () => theme.colors.gray[200],
              }}
            />
          ) : (
            <Flex
              alignItems="center"
              justifyContent="center"
              bg="gray.900"
              borderRadius="sm"
              width={width * 0.9}
              height={350}
            >
              <Spinner color="darkBlue.500" size="lg" />
            </Flex>
          )}
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center" mb="12">
          <Text
            alignSelf="flex-start"
            ml="5"
            color="gray.200"
            fontWeight="light"
            fontSize="lg"
          >
            Projetos concluídos por dia
          </Text>

          {lastOrdersFinished ? (
            <BarChart
              style={{ borderRadius: 4 }}
              data={createChartData(lastOrdersFinished.listLastOrdersFinished)}
              width={width * 0.9}
              height={350}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                decimalPlaces: 1,
                barPercentage: 0.5,
                backgroundGradientFrom: theme.colors.gray[900],
                backgroundGradientTo: theme.colors.gray[900],
                color: () => theme.colors.gray[200],
              }}
            />
          ) : (
            <Flex
              alignItems="center"
              justifyContent="center"
              bg="gray.900"
              borderRadius="sm"
              width={width * 0.9}
              height={350}
            >
              <Spinner color="darkBlue.500" size="lg" />
            </Flex>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
