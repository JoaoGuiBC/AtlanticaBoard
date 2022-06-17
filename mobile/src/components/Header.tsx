import {
  Heading, HStack, Icon, Pressable,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { UseAuth } from '@hooks/auth';
import { HeaderMenu } from './HeaderMenu';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { signOut } = UseAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <HStack
      bg="gray.900"
      width="100%"
      py={6}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <HeaderMenu />

      <Heading
        alignSelf="center"
        color="gray.50"
        fontFamily="heading"
        fontWeight={700}
        fontSize="2xl"
      >
        {title}
      </Heading>

      <Pressable onPress={handleSignOut} py="3" px="5">
        <Icon as={Feather} name="log-out" color="gray.50" size="6" />
      </Pressable>
    </HStack>
  );
}
