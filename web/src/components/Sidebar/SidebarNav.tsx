import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiTeamLine,
  RiToolsLine,
  RiPencilRuler2Line,
  RiFileList3Line,
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
        <NavLink icon={RiPencilRuler2Line} href="/forms">
          Orçamentos
        </NavLink>
        <NavLink icon={RiFileList3Line} href="/automation">
          Pedidos de compra
        </NavLink>
      </NavSection>
    </Stack>
  );
}
