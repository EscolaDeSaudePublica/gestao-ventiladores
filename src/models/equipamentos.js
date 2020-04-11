import api from "../services/api";
import {listaFormAcessorios} from "./acessorio";

export function Equipamento (equipamento) {
  return {
    numero_ordem_servico: '',
    status: '',
    triagem: EquipamentoTriagem(
      {
        triagem: equipamento.triagem
      } || {
        triagem: {
          acessorios: listaFormAcessorios([])
        }
      }
    )
  };
}

export function EquipamentoTriagem ({triagem}) {
  return Object.assign(
    {
      nome_equipamento: 'Ventilador Mecânico',
      foto_equipamento_chegada: '',
      tipo: '',
      unidade_de_origem: '',
      numero_do_patrimonio: '',
      numero_de_serie: '',
      instituicao_de_origem: '',
      nome_responsavel: '',
      contato_responsavel: '',
      estado_de_conservacao: '',
      fabricante: '',
      marca: '',
      modelo: '',
      acessorios: [],
      foto_apos_limpeza: '',
      observacao: '',
      responsavel_pelo_preenchimento: ''
    },
    triagem || {acessorios: listaFormAcessorios([])}
  );
}


/**
 * Seach screnning by status
 *      triagem
 *      diagnostico
 *      manutencao
 *      etc
 */
export function getScreeningByStatus (status) {
  return api.get(
    '/api/equipamentos?status=' + status,
  )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

export function salvarTriagem (equipamento) {
  return api.post(
    '/api/equipamentos',
    Object.assign(
      equipamento,
      {
        status: 'triagem',
        created_at: new Date()
      }
    ),
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}