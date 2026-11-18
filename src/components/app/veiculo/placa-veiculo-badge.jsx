import { Badge } from '@/components/ui/badge'

export function PlacaVeiculoBadge({ placa }) {
  if (!placa) return <span className="text-muted-foreground">-</span>

  return (
    <Badge variant="outline" className="font-mono tracking-widest">
      {placa}
    </Badge>
  )
}
