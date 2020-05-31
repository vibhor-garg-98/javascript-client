import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  withStyles,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { MyContext } from '../../../../contexts';

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isValid: false,
      touched: {},
    };
  }

  handleNameChange = (event) => {
    const { touched } = this.setState;
    this.setState({
      name: event.target.value,
      isValid: true,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          name: true,
        },
      });
    });
  };

  handleEmailChange = (event) => {
    const { touched } = this.state;
    this.setState({
      email: event.target.value,
      isValid: true,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          email: true,
        },
      });
    });
  };

  isTouched = (value) => {
    const { touched } = this.state;
    const { data } = this.props;
    this.setState({
      touched: {
        ...touched,
        [value]: true,

      },
      isValid: true,
    }, () => {
      Object.keys(data).forEach((keys) => {
        if (!touched[keys]) {
          this.setState({
            [keys]: data[keys],
          });
        }
      });
    });
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      isValid: false,
      touched: {},
    });
  }

  render() {
    const { classes } = this.props;
    const {
      open, onClose, onSubmit, data,
    } = this.props;
    const { name, email, isValid } = this.state;

    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit TRAINEE</DialogTitle>
        <DialogContent className={classes.useStyles}>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-helperText"
                label="Name"
                defaultValue={data.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
                onChange={this.handleNameChange}
                onBlur={() => { this.isTouched('name'); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-helperText"
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                defaultValue={data.email}
                variant="outlined"
                onChange={this.handleEmailChange}
                onBlur={() => { this.isTouched('email'); }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <MyContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                disabled={!isValid}
                onClick={() => {
                  onSubmit({ name, email });
                  this.formReset();
                  openSnackBar('This is a success message ! ', 'success');
                }}
                color="primary"
              >
                Submit
              </Button>
            )}
          </MyContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(EditDialog);

EditDialog.propTypes = {

  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
