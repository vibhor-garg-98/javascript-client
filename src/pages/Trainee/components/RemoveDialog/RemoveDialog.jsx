import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import ls from 'local-storage';
import { MyContext } from '../../../../contexts';
import callApi from '../../../../lib/utils/callApi';

class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      loading: false,
    };
  }

  onClickHandler = async (Data, openSnackBar) => {
    const { onSubmit } = this.props;
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(Data.createdAt).isAfter(date));
    this.setState({
      loading: true,
    });

    const response = await callApi(
      'delete',
      `/trainee/${Data}`,
      {
        headers: {
          Authorization: ls.get('token'),
        },
      },
    );
    this.setState({ loading: false });
    if (response.status === 'ok' && isAfter) {
      this.setState({
        message: 'This is a success message',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
        onSubmit(Data);
      });
    } else {
      this.setState({
        message: 'This is a error message',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render = () => {
    const {
      onClose, open, data,
    } = this.props;
    const { loading } = this.state;
    const { originalId: id } = data;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    this.onClickHandler(id, openSnackBar);
                  }}
                >
                  {loading && (
                    <CircularProgress size={15} color="inherit" />
                  )}
                  {loading && <span>Deleting</span>}
                  {!loading && <span>Delete</span>}
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default RemoveDialog;

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
