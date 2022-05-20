import { Box } from '@chakra-ui/react';

interface OptionProps {
  text: string;
  value: string;
}

export function Option({ text, value }: OptionProps) {
  return (
    <Box
      as="option"
      bg="gray.600"
      style={{ backgroundColor: '#353646' }}
      value={value}
    >
      {text}
    </Box>
  );
}
