import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {lighten, makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from 'prop-types';


const ActionBarLayout = (props) => {
  const classes = useStyles();
  const {dataChecked, action, textButton, titleBar, ammount} = props;

  return (
    <Toolbar className={clsx(classes.root, {[classes.highlight]: ammount > 0,})}>
      {
        ammount > 0 ? (
          <Typography
            variant="subtitle1"
            component="div"
          >
            {ammount} Ite{ammount > 1 ? 'ns' : 'm'} selecionados
          </Typography>
        ) : (
          <Typography
            variant="subtitle1"
            component="div"
          >
            {titleBar}
          </Typography>
        )
      }

      {
        ammount > 0 ? (
          <Tooltip title="Gerar Ordem Serviço">
            <Button
              onClick={(event) => action(Object.keys(dataChecked), event)}
              variant="outlined"
            >{textButton}</Button>
          </Tooltip>
        ) : (
            <Button
              disabled
              variant="outlined"
            >{textButton}</Button>
        )
      }

    </Toolbar>
  );
};

ActionBarLayout.protoType = {
  action: PropTypes.function,
  titleButton: PropTypes.string,
  textButton: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  highlight: {
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
  },
  title: {
    flex: '1 1 100%',
  },
}));

export default ActionBarLayout;