import React from 'react';
import { shallow } from 'enzyme';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from "@material-ui/core/es/Typography/Typography";

import App from './App';
import credentials from './credentials';

describe('<App />',() => {
  const tree = shallow(<App email={credentials.email} password={credentials.password} />).dive();
  it('Should initialize component', () => {
    expect(tree.instance().state).toEqual({ loggedIn: false, open: false, email: credentials.email, password: credentials.password });
  });
  it('Should validate login', () => {
    expect(tree.instance().validateLogin('yayo', 'yayo')).toBeFalsy();
    expect(tree.instance().validateLogin(credentials.email, credentials.password)).toBeTruthy();
  });
  it('Should handle login submit', () => {
    expect(tree.instance().state.loggedIn).toBeFalsy();
    tree.instance().handleSubmit('yayo', 'yayo');
    expect(tree.instance().state.loggedIn).toBeFalsy();
    tree.instance().handleSubmit(credentials.email, credentials.password);
    expect(tree.instance().state.loggedIn).toBeTruthy();
  });
  it('Should handle logout', () => {
    expect(tree.instance().state.loggedIn).toBeTruthy();
    tree.instance().handleLogout();
    expect(tree.instance().state.loggedIn).toBeFalsy();
  });
  it('Should close snackbar', () => {
    expect(tree.instance().state.open).toBeTruthy();
    expect(tree.find(Snackbar).get(0).props).toBeDefined();
    tree.instance().closeSnackBar();
    expect(tree.instance().state.open).toBeFalsy();
  });
});
