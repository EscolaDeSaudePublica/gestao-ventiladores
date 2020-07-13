import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ColorIconButton from '../forms/ColorIconButton';
import { randomIndex } from '../../../utils';

const isChecked = (checkedData, field) =>
  Object.prototype.hasOwnProperty.call(checkedData, field) &&
  checkedData[field];

const BodyTableLayout = (props) => {
  const {
    data,
    headerKeys,
    checkSelectedRow,
    selectKeyField,
    hasActions,
    actions,
    checkedData,
  } = props;

  return (
    <TableBody>
      {data.map((item, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            key={randomIndex()}
            hover
            role="checkbox"
            tabIndex={-1}
            aria-checked={checkedData[item[selectKeyField]]}
            selected={checkedData[item[selectKeyField]]}>
            <TableCell padding="checkbox">
              <FormControl>
                <Checkbox
                  onClick={(event) =>
                    checkSelectedRow(item[selectKeyField], event.target.checked)
                  }
                  checked={isChecked(checkedData, item[selectKeyField])}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </FormControl>
            </TableCell>
            {headerKeys.map((key) => (
              <TableCell key={randomIndex()}>
                {item[key].toString() || ''}
              </TableCell>
            ))}
            {hasActions ? (
              <TableCell align="right" style={{ minWidth: '99px' }}>
                <Grid container spacing={1} justify="flex-end">
                  {actions
                    .filter(
                      (actionFilter) =>
                        actionFilter.showAction === undefined ||
                        actionFilter.showAction(item),
                    )
                    .map((action) => (
                      <Grid item key={randomIndex()}>
                        <ColorIconButton
                          disabled={isChecked(
                            checkedData,
                            item[selectKeyField],
                          )}
                          item={item}
                          action={() => action.handleEvent(item)}
                          name={action.name}
                          bgColor={action.bgColor}
                          hoverColor={action.hoverColor}
                          icon={action.icon}
                        />
                      </Grid>
                    ))}
                </Grid>
              </TableCell>
            ) : (
              <></>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

BodyTableLayout.defaultProps = {
  hasActions: false,
  actions: [],
  checkedData: {},
};

BodyTableLayout.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  headerKeys: PropTypes.instanceOf(Array).isRequired,
  checkSelectedRow: PropTypes.func.isRequired,
  selectKeyField: PropTypes.string.isRequired,
  hasActions: PropTypes.bool,
  actions: PropTypes.instanceOf(Array),
  checkedData: PropTypes.instanceOf(Object),
};

export default BodyTableLayout;
