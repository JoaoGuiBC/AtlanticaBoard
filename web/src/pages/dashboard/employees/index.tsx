import { RiDeleteBinLine } from 'react-icons/ri';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';

const employeesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function EmployeeList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Header />

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={4} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Funcionários
              </Heading>
            </Flex>

            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>E-Mail</Th>
                  <Th width="8" />
                </Tr>
              </Thead>
              <Tbody>
                {employeesCount.map(key => (
                  <Tr key={key}>
                    <Td>
                      <Box>
                        <Text fontWeight="bold" color="blue.400">
                          Pessoa {key}
                        </Text>
                      </Box>
                    </Td>

                    <Td>
                      <Text fontSize="sm" color="gray.300">
                        joaoguibc@gmail.com
                      </Text>
                    </Td>

                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        borderRadius={4}
                        colorScheme="red"
                        leftIcon={
                          isWideVersion && (
                            <Icon as={RiDeleteBinLine} fontSize="16" />
                          )
                        }
                      >
                        {isWideVersion ? (
                          'Excluir'
                        ) : (
                          <Icon as={RiDeleteBinLine} fontSize="16" />
                        )}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
