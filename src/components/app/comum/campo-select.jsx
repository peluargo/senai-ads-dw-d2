import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CampoSelect({
  id,
  rotulo,
  placeholder = 'Selecione',
  valor,
  opcoes,
  erro,
  desabilitado = false,
  obrigatorio = false,
  aoAlterar,
  aoFechar,
}) {
  return (
    <Field data-invalid={Boolean(erro)} data-disabled={desabilitado}>
      <FieldLabel htmlFor={id}>
        {rotulo}
        {obrigatorio && <span className="text-destructive">*</span>}
      </FieldLabel>
      <Select
        value={valor}
        onValueChange={aoAlterar}
        onOpenChange={(aberto) => !aberto && aoFechar?.()}
        disabled={desabilitado}
      >
        <SelectTrigger id={id} className="w-full" aria-invalid={Boolean(erro)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-72">
          {opcoes.map((opcao) => (
            <SelectItem key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>{erro}</FieldError>
    </Field>
  )
}
