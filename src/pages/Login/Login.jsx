import React, { Component } from 'react';
import {
  TextField,
  withStyles,
  Avatar,
  Button,
  Container,
  Typography,
  InputAdornment,
  Box,
} from '@material-ui/core';
import * as yup from 'yup';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailIcon from '@material-ui/icons/Email';
import PropTypes from 'prop-types';
import ls from 'local-storage';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../lib/utils/callApi';
import { MyContext } from '../../contexts';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain 8 characters at least one uppercase one lowercase and one number'),
});

const useStyles = (theme) => ({

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  box: {
    marginTop: theme.spacing(16),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      loading: false,
      redirect: false,
      hasError: false,
      error: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
    };
  }

  handleChange = (prop) => (e) => {
    this.setState({ [prop]: e.target.value });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/Trainee" />;
    }
    return true;
  }

  onClickHandler = async (Data, openSnackBar) => {
    this.setState({
      loading: true,
      hasError: true,
    });

    const response = await callApi(
      'post',
      '/user/login',
      {
        data: Data,
        headers: {
          Authorization: ls.get('token'),
        },
      },
    );
    ls.set('token', response.data);

    this.setState({ loading: false });

    const getToken = ls.get('token');
    if (getToken !== 'undefined') {
      this.setState({
        redirect: true,
        hasError: false,
      });
    } else {
      this.setState({
        message: 'Invalid email and Password',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  hasErrors = () => {
    const { hasError } = this.state;
    schema
      .isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  formReset = () => {
    this.setState({
      email: '',
      password: '',
      touched: {},
    });
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, hasError, error, loading,
    } = this.state;
    this.hasErrors();
    return (
      <Container component="main" maxWidth="xs">

        <Box mx="auto" p={2} className={classes.box} boxShadow={3}>
          <div className={classes.container}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                label="Email Address"
                id="email"
                margin="normal"
                value={email}
                error={!!error.email}
                fullWidth
                onChange={this.handleChange('email')}
                helperText={this.getError('email')}
                onBlur={() => this.isTouched('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
              <TextField
                label="Password"
                id="password"
                margin="normal"
                type="password"
                value={password}
                error={!!error.password}
                fullWidth
                onChange={this.handleChange('password')}
                helperText={this.getError('password')}
                onBlur={() => this.isTouched('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
                }}
                variant="outlined"
              />
              <MyContext.Consumer>
                {({ openSnackBar }) => (
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={hasError}
                    onClick={() => {
                      this.onClickHandler({ email, password }, openSnackBar);
                      this.formReset();
                    }}
                  >
                    {loading && (
                      <CircularProgress size={15} />
                    )}
                    {loading && <span>Signing in</span>}
                    {!loading && <span>Sign in</span>}
                    {this.renderRedirect()}
                  </Button>
                )}
              </MyContext.Consumer>
            </form>
          </div>
        </Box>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(useStyles)(Login);
