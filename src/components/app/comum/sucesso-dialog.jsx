import { CircleCheck } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function SucessoDialog({ aberto, titulo, descricao, textoBotao = 'Ok', aoConcluir }) {
  return (
    <AlertDialog open={aberto} onOpenChange={(valor) => !valor && aoConcluir()}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
            <CircleCheck />
          </AlertDialogMedia>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{descricao}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center group-data-[size=sm]/alert-dialog-content:flex sm:justify-center">
          <AlertDialogAction onClick={aoConcluir}>{textoBotao}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
