import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import trainee from './data/trainee';
import AddDialog, { EditDialog, RemoveDialog, Table } from './components/index';

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
      rowsPerPage: 3,
      newData: {},
    };
  }

  openDialog = (status) => {
    this.setState({ open: status });
  };

  onSubmit = (data) => {
    this.setState({ open: false, EditOpen: false }, () => { console.log('Submit Item', data); });
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

  handleClose = (data, status) => {
    this.setState({ EditOpen: status, RemoveOpen: status });
  };

  handleDeleteClick = (values) => {
    this.setState({ RemoveOpen: false });
    console.log('Deleted Items', values.data);
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, newData: data });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ RemoveOpen: true, newData: data });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  Format = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen, newData,
    } = this.state;
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={() => this.openDialog(true)}>
            ADD TRAINEE
          </Button>
        </div>
        <Table
          id="id"
          data={trainee}
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
                format: this.Format,
              },
            ]
          }
          action={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onChangePage={this.handleChangePage}
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
          onSubmit={this.handleDeleteClick}
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
};

export default withStyles(useStyles)(Trainee);
