import { Divider, Heading, VStack } from '@chakra-ui/react';

interface FieldMarkerProps {
  title: string;
}

export function FieldMarker({ title }: FieldMarkerProps) {
  return (
    <VStack alignItems="flex-start" mt={12} mb={6}>
      <Heading size="sm" fontWeight="normal" textColor="gray.200">
        {title}
      </Heading>

      <Divider borderColor="gray.600" />
    </VStack>
  );
}
