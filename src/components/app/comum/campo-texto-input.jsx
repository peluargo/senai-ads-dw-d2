import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function CampoTextoInput({
  id,
  rotulo,
  descricao,
  erro,
  obrigatorio = false,
  aoAlterar,
  ...props
}) {
  return (
    <Field data-invalid={Boolean(erro)}>
      <FieldLabel htmlFor={id}>
        {rotulo}
        {obrigatorio && <span className="text-destructive">*</span>}
      </FieldLabel>
      <Input
        id={id}
        aria-invalid={Boolean(erro)}
        required={obrigatorio}
        onChange={(evento) => aoAlterar(evento.target.value)}
        {...props}
      />
      {descricao && !erro && <FieldDescription>{descricao}</FieldDescription>}
      <FieldError>{erro}</FieldError>
    </Field>
  )
}
