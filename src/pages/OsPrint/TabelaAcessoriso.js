import React from 'react';
import {
  withStyles,
  makeStyles
} from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {grey} from "@material-ui/core/colors";

const greyColor = grey[300];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: greyColor,
    fontWeight: 'bold',
    border: 1,
    borderColor: greyColor,
    borderStyle: 'solid',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTd = withStyles(() => ({
  body: {
    border: 1,
    borderColor: greyColor,
    borderStyle: 'solid',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
}))(TableCell);


const useStyles = makeStyles({
  table: {
    width: '100%',
    border: 1,
    borderColor: greyColor,
    borderStyle: 'solid',
  },
  quadro: {
    border: 1,
    borderColor: grey[900],
    borderStyle: 'solid',
    padding: '0.5rem'
  }
});

export default function TabelaAcessoriso (props) {
  const classes = useStyles();

  if (!props || !props.equipamento) return (<div></div>)

  function createData (descricao, veio, quantidade, situacao) {
    return {descricao, veio, quantidade, situacao};
  }

  const rows = props.equipamento['selecione_os_acessórios_do_equipamento_que_o_acompanha'].split(', ').map(item => {
    return createData(item.replace(/"/g, ''), '', '', '')
  });

  return (
    <div className={classes.quadro}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell>Veio?</StyledTableCell>
              <StyledTableCell>Quantidade</StyledTableCell>
              <StyledTableCell>Estado de Conservação</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((row, index) => (
                <TableRow key={index}>
                  <StyledTd component="th" scope="row">
                    {row.descricao}
                  </StyledTd>
                  <StyledTd>{row.veio}</StyledTd>
                  <StyledTd>{row.quantidade}</StyledTd>
                  <StyledTd>{row.cituacao}</StyledTd>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}