import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { OPCOES_SITUACAO_VAGA } from '@/models/situacao-vaga'

export function SituacaoVagaRadioGroup({ valor, aoAlterar }) {
  return (
    <FieldSet className="gap-3">
      <FieldLegend variant="label">Situação</FieldLegend>
      <RadioGroup
        value={valor}
        onValueChange={aoAlterar}
        className="flex h-8 flex-wrap items-center gap-4"
      >
        {OPCOES_SITUACAO_VAGA.map((opcao) => (
          <Field key={opcao.valor} orientation="horizontal" className="w-auto">
            <RadioGroupItem value={opcao.valor} id={`situacao-${opcao.valor}`} />
            <FieldLabel htmlFor={`situacao-${opcao.valor}`} className="font-normal">
              {opcao.rotulo}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
