import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  pageNumber: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void; // eslint-disable-line
}

export function PaginationItem({
  isCurrent = false,
  pageNumber,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        borderRadius={4}
        colorScheme="blue"
        disabled
        _disabled={{
          bg: 'blue.500',
          cursor: 'default',
        }}
      >
        {pageNumber}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      borderRadius={4}
      bg="gray.700"
      _hover={{
        bg: 'gray.500',
      }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  );
}
