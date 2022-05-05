import { cloneElement, ReactElement } from 'react';
import { useLocation, Link, LinkProps } from 'react-router-dom';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const route = useLocation();

  let isActive = false;

  if (shouldMatchExactHref && route.pathname === rest.to) {
    isActive = true;
  }

  if (!shouldMatchExactHref && `/${route.pathname.split('/')[1]}` === rest.to) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'blue.400' : 'gray.50',
      })}
    </Link>
  );
}
