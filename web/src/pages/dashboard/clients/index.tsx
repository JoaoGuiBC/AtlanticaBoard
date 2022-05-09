import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';
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
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

const usersCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function ClientList() {
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
                Clientes
              </Heading>

              <RouterLink to="/clientes/criar">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  borderRadius={4}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo cliente
                </Button>
              </RouterLink>
            </Flex>

            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Cliente</Th>
                  <Th>Fiscal</Th>
                  <Th>Endereço</Th>
                  <Th width="8" />
                </Tr>
              </Thead>
              <Tbody>
                {usersCount.map(key => (
                  <Tr key={key}>
                    <Td>
                      <Box>
                        <Text fontWeight="bold" color="blue.400">
                          Empresa {key}
                        </Text>
                        <Text fontSize="sm" color="gray.300">
                          joaoguibc@gmail.com
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          João
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          (47) 99205-4832
                        </Text>
                      </Box>
                    </Td>

                    <Td>
                      <Text fontSize="sm" color="gray.100">
                        CPF / CNPJ
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        91.243.472/0001-20
                      </Text>
                      <Text fontSize="sm" color="gray.100" mt={2}>
                        Inscrição estadual
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        366.621.530.870
                      </Text>
                    </Td>

                    <Td>
                      <Text fontSize="sm" color="gray.200">
                        Rua Paramaribo - 331
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Santa Regina
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Camboriú - SC
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        88345-653
                      </Text>
                    </Td>

                    <Td>
                      <VStack>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          w="100%"
                          borderRadius={4}
                          colorScheme="blue"
                          leftIcon={
                            isWideVersion && (
                              <Icon as={RiPencilLine} fontSize="16" />
                            )
                          }
                        >
                          {isWideVersion ? (
                            'Editar'
                          ) : (
                            <Icon as={RiPencilLine} fontSize="16" />
                          )}
                        </Button>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          w="100%"
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
                      </VStack>
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
