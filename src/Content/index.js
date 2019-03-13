import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/FormControl";
import CardActions from '@material-ui/core/CardActions';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import styles from './styles';
import intlMessagesES from '../i18n/locales-es.json';

class Content extends PureComponent{
  constructor (intlMessages) {
    super(intlMessages);
    this.state = {
      listOfNames : '',
      translated: false,
      intlMessages,
    };
  }
  handleListOfNamesChange = (event) => {
    this.setState({ listOfNames: event.target.value});
  };
  handleReset = () => {
    this.setState(() => ({ listOfNames : '', translated: false}))
  };
  handleTranslate = () => {
    const { listOfNames, intlMessages } = this.state;
    let arrayOfNames, processedNames;
    arrayOfNames = listOfNames.replace(/(?:\r\n|\r|\n)/g, " ");
    arrayOfNames = arrayOfNames.split(" ");
    console.log(Object.keys(intlMessages.intlMessages).length);
    processedNames = arrayOfNames.map((value) => {
      const randomGreetingId = Math.floor(Math.random() * Object.keys(intlMessages.intlMessages).length);
      return `${intlMessages.intlMessages[Object.keys(intlMessages.intlMessages)[randomGreetingId]]} ${value}`;
    });
    this.setState(() => ({ listOfNames: processedNames.join("\n"), translated: true }));
  };
  render() {
    const { classes, handleLogout } = this.props;
    const { listOfNames, translated } = this.state;
    const { handleListOfNamesChange, handleTranslate, handleReset } = this;
    return (
      <main className={classes.main}>
        <Card className={classes.paper}>
          <CardHeader
            title={<Typography variant="h3">List Of Names</Typography>}
          />
          <form className={classes.form}>
            <Typography variant="body1" color="textPrimary">
              Input a list of names separated by an <strong>ENTER </strong>
              and select <strong>language</strong> to get the greeting translated
            </Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="listOfNames">List of names</InputLabel>
              <Input
                id="textField"
                name="listOfNames"
                autoFocus
                placeholder="Input list of names here..."
                value={listOfNames}
                onChange={handleListOfNamesChange}
                readOnly={translated}
                multiline
              />
            </FormControl>
          </form>
          <br />
          <CardActions>
            <Button
              color="primary"
              variant="outlined"
              disabled={translated}
              onClick={() => handleTranslate()}
            >
              <InsertEmoticonIcon/><span>Greet</span>
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!translated}
              onClick={() => {handleReset()}}
            >
              <PowerSettingsNewIcon/><span>Reset</span>
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => {handleLogout()}}
            >
              <PowerSettingsNewIcon/><span>Log out</span>
            </Button>
          </CardActions>
        </Card>
      </main>
    );
  }
}

Content.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  intlMessages: PropTypes.object,
};

Content.defaultProps = {
  intlMessages: intlMessagesES,

};

export default withStyles(styles)(Content);
