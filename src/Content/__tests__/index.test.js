import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";

import intlMessagesEN from '../../i18n/locales-en.json';
import intlMessagesES from '../../i18n/locales-es.json';
import intlMessagesFR from '../../i18n/locales-fr.json';
import intlMessagesPT from '../../i18n/locales-pt.json';

import Content from '../index';

const props = {
  handleLogout: jest.fn(),
  intlMessages: intlMessagesEN,
  intlMessagesEN,
  intlMessagesES,
  intlMessagesFR,
  intlMessagesPT,
};

describe('<Content />', () => {
  const tree = shallow(<Content { ...props } />).dive();
  const initialState = {
    listOfNames : '',
    translated: false,
    language: 'en',
    intlMessages:  props.intlMessages,
  }
  const value = 'Albert Einstein';
  it('Should mount component', () => {
    expect(tree.instance().state).toEqual(initialState);
  });
  it('Should handle change of list of names', () => {
    tree.instance().handleListOfNamesChange({ target: { value }});
    expect(tree.instance().state.listOfNames).toEqual(value);
  });
  it('Should handle language change', () => {
    tree.instance().handleLanguageChange({ target: { value: 'fr' } });
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesFR);
    tree.instance().handleLanguageChange({ target: { value: 'en' } });
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesEN);
    tree.instance().handleLanguageChange({ target: { value: 'es' } });
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesES);
    tree.instance().handleLanguageChange({ target: { value: 'pt' } });
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesPT);
  });
  it('Should translate array of names', () => {
    expect(tree.instance().state.translated).toBeFalsy();
    tree.instance().handleTranslate();
    expect(tree.instance().state.translated).toBeTruthy();
    expect(tree.instance().state.listOfNames).toBeDefined();
  });
  it('Should handle reset', () => {
    expect(tree.instance().state.translated).toBeTruthy();
    tree.instance().handleReset();
    expect(tree.instance().state.translated).toBeFalsy();
    expect(tree.instance().state.listOfNames).toEqual('');
  });
  it('Should change state', () => {
    tree.find(Select).simulate('change', { target: { value: 'fr' } } );
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesFR);
    tree.find(Select).simulate('change', { target: { value: 'pt' } } );
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesPT);
    tree.find(Select).simulate('change', { target: { value: 'en' } } );
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesEN);
    tree.find(Select).simulate('change', { target: { value: 'es' } } );
    expect(tree.instance().state.intlMessages).toEqual(props.intlMessagesES);
  });
  it('Should Contain Menu Buttons', () => {
    tree.handleTranslate = jest.fn();
    tree.handleReset = jest.fn();
    tree.instance().setState(() => ({ translated: true }), () => {
      expect(shallow(shallow(tree.children().dive().dive().dive().dive().children().get(4)).props().children[0]).simulate('click')).toBeDefined();
    });
    expect(shallow(shallow(tree.children().dive().dive().dive().dive().children().get(4)).props().children[1]).simulate('click')).toBeDefined();
    expect(shallow(shallow(tree.children().dive().dive().dive().dive().children().get(4)).props().children[2]).simulate('click')).toBeDefined();
    expect(props.handleLogout).toHaveBeenCalled();
  });
});
