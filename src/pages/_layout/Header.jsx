import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import SubtitlesSharpIcon from '@material-ui/icons/SubtitlesSharp';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import LocalMallSharpIcon from '@material-ui/icons/LocalMallSharp';
import UnarchiveSharpIcon from '@material-ui/icons/UnarchiveSharp';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  appBar: {
    background: green[500],
  },
  toolbar: {
    height: 240,
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'start',
  },
  text: {
    paddingTop: 20,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  appBarFooter: {
    background: '#2e7d32',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    '& > div': {
      width: 1232,
      margin: 'auto',
      '& a': {
        color: 'white',
        textDecoration: 'none',
        fontSize: 18,
      },
    },
  },
  currentLink: {
    borderBottom: '4px solid white',
  },
  label: {
    display: 'flex',
    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 5,
      textTransform: 'uppercase',
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const menuRoutes = [
    {
      label: 'ORDENS DE SERVIÇO',
      pathname: '/ordens-servicos',
      icon: <LibraryBooksSharpIcon font="small" />,
    },
    {
      label: 'TRIAGEM',
      pathname: '/triagens',
      icon: <AssignmentSharpIcon font="small" />,
    },
    {
      label: 'DIAGNÓSTICO',
      pathname: '/diagnosticos',
      icon: <SubtitlesSharpIcon font="small" />,
    },
    {
      label: 'DEMANDA',
      pathname: '/demandas',
      icon: <LocalMallSharpIcon font="small" />,
    },
    {
      label: 'CALIBRAGEM',
      pathname: '/calibragem',
      icon: <AssignmentTurnedInSharpIcon font="small" />,
    },
    {
      label: 'ENTREGA',
      pathname: '/entregas',
      icon: <UnarchiveSharpIcon font="small" />,
    },
  ];

  const isCurrentItem = (item) => (window.location.pathname === item.pathname ? classes.currentLink : '');

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.text} noWrap>
            <p>CENTRAL</p>
            <p>DE</p>
            <p>VENTILADORES</p>
          </Typography>
        </Toolbar>

        <Container className={classes.appBarFooter}>
          <Grid container spacing={4}>
            {menuRoutes.map((item) => (
              <Grid item key={item.pathname} className={isCurrentItem(item)}>
                <Link to={item.pathname} className={classes.label}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AppBar>
    </>
  );
}
