import { ArrowLeft, Save, Trash2 } from 'lucide-react'

import { CampoSelect } from '@/components/app/comum/campo-select'
import { CampoTextoInput } from '@/components/app/comum/campo-texto-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field'

function paraOpcoes(itens, obterValor, obterRotulo) {
  return itens.map((item) => ({ valor: String(obterValor(item)), rotulo: obterRotulo(item) }))
}

export function ReservaForm({
  formulario,
  opcoes,
  obterErro,
  podeSalvar,
  exibirExcluir,
  aoAlterarCampo,
  aoTocarCampo,
  aoSalvar,
  aoVoltar,
  aoExcluir,
}) {
  const opcoesVagas = paraOpcoes(
    opcoes.vagas,
    (vaga) => vaga.id,
    (vaga) => `Vaga ${vaga.numero}`,
  )
  const opcoesBlocos = paraOpcoes(
    opcoes.blocos,
    (bloco) => bloco.id,
    (bloco) => bloco.nome,
  )
  const opcoesApartamentos = paraOpcoes(
    opcoes.apartamentos,
    (apartamento) => apartamento.id,
    (apartamento) => `Apartamento ${apartamento.numero}`,
  )
  const opcoesModelos = paraOpcoes(
    opcoes.modelos,
    (modelo) => modelo,
    (modelo) => modelo,
  )
  const opcoesCores = paraOpcoes(
    opcoes.cores,
    (cor) => cor,
    (cor) => cor,
  )

  return (
    <form onSubmit={aoSalvar} noValidate>
      <Card>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Vaga</FieldLegend>
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <CampoSelect
                  id="vagaId"
                  rotulo="Número"
                  placeholder="Selecione a vaga"
                  valor={formulario.vagaId}
                  opcoes={opcoesVagas}
                  erro={obterErro('vagaId')}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('vagaId', valor)}
                  aoFechar={() => aoTocarCampo('vagaId')}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Apartamento</FieldLegend>
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <CampoSelect
                  id="blocoId"
                  rotulo="Bloco"
                  placeholder="Selecione o bloco"
                  valor={formulario.blocoId}
                  opcoes={opcoesBlocos}
                  erro={obterErro('blocoId')}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('blocoId', valor)}
                  aoFechar={() => aoTocarCampo('blocoId')}
                />
                <CampoSelect
                  key={formulario.blocoId}
                  id="apartamentoId"
                  rotulo="Apartamento"
                  placeholder={
                    formulario.blocoId ? 'Selecione o apartamento' : 'Selecione um bloco'
                  }
                  valor={formulario.apartamentoId}
                  opcoes={opcoesApartamentos}
                  erro={obterErro('apartamentoId')}
                  desabilitado={!formulario.blocoId}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('apartamentoId', valor)}
                  aoFechar={() => aoTocarCampo('apartamentoId')}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Veículo</FieldLegend>
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <CampoTextoInput
                  id="veiculoPlaca"
                  rotulo="Placa"
                  placeholder="ABC1D23"
                  descricao="Padrão Mercosul: três letras, um número, uma letra e dois números."
                  value={formulario.veiculoPlaca}
                  maxLength={7}
                  autoComplete="off"
                  className="font-mono tracking-widest uppercase"
                  erro={obterErro('veiculoPlaca')}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('veiculoPlaca', valor)}
                  onBlur={() => aoTocarCampo('veiculoPlaca')}
                />
                <CampoTextoInput
                  id="veiculoProprietario"
                  rotulo="Proprietário"
                  placeholder="Nome do proprietário"
                  value={formulario.veiculoProprietario}
                  maxLength={120}
                  erro={obterErro('veiculoProprietario')}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('veiculoProprietario', valor)}
                  onBlur={() => aoTocarCampo('veiculoProprietario')}
                />
                <CampoSelect
                  id="veiculoModelo"
                  rotulo="Modelo"
                  placeholder="Selecione o modelo"
                  valor={formulario.veiculoModelo}
                  opcoes={opcoesModelos}
                  erro={obterErro('veiculoModelo')}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('veiculoModelo', valor)}
                  aoFechar={() => aoTocarCampo('veiculoModelo')}
                />
                <CampoSelect
                  id="veiculoCor"
                  rotulo="Cor"
                  placeholder="Selecione a cor"
                  valor={formulario.veiculoCor}
                  opcoes={opcoesCores}
                  erro={obterErro('veiculoCor')}
                  obrigatorio
                  aoAlterar={(valor) => aoAlterarCampo('veiculoCor', valor)}
                  aoFechar={() => aoTocarCampo('veiculoCor')}
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={aoVoltar}>
            <ArrowLeft data-icon="inline-start" />
            Voltar
          </Button>
          <Button type="submit" disabled={!podeSalvar}>
            <Save data-icon="inline-start" />
            Salvar
          </Button>
          {exibirExcluir && (
            <Button type="button" variant="destructive" className="ml-auto" onClick={aoExcluir}>
              <Trash2 data-icon="inline-start" />
              Excluir
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
