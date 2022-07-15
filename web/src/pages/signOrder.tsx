import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  theme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Canvas from 'react-canvas-draw';
import { useSearchParams } from 'react-router-dom';

import { Logo } from '@components/Header/Logo';

import {
  useGetClientSignatureQuery,
  useSetClientSignatureMutation,
  useSignOrderMutation,
} from '@graphql/generated/graphql';

type GetSaveDataProps = {
  lines: any[];
  height: number;
  width: number;
};

export function SignOrder() {
  const [value, setValue] = useState('');
  const [signed, setSigned] = useState(false);

  const [searchParams] = useSearchParams();
  const canvas = useRef<any>(null);
  const toast = useToast();

  const clientId = `${searchParams.get('cliente')}`;

  const { data } = useGetClientSignatureQuery({
    variables: { getClientSignatureId: clientId },
  });
  const [loadSignOrder] = useSignOrderMutation({
    onCompleted: () => setSigned(true),
  });
  const [loadSetSignature] = useSetClientSignatureMutation({
    onCompleted: () =>
      loadSignOrder({
        variables: { signOrderId: searchParams.get('pedido') || '' },
      }),
  });

  function handleSaveSignature() {
    if (canvas.current) {
      const { lines }: GetSaveDataProps = JSON.parse(
        canvas.current.getSaveData(),
      );

      if (lines.length === 0) {
        toast({
          title: 'Atenção',
          description: 'Por favor, preencha com sua assinatura',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      } else {
        loadSetSignature({
          variables: {
            data: {
              id: searchParams.get('cliente') || '',
              signature: canvas.current.getSaveData(),
            },
          },
        });
      }
    }
  }

  function handleCleanCanvas() {
    if (canvas.current) {
      canvas.current.clear();
    }
  }

  function handleDrawOldSignature() {
    if (canvas.current) {
      canvas.current.loadSaveData(data?.getClientSignature, true);
    }
  }

  useEffect(() => {
    if (value === '1') {
      handleDrawOldSignature();
    } else {
      handleCleanCanvas();
    }
  }, [value]);
  useEffect(() => {
    if (!searchParams.get('cliente') || !searchParams.get('pedido')) {
      setSigned(true);
    }
  }, []);

  return (
    <Flex direction="column" h="100vh" py="6">
      <Flex as="header" w="100%" mb="6" mx="auto" px="6" align="center">
        <Logo />
      </Flex>

      <Flex
        direction="column"
        flex={1}
        borderRadius={4}
        bg="gray.800"
        px="6"
        py="4"
        mx="6"
      >
        <Heading fontSize="2xl" mb="4">
          Assinar pedido
        </Heading>

        {!signed ? (
          data && (
            <VStack flex={1} justifyContent="center" gap="2">
              <RadioGroup onChange={setValue} value={value}>
                <Stack spacing={4} direction="row">
                  <Radio value="1" isDisabled={!data.getClientSignature}>
                    Reusar assinatura
                  </Radio>
                  <Radio value="2">Assinar novamente</Radio>
                </Stack>
              </RadioGroup>

              <Flex direction="column">
                <Box width="400px">
                  <Button
                    colorScheme="gray"
                    variant="outline"
                    borderBottomWidth={0}
                    borderRightRadius={0}
                    borderBottomLeftRadius={0}
                    fontWeight="normal"
                    width="50%"
                    onClick={handleCleanCanvas}
                    isDisabled={value !== '2'}
                  >
                    Apagar
                  </Button>
                  <Button
                    colorScheme="gray"
                    variant="outline"
                    borderBottomWidth={0}
                    borderLeftRadius={0}
                    borderBottomRightRadius={0}
                    fontWeight="normal"
                    width="50%"
                    onClick={handleSaveSignature}
                    isDisabled={!value}
                  >
                    Assinar
                  </Button>
                </Box>

                <Canvas
                  style={{ borderRadius: 2 }}
                  lazyRadius={2}
                  brushRadius={2}
                  brushColor={theme.colors.gray[900]}
                  catenaryColor={theme.colors.gray[600]}
                  gridColor={theme.colors.gray[300]}
                  canvasHeight={250}
                  backgroundColor={theme.colors.gray[100]}
                  gridSizeX={32}
                  gridSizeY={32}
                  ref={canvas}
                />
              </Flex>
            </VStack>
          )
        ) : (
          <Flex pb="10" justifyContent="center" alignItems="center" flex={1}>
            <Text fontSize="5xl" fontWeight="700">
              Pedido assinado!
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
