import { Box, Divider, Heading } from 'native-base';

interface FieldMarkerProps {
  title: string;
}

export function FieldMarker({ title }: FieldMarkerProps) {
  return (
    <Box my="6">
      <Heading
        color="gray.400"
        fontFamily="heading"
        fontWeight={400}
        fontSize="xl"
      >
        {title}
      </Heading>
      <Divider bg="gray.600" />
    </Box>
  );
}
