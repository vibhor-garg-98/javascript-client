import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ls from 'local-storage';
import trainee from './data/trainee';
import AddDialog, { EditDialog, RemoveDialog, Table } from './components/index';
import callApi from '../../lib/utils/callApi';
import { MyContext } from '../../contexts';

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
      rowData: [],
      loading: true,
      count: 0,
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

  handleDeleteClick = () => {
    const { page, rowsPerPage, count } = this.state;
    this.setState({ RemoveOpen: false });
    if (count - page * rowsPerPage !== 1) {
      this.handleTable(page);
    } else if (page !== 0) {
      this.handleTable(page - 1);
      this.setState({ page: page - 1 });
    } else {
      this.handleTable(page);
    }
  };


  handleRemoveDialogOpen = (data) => {
    this.setState({ RemoveOpen: true, newData: data });
  }

  Format = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  handleChangePage = (event, newPage) => {
    this.handleTable(newPage);
    this.setState({
      page: newPage,
      loading: true,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, newData: data });
  }

  onSubmit = () => {
    const { page } = this.state;
    this.setState({ open: false, EditOpen: false, loading: true }, () => {
      this.handleTable(page);
    });
  };

  handleTable = (newPage) => {
    const { rowsPerPage } = this.state;
    const value = this.context;
    callApi(
      'get',
      '/trainee',
      {
        params: { skip: newPage * rowsPerPage, limit: rowsPerPage },
        headers: {
          Authorization: ls.get('token'),
        },
      },
    ).then((res) => {
      if (res.data === undefined) {
        this.setState({
          loading: false,
          message: 'This is an error',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        this.setState({ rowData: res.data.records, count: res.data.count, loading: false });
      }
    });
  }

  componentDidMount = () => {
    this.handleTable(0);
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen,
      newData, rowData, loading, count,
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
          data={rowData}
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
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onChangePage={this.handleChangePage}
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

Trainee.contextType = MyContext;

export default withStyles(useStyles)(Trainee);
