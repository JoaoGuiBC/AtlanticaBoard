import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      Atlantica
      <Text as="span" color="blue.500">
        Board
      </Text>
    </Text>
  );
}
