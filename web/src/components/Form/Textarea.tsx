import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import {
  FormControl,
  FormLabel,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  Text,
  Flex,
} from '@chakra-ui/react';

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  info?: string;
  leftContent?: string | ReactNode;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, label, info, leftContent, ...rest }, ref) => (
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

    <ChakraTextarea
      name={name}
      id={name}
      size="lg"
      pr="4.5rem"
      minH="150"
      focusBorderColor="blue.500"
      bgColor="gray.900"
      variant="filled"
      _hover={{
        bgColor: 'gray.900',
      }}
      ref={ref}
      {...rest}
    />
  </FormControl>
);

export const Textarea = forwardRef(TextareaBase);
