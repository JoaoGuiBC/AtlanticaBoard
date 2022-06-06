import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    gray: {
      900: '#181B23',
      800: '#1F2029',
      700: '#353646',
      600: '#4B4D63',
      500: '#616480',
      400: '#797D9A',
      300: '#9699B0',
      200: '#B3B5C6',
      100: '#D1D2DC',
      50: '#EEEEF2',
    },
  },
  fontConfig: {
    Roboto: {
      300: {
        normal: 'Roboto',
      },
      400: {
        normal: 'Roboto',
      },
      500: {
        normal: 'Roboto',
      },
      700: {
        normal: 'Roboto',
      },
    },
  },
  fonts: {
    body: 'Roboto',
    heading: 'Roboto',
  },
});
