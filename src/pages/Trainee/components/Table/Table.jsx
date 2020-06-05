import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {
  withStyles, createStyles, makeStyles,
} from '@material-ui/core/styles';
import withLoaderAndMessage from '../../../../components/HOC/withLoaderAndMessage';

const StyledTableRow = withStyles((theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  column: {
    color: 'grey',
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const SimpleTable = (props) => {
  const {
    id, data, columns, order, orderBy, onSort, onSelect, action,
    count, onChangeRowsPerPage, page, rowsPerPage, onChangePage,
  } = props;

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={id}>
            <>
              {columns && columns.length && columns.map(({ align, label, field }) => (
                <TableCell key={label} align={align} className={classes.column}>
                  <TableSortLabel
                    align={align}
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={onSort(field)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            <>
              {data.map((element) => (
                <StyledTableRow hover key={element.originalId}>
                  {columns && columns.length && columns.map(({ field, align, format }) => (
                    <TableCell
                      key={field}
                      align={align}
                      onClick={() => onSelect(element.name)}
                      component="th"
                      scope="row"
                    >
                      {format !== undefined ? format(element[field]) : element[field]}
                    </TableCell>
                  ))}
                  {action && action.length && action.map(({ icon, handler, label }) => (
                    <TableCell
                      key={label}
                      onClick={() => handler(element)}
                    >
                      {icon}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <div align="center">
                  <h1>
                    OOPS!, No More Trainees
                  </h1>
                </div>
              </TableCell>

            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[0]}
              count={count}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default withLoaderAndMessage(SimpleTable);


SimpleTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
};
SimpleTable.defaultProps = {
  orderBy: '',
  order: 'asc',
};
