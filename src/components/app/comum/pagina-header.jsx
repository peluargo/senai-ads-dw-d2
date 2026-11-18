export function PaginaHeader({ titulo, subtitulo, children }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{titulo}</h1>
        {subtitulo && <p className="text-sm text-muted-foreground">{subtitulo}</p>}
      </div>
      {children}
    </header>
  )
}
