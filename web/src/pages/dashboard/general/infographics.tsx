import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  theme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

import { useAuth } from '@contexts/AuthContext';
import { createChartSeries } from '@utils/createChartSeries';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import {
  useGetMonthlyProfitQuery,
  useListLastOrdersCreatedQuery,
  useListLastOrdersFinishedQuery,
} from '@graphql/generated/graphql';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';

const today = new Date();

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    foreColor: theme.colors.gray[500],
  },
  colors: ['#2B6CB0'],
  grid: {
    show: true,
    borderColor: theme.colors.gray[600],
    strokeDashArray: 1,
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontFamily: theme.fonts.body,
      fontWeight: 500,
      colors: [theme.colors.gray[300]],
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      format(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
        'dd MMM',
      ),
      format(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
        'dd MMM',
      ),
      format(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4),
        'dd MMM',
      ),
      format(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        'dd MMM',
      ),
      format(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
        'dd MMM',
      ),
      format(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        'dd MMM',
      ),
      format(today, 'dd MMM'),
    ],
  },
};

export function Infographics() {
  const { user, logOut } = useAuth();
  const toast = useToast();

  const { data: lastOrdersCreated } = useListLastOrdersCreatedQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onError(error) {
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      if (error.message === 'Autenticação inválida, por favor refaça login') {
        logOut();
      }
    },
  });

  const { data: lastOrdersFinished } = useListLastOrdersFinishedQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onError(error) {
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      if (error.message === 'Autenticação inválida, por favor refaça login') {
        logOut();
      }
    },
  });

  const { data: monthProfit } = useGetMonthlyProfitQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onError(error) {
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      if (error.message === 'Autenticação inválida, por favor refaça login') {
        logOut();
      }
    },
  });

  return (
    <>
      <Header />
      <Flex direction="column" h="10vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Flex flex="1" gap={6} direction="column">
            {!monthProfit ? (
              <Flex justify="center" align="center" width={290}>
                <Spinner />
              </Flex>
            ) : (
              <VStack justifyContent="center" alignItems="flex-start">
                <Heading fontSize="xl">Lucro desse mês:</Heading>
                <Text textAlign="left" fontSize="lg">
                  {currencyFormatter(monthProfit.getMonthlyProfit)}
                </Text>
              </VStack>
            )}

            <Flex flex="1" gap={1} wrap="wrap">
              <Box
                display="flex"
                bg="gray.800"
                borderRadius={4}
                flex="1"
                h="80"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  pl={['4', '10']}
                  fontSize="lg"
                  mb="4"
                  alignSelf="flex-start"
                >
                  Projetos aceitos por dia
                </Text>

                {!lastOrdersCreated ? (
                  <Flex justify="center" align="center" height={190}>
                    <Spinner />
                  </Flex>
                ) : (
                  <Chart
                    options={options}
                    series={createChartSeries(
                      lastOrdersCreated.listLastOrdersCreated,
                    )}
                    type="bar"
                    height={190}
                    width={450}
                  />
                )}
              </Box>

              <Box
                display="flex"
                bg="gray.800"
                borderRadius={4}
                flex="1"
                h="80"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  pl={['4', '10']}
                  fontSize="lg"
                  mb="4"
                  alignSelf="flex-start"
                >
                  Projetos concluídos por dia
                </Text>

                {!lastOrdersFinished ? (
                  <Flex justify="center" align="center" height={190}>
                    <Spinner />
                  </Flex>
                ) : (
                  <Chart
                    options={options}
                    series={createChartSeries(
                      lastOrdersFinished.listLastOrdersFinished,
                    )}
                    type="bar"
                    height={190}
                    width={450}
                  />
                )}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
