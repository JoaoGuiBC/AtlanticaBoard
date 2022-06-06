import { Feather } from '@expo/vector-icons';
import { HStack, Icon, Text } from 'native-base';

interface BottomMenuProps {
  title: string;
  color: string;
  icon: string;
}

export function BottomMenu({ title, color, icon }: BottomMenuProps) {
  return (
    <HStack space="1.5" alignItems="center">
      <Text color={color} fontSize="md">{title}</Text>
      <Icon as={Feather} name={icon} color={color} size="6" />
    </HStack>
  );
}
