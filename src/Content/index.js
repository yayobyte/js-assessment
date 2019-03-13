import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/FormControl";
import CardActions from '@material-ui/core/CardActions';
import TranslateIcon from '@material-ui/icons/Translate';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormatClearIcon from '@material-ui/icons/FormatClear';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import intlMessagesEN from '../i18n/locales-en.json';
import intlMessagesES from '../i18n/locales-es.json';
import intlMessagesFR from '../i18n/locales-fr.json';
import intlMessagesPT from '../i18n/locales-pt.json';

import styles from './styles';

class Content extends PureComponent{
  constructor (props) {
    super(props);
    this.state = {
      listOfNames : '',
      translated: false,
      language: 'en',
      intlMessages:  props.intlMessages,
    };
  }
  handleListOfNamesChange = (event) => {
    this.setState({ listOfNames: event.target.value});
  };
  handleReset = () => {
    this.setState(() => ({ listOfNames : '', translated: false}))
  };
  handleLanguageChange = (event) => {
    const { intlMessagesES, intlMessagesFR, intlMessagesEN } = this.props;
    let intlMessages;
    switch (event.target.value) {
      case 'es':
        intlMessages= intlMessagesES;
        break;
      case 'fr':
        intlMessages= intlMessagesFR;
        break;
      case 'pt':
        intlMessages= intlMessagesPT;
        break;
      default:
        intlMessages= intlMessagesEN;
    }
    this.setState(() => ({ language: event.target.value, intlMessages}));
  };
  handleTranslate = () => {
    const { listOfNames, intlMessages } = this.state;
    let arrayOfNames, processedNames;
    arrayOfNames = listOfNames.replace(/(?:\r\n|\r|\n)/g, " ");
    arrayOfNames = arrayOfNames.split(" ");
    processedNames = arrayOfNames.map((value) => {
      const randomGreetingId = Math.floor(Math.random() * Object.keys(intlMessages).length);
      return `${intlMessages[Object.keys(intlMessages)[randomGreetingId]]} ${value}`;
    });
    this.setState(() => ({ listOfNames: processedNames.join("\n"), translated: true }));
  };
  render() {
    const { classes, handleLogout } = this.props;
    const { listOfNames, translated, language } = this.state;
    const { handleListOfNamesChange, handleTranslate, handleReset, handleLanguageChange } = this;
    return (
      <main className={classes.main}>
        <Card className={classes.paper}>
          <CardHeader
            title={
              <div>
                <Avatar className={classes.avatar}>
                  <TranslateIcon/>
                </Avatar>
                <br />
                <Typography variant="h3">Greetings</Typography>
              </div>
            }
          />
          <form className={classes.form}>
            <Typography variant="body1" color="textPrimary">
              Input a list of names separated by an <strong>ENTER </strong>
              and select <strong>Language</strong> your name with a greeting in the language selected
            </Typography>
            <br />
            <FormControl margin="normal" variant="outlined" required fullWidth>
              <InputLabel htmlFor="listOfNames">List of names</InputLabel>
              <OutlinedInput
                id="textField"
                name="listOfNames"
                placeholder="Input list of names here..."
                value={listOfNames}
                onChange={handleListOfNamesChange}
                readOnly={translated}
                labelWidth={110}
                autoFocus
                multiline
              />
            </FormControl>
            <br />
            <br />
            <FormControl variant="outlined" className={classes.formControl} fullWidth required>
              <InputLabel htmlFor="Language">
                Language
              </InputLabel>
              <Select
                value={language}
                onChange={(event) => handleLanguageChange(event, language)}
                disabled={translated}
                input={
                  <OutlinedInput
                    labelWidth={80}
                    name="Language"
                  />
                }
              >
                <MenuItem value="en"><TranslateIcon/>&nbsp; English</MenuItem>
                <MenuItem value="es"><TranslateIcon/>&nbsp; Spanish</MenuItem>
                <MenuItem value="fr"><TranslateIcon/>&nbsp; French</MenuItem>
                <MenuItem value="pt"><TranslateIcon/>&nbsp; Portuguese</MenuItem>
              </Select>
            </FormControl>
          </form>
          <br />
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
              disabled={!translated}
              onClick={() => {handleReset()}}
            >
              <FormatClearIcon/><span>Reset</span>
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
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
  intlMessagesEN: PropTypes.object.isRequired,
  intlMessagesES: PropTypes.object.isRequired,
  intlMessagesFR: PropTypes.object.isRequired,
};

Content.defaultProps = {
  intlMessages: intlMessagesEN,
  intlMessagesEN: intlMessagesEN,
  intlMessagesES: intlMessagesES,
  intlMessagesFR: intlMessagesFR,
};

export default withStyles(styles)(Content);
