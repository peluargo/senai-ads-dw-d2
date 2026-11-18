import { createBrowserRouter, Navigate } from 'react-router'

import { AppLayout } from '@/components/app/layout/app-layout'
import { NaoEncontradaPage } from '@/pages/nao-encontrada-page'
import { CadastroReservaPage } from '@/pages/reserva/cadastro-reserva-page'
import { DetalharReservaPage } from '@/pages/reserva/detalhar-reserva-page'
import { ListagemVagasPage } from '@/pages/vaga/listagem-vagas-page'

export const rotas = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/vagas" replace /> },
      { path: 'vagas', element: <ListagemVagasPage /> },
      { path: 'reservas/nova', element: <CadastroReservaPage /> },
      { path: 'reservas/:reservaId', element: <DetalharReservaPage /> },
      { path: '*', element: <NaoEncontradaPage /> },
    ],
  },
])
