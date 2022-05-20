import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text,
  Flex,
} from '@chakra-ui/react';

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  info?: string;
  leftContent?: string | ReactNode;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, info, leftContent, ...rest },
  ref,
) => (
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

    <ChakraSelect
      name={name}
      id={name}
      size="lg"
      color="gray.50"
      focusBorderColor="blue.500"
      bgColor="gray.900"
      colorScheme="red"
      variant="filled"
      _hover={{
        bgColor: 'gray.900',
      }}
      ref={ref}
      {...rest}
    />
  </FormControl>
);

export const Select = forwardRef(SelectBase);
