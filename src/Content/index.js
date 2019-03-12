import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CardActions from '@material-ui/core/CardActions';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import styles from './styles';
import Typography from "@material-ui/core/es/Typography/Typography";

class Content extends PureComponent{
  state = {
    listOfNames : '',
  };
  handleListOfNamesChange = () => {};
  render() {
    const { classes, handleLogout } = this.props;
    const { listOfNames } = this.state;
    const { handleListOfNamesChange } = this;
    return (
      <main className={classes.main}>
        <Card className={classes.paper}>
          <CardHeader
            title={<Typography variant="h3">List Of Names</Typography>}
            subheader={<Typography variant="h5" color="textPrimary">Input lists of names</Typography>}
            action={
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => {handleLogout()}}
              >
                <PowerSettingsNew/><span>Log out</span>
              </Button>
            }
          />
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="listOfNames">Email Address</InputLabel>
              <Input id="textField" name="listOfNames" autoComplete="email" autoFocus placeholder="Input names here..."
                 value={listOfNames} onChange={handleListOfNamesChange}/>
            </FormControl>
          </form>
          <CardActions>
            <Button color="primary">
              Translate
            </Button>
          </CardActions>
        </Card>
      </main>
    );
  }
}

Content.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
