import { useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
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
  useToast,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { useListEmployeesQuery } from '@graphql/generated/graphql';
import { useAuth } from '@contexts/AuthContext';

type Employee = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export function EmployeeList() {
  const { user, logOut } = useAuth();
  const toast = useToast();

  const { data, loading, error } = useListEmployeesQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    if (error?.message === 'Autenticação inválida, por favor refaça login') {
      toast({
        title: 'Erro com seu login',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });

      logOut();
    }
  }, [error]);

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

            {loading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
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
                  {data?.listEmployees.map((employee: Employee) => (
                    <Tr key={employee.id}>
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
