import React, { PureComponent } from 'react';
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

class Content extends PureComponent{
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          Welcome
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Content);
