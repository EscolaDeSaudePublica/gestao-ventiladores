import React, {useEffect, useState} from 'react';
import {getAllEquipments} from "../../models/equipamentos";
import Layout from "../_layout/Layout";
import Container from "@material-ui/core/Container";
import ActionTableList from "../_common/ActionTable/ActionTableList";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";

const headerData = [
  {id: 'numero_ordem_servico', name: 'Ordem de Serviço'},
  {id: 'numero_de_serie', name: 'Número de Série'},
  {id: 'marca', name: 'Marca'},
  {id: 'modelo', name: 'Modelo'},
  {id: 'instituicao_de_origem', name: 'Origem'},
];

const IndexDiagnosis = (props) => {
  const history = useHistory();

  const [requestBlock, setRequestBlock] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (equipments.length === 0 && !requestBlock) {
      getAllEquipments()
        .then(result => {
          if (!result) return;

          setEquipments(result);
          setDataTable(result.map(item => {
            return {
              numero_ordem_servico: item.numero_ordem_servico,
              marca: item.triagem.marca || '',
              modelo: item.triagem.modelo || '',
              instituicao_de_origem: item.triagem.instituicao_de_origem || '',
              numero_de_serie: item.triagem.numero_de_serie,
            };
          }));
        })
        .catch(error => {
          console.log('consultando triagem', error);
        });

      setRequestBlock(true);
    }
  }, [requestBlock, equipments]);

  const openFormDiagnosis = (value) => {
    history.push({
      pathname: '/novo-diagnostico',
      state: {
        data: equipments.find(item => item.numero_ordem_servico === value.numero_ordem_servico)
      }
    }, [equipments]);
  };

  const menuOptions = [
    {
      name: 'Efetuar diagnóstico',
      action: openFormDiagnosis
    }
  ];

  return (
    <div>
      <Layout>
        <Container>
          <div style={{marginTop: "2rem"}}>
            <Grid container justify={"space-between"}>
              <Grid item xs={"auto"}>
                <Typography variant={"h5"} component={"h5"}>
                  Lista de equipamentos cadastrados
                </Typography>
              </Grid>
              <Grid item xs={"auto"}></Grid>
            </Grid>
          </div>

          <ActionTableList
            dataTable={dataTable}
            headerTable={headerData}
            menuOptions={menuOptions}
          >
          </ActionTableList>
        </Container>
      </Layout>
    </div>

  );
};

export default IndexDiagnosis;