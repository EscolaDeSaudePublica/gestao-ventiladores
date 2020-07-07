import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import Paper from '@material-ui/core/Paper';
import {
  blueGrey,
  orange,
} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import TableCheckedList from '../_common/SelectableTable/TableCheckedList';
import { hasPhoto } from '../../utils/serviceOrderUtils';
import CarouselImageScreening from '../../components/CarouselImageScreening/CarouselImageScreening';

const IndexScreening = (props) => {
  const history = useHistory();
  const selectKeyField = 'numero_ordem_servico';

  const { serviceOrders, editScreening } = props;

  const [screening, setScreening] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [load, setLoad] = useState(true);

  const [modalItem, setModalItem] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const headerData = [
    { id: 'numero_ordem_servico', name: 'Ordem de Serviço' },
    { id: 'numero_de_serie', name: 'Número de Série' },
    { id: 'marca', name: 'Marca' },
    { id: 'modelo', name: 'Modelo' },
    { id: 'origem', name: 'Origem' },
    { id: 'created_at', name: 'Data de criação' },
  ];

  const showModalImage = (item) => {
    setModalItem({ ...item });
    setOpenModal(true);
  };

  const actions = [
    {
      name: 'Visualizar Imagens',
      handleEvent: showModalImage,
      showAction: (item) => hasPhoto(item),
      icon: {
        bgColor: blueGrey[300],
        hoverColor: blueGrey[500],
        icon: <ImageIcon />,
      },
    },
    {
      name: 'Editar',
      handleEvent: editScreening,
      icon: {
        bgColor: orange[500],
        hoverColor: orange[700],
        icon: <EditIcon />,
      },
    },
  ];

  function defineData() {
    if (!serviceOrders) return;
    if (!load) return;

    setScreening(serviceOrders);
    setDataTable(
      serviceOrders
        .sort((a, b) => {
          let orderA = a;
          let orderB = b;
          if (
            typeof a.created_at === 'object' &&
            a.created_at &&
            a.created_at.$date
          ) {
            orderA = a.created_at.$date;
          }
          if (
            typeof b.created_at === 'object' &&
            b.created_at &&
            b.created_at.$date
          ) {
            orderB = b.created_at.$date;
          }
          return new Date(orderB) - new Date(orderA);
        })
        .map((item) => {
          const newItem = { ...item };
          const equip = item.equipamento[0] || {};
          if (
            typeof item.created_at === 'object' &&
            item.created_at &&
            item.created_at.$date
          ) {
            newItem.created_at = item.created_at.$date;
          }
          return {
            _id: item._id,
            triagem: {
              foto_antes_limpeza: item.triagem.foto_antes_limpeza,
              foto_apos_limpeza: item.triagem.foto_apos_limpeza,
            },
            numero_ordem_servico: item.numero_ordem_servico,
            marca: equip.marca || '',
            modelo: equip.modelo || '',
            instituicao_de_origem: equip.instituicao_de_origem || '',
            numero_de_serie: equip.numero_de_serie || '',
            origem: equip.nome_instituicao_origem || '',
            created_at: moment
              .tz(new Date(newItem.created_at), 'America/Fortaleza')
              .format('DD/MM/Y'),
          };
        }),
    );
    setLoad(false);
  }

  const actionPrint = (data) => {
    history.push(
      {
        pathname: '/osprint',
        state: {
          data: screening.filter((item) =>
            data.find((d) => d === item.numero_ordem_servico),
          ),
        },
      },
      [screening],
    );
  };

  useEffect(defineData, [defineData, serviceOrders]);

  if (load) {
    return <></>;
  }

  return (
    <>
      <Paper>
        <TableCheckedList
          actions={actions}
          dataTable={dataTable}
          selectKeyField={selectKeyField}
          headerTable={headerData}
          actionFunction={actionPrint}
          actionBarTitle="Lista de Equipamentos (Nenhum item selecionado)"
          actionBarTextButton="Visualizar Ordens de Serviço"
        />
      </Paper>
      <CarouselImageScreening
        item={modalItem}
        open={openModal}
        close={() => setOpenModal(false)}
      />
    </>
  );
};

IndexScreening.propTypes = {
  serviceOrders: PropTypes.instanceOf(Array).isRequired,
  editScreening: PropTypes.func.isRequired,
};

export default IndexScreening;
