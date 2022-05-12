import { RiDeleteBinLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

type Employees = {
  email: string;
  name: string;
  isAdmin: boolean;
};

export function EmployeeList() {
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
  const [didFetchFailed, setDidFetchFailed] = useState(false);
  const [employees, setEmployees] = useState<Employees[]>([]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function getEmployeesData() {
    setIsFetchingEmployees(true);

    try {
      // setEmployees(parsedData);
    } catch (_) {
      setDidFetchFailed(true);
    }

    setIsFetchingEmployees(false);
  }

  useEffect(() => {
    getEmployeesData();
  }, []);

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

            {isFetchingEmployees ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : didFetchFailed ? (
              <Flex justify="center">
                <Text>Falha ao obter os dados dos usuários.</Text>
              </Flex>
            ) : (
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>E-Mail</Th>
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {employees.map(employee => (
                    <Tr key={employee.email}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" color="blue.400">
                            {employee.name}
                          </Text>
                        </Box>
                      </Td>

                      <Td>
                        <Text fontSize="sm" color="gray.300">
                          {employee.email}
                        </Text>
                      </Td>

                      <Td>
                        {!employee.isAdmin && (
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            borderRadius={4}
                            colorScheme="red"
                            // onClick={() => deleteEmployee(employee.email)}
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
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
