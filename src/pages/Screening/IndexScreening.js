import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TableCheckedList from "../_common/SelectableTable/TableCheckedList";
import moment from 'moment-timezone';
import Paper from "@material-ui/core/Paper";
import {orange} from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";


const IndexScreening = (props) => {
  const history = useHistory();

  const {serviceOrders, editScreening} = props;

  const [screening, setScreening] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [load, setLoad] = useState(true);

  const headerData = [
    {id: 'numero_ordem_servico', name: 'Ordem de Serviço'},
    {id: 'numero_de_serie', name: 'Número de Série'},
    {id: 'marca', name: 'Marca'},
    {id: 'modelo', name: 'Modelo'},
    {id: 'origem', name: 'Origem'},
    {id: 'created_at', name: 'Data de criação'}
  ];

  const actions = [
    {name: 'Editar', handleEvent: editScreening, icon: {bgColor: orange[500], hoverColor: orange[700], icon: <EditIcon/>}}
  ];

  function defineData () {
    if (!serviceOrders) return;
    if (!load) return;

    setScreening(serviceOrders);
    setDataTable(serviceOrders.sort((a, b) => {
      if (typeof (a.created_at) === 'object' && a.created_at && a.created_at['$date']) {
        a = a.created_at['$date'];
      }
      if (typeof (b.created_at) === 'object' && b.created_at && b.created_at['$date']) {
        b = b.created_at['$date'];
      }
      return new Date(b) - new Date(a);
    }).map(item => {
      const equip = item.equipamento[0] || {};
      if (typeof (item.created_at) === 'object' && item.created_at && item.created_at['$date']) {
        item.created_at = item.created_at['$date'];
      }
      return {
        numero_ordem_servico: item.numero_ordem_servico,
        marca: equip.marca || '',
        modelo: equip.modelo || '',
        instituicao_de_origem: equip.instituicao_de_origem || '',
        numero_de_serie: equip.numero_de_serie || '',
        origem: equip.nome_instituicao_origem || '',
        created_at: moment.tz(new Date(item.created_at), 'America/Fortaleza').format('DD/MM/Y')
      };
    }));
    setLoad(false);
  }

  function actionPrint (data) {
    history.push({
      pathname: "/osprint",
      state: {
        data: screening.filter(item => data.find(d => d.numero_ordem_servico === item.numero_ordem_servico))
      }
    }, [screening]);
  };

  useEffect(defineData, [defineData, serviceOrders]);

  if (load) {
    return <React.Fragment/>
  }

  return (
    <React.Fragment>
      <Paper>
        <TableCheckedList
          actions={actions}
          dataTable={dataTable}
          selectKeyField="numero_ordem_servico"
          headerTable={headerData}
          actionFunction={actionPrint}
          actionBarTitle="Lista de Equipamento (Nenhum item selecionado)"
          actionBarTextButton="Visualizar Ordem de Serviços"
        />
      </Paper>
    </React.Fragment>
  );
};

export default IndexScreening;