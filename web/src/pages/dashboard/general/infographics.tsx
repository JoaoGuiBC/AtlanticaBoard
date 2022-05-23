import { Box, Flex, Text, theme } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
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
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      format(parseISO('2021-04-01T10:00:00.000Z'), 'dd MMM'),
      format(parseISO('2021-04-02T10:00:00.000Z'), 'dd MMM'),
      format(parseISO('2021-04-03T10:00:00.000Z'), 'dd MMM'),
      format(parseISO('2021-04-04T10:00:00.000Z'), 'dd MMM'),
      format(parseISO('2021-04-05T10:00:00.000Z'), 'dd MMM'),
      format(parseISO('2021-04-06T10:00:00.000Z'), 'dd MMM'),
      format(parseISO('2021-04-07T10:00:00.000Z'), 'dd MMM'),
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

          <Flex flex="1" gap={1} wrap="wrap">
            <Box
              display="flex"
              bg="gray.800"
              borderRadius={4}
              flex="1"
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
              <Chart
                options={options}
                series={series}
                type="area"
                height={190}
                width={450}
              />
            </Box>

            <Box
              display="flex"
              bg="gray.800"
              borderRadius={4}
              flex="1"
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
              <Chart
                options={options}
                series={series}
                type="area"
                height={190}
                width={450}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
