import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useState,
} from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
  Flex,
  InputLeftAddon,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  info?: string;
  leftContent?: string | ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, info, type, leftContent, ...rest },
  ref,
) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <FormControl>
      {label && (
        <FormLabel fontSize={15} fontWeight="normal" htmlFor={name}>
          <Flex>
            <Text>{label}</Text>
            {info && (
              <Text fontSize="xs" ml={2} lineHeight={2} textColor="gray.400">
                {info}
              </Text>
            )}
          </Flex>
        </FormLabel>
      )}

      <InputGroup size="lg">
        {leftContent && <InputLeftAddon children={leftContent} bg="gray.800" />}

        <ChakraInput
          name={name}
          id={name}
          size="lg"
          pr="4.5rem"
          type={!isPasswordVisible ? type : 'text'}
          focusBorderColor="blue.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900',
          }}
          ref={ref}
          {...rest}
        />

        {type === 'password' && (
          <InputRightElement width="4.5rem">
            <Button
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              type="button"
              colorScheme="blue"
              size="xs"
              borderRadius={4}
            >
              <Icon
                as={isPasswordVisible ? RiEyeLine : RiEyeOffLine}
                w={6}
                h={6}
              />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
