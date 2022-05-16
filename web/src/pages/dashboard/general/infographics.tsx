import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import Chart from 'react-apexcharts';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    foreColor: theme.colors.gray[500],
  },
  colors: ['#2B6CB0'],
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-04-01T00:00:00.000Z',
      '2021-04-02T00:00:00.000Z',
      '2021-04-03T00:00:00.000Z',
      '2021-04-04T00:00:00.000Z',
      '2021-04-05T00:00:00.000Z',
      '2021-04-06T00:00:00.000Z',
      '2021-04-07T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: 'series1', data: [3, 5, 5, 8, 5, 10, 2] }];

export function Infographics() {
  return (
    <>
      <Header />
      <Flex direction="column" h="10vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px">
            <Box p={['4', '10']} bg="gray.800" borderRadius={4}>
              <Text fontSize="lg" mb="4">
                Projetos aceitos por dia
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>

            <Box p={['4', '10']} bg="gray.800" borderRadius={4}>
              <Text fontSize="lg" mb="4">
                Projetos concluídos por dia
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
