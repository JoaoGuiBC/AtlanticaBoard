import { forwardRef, ForwardRefRenderFunction, useState } from 'react';
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
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, type, ...rest },
  ref,
) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <FormControl>
      {!!label && (
        <FormLabel fontSize={15} fontWeight="normal" htmlFor={name}>
          {label}
        </FormLabel>
      )}

      <InputGroup size="lg">
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
