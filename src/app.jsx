import { RouterProvider } from 'react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { rotas } from '@/routes/rotas'

export function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={rotas} />
      <Toaster richColors position="top-right" />
    </TooltipProvider>
  )
}
