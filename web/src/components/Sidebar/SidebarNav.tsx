import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiTeamLine,
  RiToolsLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Infográficos
        </NavLink>
      </NavSection>

      <NavSection title="CADASTRO / CONSULTA">
        <NavLink icon={RiContactsLine} href="/clientes">
          Clientes
        </NavLink>
        <NavLink icon={RiToolsLine} href="/produtos">
          Produtos
        </NavLink>
        <NavLink icon={RiTeamLine} href="/funcionarios" shouldMatchExactHref>
          Funcionários
        </NavLink>
      </NavSection>

      <NavSection title="FUNCIONAL">
        <NavLink icon={RiInputMethodLine} href="/forms">
          Formulários
        </NavLink>
        <NavLink icon={RiGitMergeLine} href="/automation">
          Automação
        </NavLink>
      </NavSection>
    </Stack>
  );
}
