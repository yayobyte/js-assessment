import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';

import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/es/Typography/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import SnackbarContent from '@material-ui/core/SnackbarContent';

import SignIn from '../SignIn/index';
import Content from '../Content/index';
import credentials from './credentials';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      loggedIn: true,
      open: false,
      email: props.email,
      password: props.password,
    };
  }
  handleSubmit = (email, password) => {
    if (this.validateLogin(email, password))
    {
      this.setState(() => ({ loggedIn: true }));
    }else {
      this.setState(() => ({ open: true }));
    }
  };
  handleLogout = () => this.setState(() => ({ loggedIn: false }));
  closeSnackBar = () => {
    this.setState(() => ({ open: false }));
  };
  validateLogin = (email, password) => {
    return email === this.state.email && password === this.state.password;
  };
  render() {
    const { handleSubmit, closeSnackBar, handleLogout } = this;
    const { loggedIn, email, password } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        {!loggedIn && <SignIn handleSubmit={handleSubmit} emailPlaceholder={email} passwordPlaceholder={password} />}
        {loggedIn && <Content handleLogout={handleLogout}/>}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={10000}
          onClose={closeSnackBar}
        >
          <SnackbarContent
            message={
              <div>
                <span>
                  <InfoIcon />
                  <Typography variant="body1" color="secondary">Username: {email}</Typography>
                  <Typography variant="body1" color="secondary">Password: {password}</Typography>
                </span>
              </div>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={closeSnackBar}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

App.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

App.defaultProps = {
  email: credentials.email,
  password: credentials.password,
};

export default App;
