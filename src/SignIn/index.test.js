import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import SignIn from './index';

const props = {
  emailPlaceholder: 'yayobyte@gmail.com',
  passwordPlaceholder: 'do not send spam, please',
};

describe('<SignIn />', () => {
  const handleSubmit = jest.fn();
  const event = {
    target: {
      value: 'Hello World',
    }
  };
  const tree = shallow(<SignIn
    passwordPlaceholder={props.passwordPlaceholder}
    emailPlaceholder={props.emailPlaceholder}
    handleSubmit={handleSubmit}
  />).dive();
  it('Should be mounted', () => {
    expect(tree.instance().state).toEqual({
      email: '',
      password: '',
      emailPlaceholder: props.emailPlaceholder,
      passwordPlaceholder: props.passwordPlaceholder,
    });
  });
  it('Should handleChange on input', () => {
    expect(tree.instance().state.email).toEqual("");
    tree.instance().handleChange('email')(event);
    expect(tree.instance().state.email).toEqual(event.target.value);
    expect(tree.instance().state.password).toEqual("");
    tree.instance().handleChange('password')(event);
    expect(tree.instance().state.password).toEqual(event.target.value);
  });
  it('Should handle submit', () => {
    tree.find(Button).at(0).simulate('click');
    expect(handleSubmit).toHaveBeenCalledWith(event.target.value, event.target.value);
  });
});
