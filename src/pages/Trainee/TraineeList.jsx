import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import trainee from './data/trainee';
import AddDialog, { EditDialog, RemoveDialog, Table } from './components/index';
import { MyContext } from '../../contexts';
import GET_TRAINEE from './query';

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2, 0, 2),
  },
});

class Trainee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      EditOpen: false,
      RemoveOpen: false,
      orderBy: '',
      order: 'asc',
      page: 0,
      rowsPerPage: 10,
      newData: {},
      loading: true,
    };
  }

  openDialog = (status) => {
    this.setState({ open: status });
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleSelect = (data) => {
    console.log(data);
  };

  handleClose = (status) => {
    this.setState({ EditOpen: status, RemoveOpen: status });
  };

  handleDeleteClick = (refetch) => () => {
    const { page, rowsPerPage } = this.state;
    const {
      data: {
        getTrainee: { count = 0 } = {},
      },
    } = this.props;
    this.setState({
      RemoveOpen: false,
    });
    if (count - page * rowsPerPage !== 1) {
      refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
    } else if (page !== 0) {
      refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
    } else {
      refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
    }
  };


  handleRemoveDialogOpen = (data) => {
    this.setState({ RemoveOpen: true, newData: data });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, newData: data });
  }

  handleFormat = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  onSubmit = () => {
    const { page } = this.state;
    this.setState({ open: false, EditOpen: false, loading: true }, () => {
      this.handleTable(page);
    });
  };

  handleTable = (refetch) => async (event, newPage) => {
    const { rowsPerPage } = this.state;
    await refetch({ skip: newPage * rowsPerPage, limit: rowsPerPage });
    this.setState({ page: newPage });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen,
      newData,
    } = this.state;
    const {
      classes,
      data: {
        getTrainee: { records = [], count = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={() => this.openDialog(true)}>
            ADD TRAINEE
          </Button>
        </div>

        <Table
          id="id"
          data={records}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
                align: 'center',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                format: this.handleFormat,
              },
            ]
          }
          action={[
            {
              label: 'editIcon',
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              label: 'deleteIcon',
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onChangePage={this.handleTable(refetch)}
          loading={loading}
        />
        <AddDialog
          data={newData}
          onClose={() => this.openDialog(false)}
          onSubmit={() => this.onSubmit}
          open={open}
        />
        <EditDialog
          data={newData}
          onClose={() => this.handleClose(false)}
          onSubmit={this.onSubmit}
          open={EditOpen}
        />
        <RemoveDialog
          data={newData}
          onClose={() => this.handleClose(false)}
          onSubmit={this.handleDeleteClick(refetch)}
          open={RemoveOpen}
        />

        <ul>
          {
            trainee && trainee.length && trainee.map((element) => (
              <Fragment key={element.id}>
                <li key={element.id}>
                  <Link to={`/Trainee/${element.id}`}>{element.name}</Link>
                </li>
              </Fragment>
            ))
          }
        </ul>
      </>
    );
  }
}

Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

Trainee.contextType = MyContext;

export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: {
      variables: { skip: 0, limit: 10 },
    },
  }),
)(Trainee);
