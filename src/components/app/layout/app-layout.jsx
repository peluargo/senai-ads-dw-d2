import { CarFront } from 'lucide-react'
import { Link, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="min-h-svh bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
          <Link to="/vagas" className="flex items-center gap-2 font-semibold">
            <CarFront className="size-5" />
            Estacionamento do Condomínio
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
