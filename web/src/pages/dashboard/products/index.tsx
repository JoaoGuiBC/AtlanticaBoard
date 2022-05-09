import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

const productsCount = [
  {
    name: 'Confecção de estrutura metálica galvanizada com revestimento em LONA COM IMPRESÃO DIGITAL DE ALTA QUALIDADE',
    price: '250,00',
    cost: '',
    description: '',
  },
  {
    name: 'Confecção de estrutura metálica galvanizado com revestimentos lona PVC com tratamento anti-wicking',
    price: '250,00',
    cost: '100,00',
    description:
      'O tratamento anti-wicking serve para evitar a impregnação de sujeira e aumentar sua durabilidade. Camadas de PVC com alto índice de aditivo anti-UV e anti-fungos, no intuito de evitar o amarelamento e ressecamento',
  },
  {
    name: 'Acm estutrura metalica galvanizada com revestimento em ACM',
    price: '500,00',
    cost: '150,00',
    description: '',
  },
  {
    name: 'Confecção de estrutura metálica galvanizada com revestimentos Telhas de Aluzinco (Bandeja TELHA + ISOPOR + CHAPA FORRO)',
    price: '250,00',
    cost: '',
    description: 'Medidas e detalhes confome projeto',
  },
];

export function ProductList() {
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
                Produtos
              </Heading>

              <RouterLink to="/produtos/criar">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  borderRadius={4}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo produto
                </Button>
              </RouterLink>
            </Flex>

            <VStack>
              {productsCount.map(product => (
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  borderTop="1px"
                  py="5"
                  borderColor="gray.600"
                  key={product.name}
                >
                  <VStack pr="5" alignItems="flex-start">
                    <Text fontWeight="bold" color="blue.400">
                      {product.name}
                    </Text>

                    <Text fontWeight="medium" color="gray.400">
                      Valor:{' '}
                      <Text as="span" fontWeight="light" color="gray.200">
                        R$ {product.price}
                      </Text>
                    </Text>

                    {product.cost && (
                      <Text fontWeight="medium" color="gray.400">
                        Custo:{' '}
                        <Text as="span" fontWeight="light" color="gray.200">
                          R$ {product.cost}
                        </Text>
                      </Text>
                    )}

                    {product.description && (
                      <Text fontWeight="normal" color="gray.200">
                        {product.description}
                      </Text>
                    )}
                  </VStack>

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
                </Flex>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
