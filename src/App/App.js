import React, { PureComponent, Fragment } from 'react';
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

class App extends PureComponent {
  state={
    loggedIn: false,
    open: false,
  };
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
    return email === 'yayobyte@gmail.com' && password === '1234';
  };
  render() {
    const { handleSubmit, closeSnackBar, handleLogout } = this;
    const { loggedIn } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        {!loggedIn && <SignIn handleSubmit={handleSubmit}/>}
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
                  <Typography variant="body1" color="secondary">Username: yayobyte@gmail.com</Typography>
                  <Typography variant="body1" color="secondary">Password: 1234</Typography>
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

export default App;
