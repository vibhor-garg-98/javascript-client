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
import { Mutation } from '@apollo/react-components';
import { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE } from './mutation';
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
      message: '',
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

  handleDeleteClick = async (data, openSnackBar, deleteTrainee) => {
    const { page, rowsPerPage } = this.state;
    const {
      data: {
        getTrainee: { count = 0 } = {},
        refetch,
      },
    } = this.props;
    const { id } = data;
    const response = await deleteTrainee({ variables: { id } });
    if (response) {
      this.setState({
        message: 'Trainee deleted successfully',
        RemoveOpen: false,
      }, () => { const { message } = this.state; openSnackBar(message, 'success'); });
    }

    if (count - page * rowsPerPage === 1 && page > 0) {
      refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
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

  onSubmitAddDialog = async (data, createTrainee, openSnackBar) => {
    const { name, email, password } = data;
    const response = await createTrainee({ variables: { name, email, password } });
    if (response) {
      this.setState({
        message: 'Trainee created successfully',
        open: false,
      }, () => { const { message } = this.state; openSnackBar(message, 'success'); });
    }
  };

  onSubmitEditDialog = async (data, openSnackBar, updateTrainee) => {
    const { name, email, id } = data;
    const response = await updateTrainee({ variables: { name, email, id } });
    if (response) {
      this.setState({
        message: 'Trainee updated successfully',
        EditOpen: false,
      }, () => { const { message } = this.state; openSnackBar(message, 'success'); });
    }
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

    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };
    return (
      <Mutation mutation={DELETE_TRAINEE} refetchQueries={[{ query: GET_TRAINEE, variables }]}>
        {(deleteTrainee, loaderDelete = { loading }) => (
          <Mutation mutation={CREATE_TRAINEE} refetchQueries={[{ query: GET_TRAINEE, variables }]}>
            {(createTrainee, loaderCreate = { loading }) => (
              <Mutation
                mutation={UPDATE_TRAINEE}
                refetchQueries={[{ query: GET_TRAINEE, variables }]}
              >
                {(updateTrainee, loaderUpdate = { loading }) => (
                  <MyContext.Consumer>
                    {({ openSnackBar }) => (
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
                          onSubmit={
                            (data) => this.onSubmitAddDialog(data, createTrainee, openSnackBar)
                          }
                          open={open}
                          loading={loaderCreate}
                        />
                        <EditDialog
                          data={newData}
                          onClose={() => this.handleClose(false)}
                          onSubmit={
                            (data) => this.onSubmitEditDialog(data, openSnackBar, updateTrainee)
                          }
                          open={EditOpen}
                          loading={loaderUpdate}
                        />
                        <RemoveDialog
                          data={newData}
                          onClose={() => this.handleClose(false)}
                          onSubmit={
                            (data) => this.handleDeleteClick(data, openSnackBar, deleteTrainee)
                          }
                          open={RemoveOpen}
                          loading={loaderDelete}
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
                    )}
                  </MyContext.Consumer>
                )}

              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
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
