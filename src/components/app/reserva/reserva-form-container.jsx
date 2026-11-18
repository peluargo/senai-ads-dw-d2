import { Link } from 'react-router'

import { ConfirmacaoDialog } from '@/components/app/comum/confirmacao-dialog'
import { PaginaHeader } from '@/components/app/comum/pagina-header'
import { SucessoDialog } from '@/components/app/comum/sucesso-dialog'
import { ReservaForm } from '@/components/app/reserva/reserva-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useReservaFormViewModel } from '@/viewmodels/use-reserva-form-view-model'

export function ReservaFormContainer({ titulo, subtitulo, reservaId, vagaIdSugerida }) {
  const viewModel = useReservaFormViewModel({ reservaId, vagaIdSugerida })

  if (viewModel.reservaNaoEncontrada) {
    return (
      <>
        <PaginaHeader titulo={titulo} subtitulo={subtitulo} />
        <Card>
          <CardContent className="flex flex-col items-start gap-4">
            <p className="text-sm text-muted-foreground">Reserva não encontrada.</p>
            <Button asChild variant="outline">
              <Link to="/vagas">Voltar para a listagem</Link>
            </Button>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      <PaginaHeader titulo={titulo} subtitulo={subtitulo} />

      <ReservaForm
        formulario={viewModel.formulario}
        opcoes={viewModel.opcoes}
        obterErro={viewModel.obterErro}
        podeSalvar={viewModel.podeSalvar}
        exibirExcluir={viewModel.modoEdicao}
        aoAlterarCampo={viewModel.alterarCampo}
        aoTocarCampo={viewModel.marcarComoTocado}
        aoSalvar={viewModel.salvar}
        aoVoltar={viewModel.voltar}
        aoExcluir={viewModel.solicitarExclusao}
      />

      <ConfirmacaoDialog
        aberto={viewModel.dialogoDescarteAberto}
        aoAlterarAberto={viewModel.setDialogoDescarteAberto}
        titulo="Descartar alterações?"
        descricao="Existem alterações não salvas no formulário. Deseja descartá-las e voltar para a listagem?"
        textoConfirmar="Descartar"
        destrutivo
        aoConfirmar={viewModel.confirmarDescarte}
      />

      <ConfirmacaoDialog
        aberto={viewModel.dialogoExclusaoAberto}
        aoAlterarAberto={viewModel.setDialogoExclusaoAberto}
        titulo="Excluir reserva?"
        descricao="Esta ação não poderá ser desfeita. A vaga voltará a ficar disponível."
        textoConfirmar="Excluir"
        destrutivo
        aoConfirmar={viewModel.confirmarExclusao}
      />

      <SucessoDialog
        aberto={viewModel.dialogoSucessoAberto}
        titulo={
          viewModel.modoEdicao
            ? 'Reserva atualizada com sucesso!'
            : 'Cadastro realizado com sucesso!'
        }
        descricao="Os dados da reserva foram salvos."
        aoConcluir={viewModel.concluirSucesso}
      />
    </>
  )
}
