import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/hooks';
import { useLocation } from 'react-router-dom';
import { createContext, ReactNode, useContext, useEffect } from 'react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const route = useLocation();

  useEffect(() => disclosure.onClose(), [route.pathname]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
