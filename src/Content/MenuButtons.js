import React from 'react';
import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import FormatClearIcon from '@material-ui/icons/FormatClear';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const MenuButtons = ({ translated, handleTranslate, handleReset, handleLogout }) => (
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
);

MenuButtons.propTypes = {
  translated: PropTypes.bool.isRequired,
  handleTranslate: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default MenuButtons;
