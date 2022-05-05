import { Flex, Box, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>João Guilherme Da Rocha</Text>
          <Text color="gray.300" fontSize="sm">
            joaoguibc@gmail.com
          </Text>
        </Box>
      )}
    </Flex>
  );
}
