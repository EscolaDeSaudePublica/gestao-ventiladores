import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ThemeButton from "../_common/forms/ThemeButton";
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import FormRegisteredItems from "../Diagnosis/DiagnosisForm/FormRegisteredItems";


const DialogTableItems = (props) => {
  const classes = useStyle();
  const {headerTable, action} = props;
  const [dataTable, setDataTable] = useState([]);

  if (dataTable.length === 0) {
    setDataTable(props.dataTable || []);
  }

  function updateField (value, index, field) {
    const items = dataTable.slice();
    items[index][field] = value;
    setDataTable(items)
  }

  return (
    <React.Fragment>
      <Grid container justify={"space-between"} className={classes.titleRow}>
        <Grid item xs={'auto'}>
          <Typography variant={"h4"}>
            LISTA DE ITENS SELECIONADOS
          </Typography>
        </Grid>
        <Grid item xs={'auto'}>
          <ThemeButton onClick={() => action(dataTable)} startIcon={<SaveSharpIcon/>}>Salvar ordem de compra</ThemeButton>
        </Grid>
      </Grid>

      <FormRegisteredItems
        items={dataTable}
        updateItemsFromTable={updateField}
      />

      {/*<TableContainer>*/}
      {/*  <Table>*/}
      {/*    <TableHead>*/}
      {/*      <TableRow>*/}
      {/*        {headerTable.map((item, index) => (*/}
      {/*          <TableCell key={index}>{item.name}</TableCell>*/}
      {/*        ))}*/}
      {/*      </TableRow>*/}
      {/*    </TableHead>*/}
      {/*    <TableBody>*/}
      {/*      {dataTable.map((item, index) => (*/}
      {/*        <TableRow key={index}>*/}
      {/*          {headerTable.map((head, headerIndex) => {*/}
      {/*            if (head.id === 'tipo') return (*/}
      {/*              <TableCell key={headerIndex}>{item[head.id] === 'pecas' ? 'Peças' : 'Acessórios'}</TableCell>*/}
      {/*            );*/}
      {/*            if (head.id !== 'quantidade') return (*/}
      {/*              <TableCell key={headerIndex}>{item[head.id]}</TableCell>*/}
      {/*            );*/}

      {/*            return (*/}
      {/*              <TableCell key={headerIndex}>*/}
      {/*                <TextField*/}
      {/*                  label={""}*/}
      {/*                  type={"number"}*/}
      {/*                  fullWidth*/}
      {/*                  value={item[head.id]}*/}
      {/*                  onChange={(event) => updateAmmount(event.target.value, index)}*/}
      {/*                />*/}
      {/*              </TableCell>*/}
      {/*            );*/}

      {/*          })*/}
      {/*          }*/}
      {/*        </TableRow>*/}
      {/*      ))}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}

      {/*</TableContainer>*/}
    </React.Fragment>
  );
};

const useStyle = makeStyles(() => ({
  titleRow: {
    marginTop: '2rem',
    marginBottom: '2rem'
  }
}));

export default DialogTableItems;