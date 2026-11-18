import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function ConfirmacaoDialog({
  aberto,
  aoAlterarAberto,
  titulo,
  descricao,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  destrutivo = false,
  aoConfirmar,
}) {
  return (
    <AlertDialog open={aberto} onOpenChange={aoAlterarAberto}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{descricao}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{textoCancelar}</AlertDialogCancel>
          <AlertDialogAction variant={destrutivo ? 'destructive' : 'default'} onClick={aoConfirmar}>
            {textoConfirmar}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
