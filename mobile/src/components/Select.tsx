import {
  Center, FormControl, WarningOutlineIcon, Select as SelectBase, Text,
} from 'native-base';
import { Control, Controller, FieldValues } from 'react-hook-form';

type Data = {
  label: string;
  value: string;
}

interface SelectProps {
  data: Data[];
  title: string;
  info?: string;
  name: string;
  control: Control<FieldValues, any>; // eslint-disable-line
  errors: {
    [x: string]: any; // eslint-disable-line
  };
}

export function Select({
  data, title, info, name, control, errors,
}: SelectProps) {
  return (
    <Center mb="8">
      <FormControl isInvalid={errors[name]}>
        <FormControl.Label>
          <Text
            color="gray.50"
            fontFamily="heading"
            fontWeight={700}
            fontSize="lg"
          >
            {title}
          </Text>
          {info && (
          <Text
            color="gray.500"
            fontFamily="heading"
            fontWeight={400}
            fontSize="xs"
            ml="1"
            alignSelf="center"
          >
            {info}
          </Text>
          )}
        </FormControl.Label>

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value: selectedValue } }) => (
            <SelectBase
              color="gray.50"
              minWidth="200"
              accessibilityLabel={title}
              mt="1"
              selectedValue={selectedValue}
              onValueChange={(itemValue: string) => {
                onChange(itemValue);
              }}
              _selectedItem={{ backgroundColor: 'gray.900' }}
              _actionSheetContent={{ backgroundColor: 'gray.800' }}
            >
              {data && data.map((item) => (
                <SelectBase.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  bg="gray.800"
                  borderRadius="md"
                  _text={{ color: 'gray.50' }}
                />
              ))}
            </SelectBase>
          )}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>
    </Center>
  );
}
