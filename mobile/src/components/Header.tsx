import { Heading, HStack, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <HStack
      bg="gray.900"
      width="100%"
      py={6}
      justifyContent="space-around"
      alignItems="center"
    >
      <Icon as={Feather} name="menu" color="gray.50" size="6" />

      <Heading
        alignSelf="center"
        color="gray.50"
        fontFamily="heading"
        fontWeight={700}
        fontSize="2xl"
      >
        {title}
      </Heading>

      <Icon as={Feather} name="log-out" color="gray.50" size="6" />
    </HStack>
  );
}
