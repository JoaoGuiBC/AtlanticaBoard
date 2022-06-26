import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  theme,
  VStack,
} from '@chakra-ui/react';
import Canvas from 'react-canvas-draw';

import { Logo } from '@components/Header/Logo';
import { useRef } from 'react';

export function SignOrder() {
  const canvas = useRef<any>(null);

  function handleSaveSignature() {
    if (canvas.current) {
      console.log(canvas.current.getDataURL());
    }
  }
  function handleCleanCanvas() {
    if (canvas.current) {
      console.log(canvas.current.clear());
    }
  }

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

        <VStack flex={1} justifyContent="center" gap="2">
          <RadioGroup defaultValue="2">
            <Stack spacing={4} direction="row">
              <Radio value="1">Reusar assinatura</Radio>
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
      </Flex>
    </Flex>
  );
}
