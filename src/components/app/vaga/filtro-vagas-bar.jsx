import { PesquisaVagasInput } from '@/components/app/vaga/pesquisa-vagas-input'
import { SituacaoVagaRadioGroup } from '@/components/app/vaga/situacao-vaga-radio-group'
import { Card, CardContent } from '@/components/ui/card'

export function FiltroVagasBar({
  pesquisa,
  situacao,
  aoAlterarPesquisa,
  aoLimparPesquisa,
  aoAlterarSituacao,
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 md:flex-row md:items-end">
        <PesquisaVagasInput
          valor={pesquisa}
          aoAlterar={aoAlterarPesquisa}
          aoLimpar={aoLimparPesquisa}
        />
        <SituacaoVagaRadioGroup valor={situacao} aoAlterar={aoAlterarSituacao} />
      </CardContent>
    </Card>
  )
}
