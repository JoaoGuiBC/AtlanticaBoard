import { ElementType } from 'react';
import { Icon, Text, Flex, FlexProps } from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends FlexProps {
  icon: ElementType;
  children: string;
  href: string;
  shouldMatchExactHref?: boolean;
}

export function NavLink({
  href,
  icon,
  shouldMatchExactHref = false,
  children,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink to={href} shouldMatchExactHref={shouldMatchExactHref}>
      <Flex display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Flex>
    </ActiveLink>
  );
}
