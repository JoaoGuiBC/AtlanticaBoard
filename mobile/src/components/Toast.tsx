import { Box, Heading, Text } from 'native-base';

interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

const types = {
  success: 'emerald.500',
  error: 'error.500',
  info: 'darkBlue.500',
};

export function Toast({ title, description, type = 'info' }: ToastProps) {
  return (
    <Box bg={types[type]} minW="20" px="3" py="1.5" mr="2" borderRadius="sm">
      <Heading
        color="gray.50"
        fontFamily="heading"
        fontWeight={500}
        fontSize="lg"
      >
        {title}
      </Heading>

      {description && (
        <Text
          color="gray.50"
          fontFamily="body"
          fontWeight={400}
          fontSize="md"
        >
          {description}
        </Text>
      )}
    </Box>
  );
}
