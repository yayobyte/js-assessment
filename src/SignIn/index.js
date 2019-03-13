import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import styles from './styles';


class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailPlaceholder: props.emailPlaceholder,
      passwordPlaceholder: props.passwordPlaceholder,
    };
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  render () {
    const { classes, handleSubmit } = this.props;
    const { email, password, emailPlaceholder, passwordPlaceholder } = this.state;
    const { handleChange } = this;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder={emailPlaceholder}
                value={email}
                onChange={handleChange('email')}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={handleChange('password')}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {handleSubmit(email, password)}}
            >
              <LockOpenIcon/><span>Login</span>
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  emailPlaceholder: PropTypes.string.isRequired,
  passwordPlaceholder: PropTypes.string.isRequired,
};

export default withStyles(styles)(SignIn);
