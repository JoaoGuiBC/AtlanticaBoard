import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { Control, Controller, FieldValues } from 'react-hook-form';
import {
  FormControl, Text, Input as InputBase, Button, Box, Icon,
} from 'native-base';

interface InputProps extends TextInputProps {
  isSecret?: boolean;
  name: string;
  title: string;
  control: Control<FieldValues, any>; // eslint-disable-line
  errors: {
    [x: string]: any; // eslint-disable-line
  };
}

export function Input({
  control, errors, name, title, isSecret = false, ...rest
}: InputProps) {
  const [isTextHidden, setIsTextHidden] = useState(isSecret);

  function handleUpdateTextVisibility() {
    setIsTextHidden((oldState) => !oldState);
  }

  return (
    <FormControl mb="8" isInvalid={errors[name]}>
      <FormControl.Label>
        <Text
          color="gray.50"
          fontFamily="heading"
          fontWeight={700}
          fontSize="lg"
        >
          {title}
        </Text>
      </FormControl.Label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, onChange, value } }) => (
          <Box flexDir="row" borderColor="gray.100" borderWidth="1" borderRadius="sm">
            <InputBase
              flex={1}
              borderWidth={0}
              color="gray.50"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isTextHidden}
              {...rest}
            />
            {isSecret && (
              <Button
                onPress={handleUpdateTextVisibility}
                colorScheme="darkBlue"
                h="7"
                w="10"
                mr="2"
                alignSelf="center"
              >
                <Icon as={Feather} name={isTextHidden ? 'eye' : 'eye-off'} color="gray.100" size="5" />
              </Button>
            )}
          </Box>
        )}
      />

      <FormControl.ErrorMessage>
        {errors[name] && errors[name].message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
