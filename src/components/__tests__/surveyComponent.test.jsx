import React from 'react';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SurveyComponent from '../SurveyComponent';
import data, { questions , questions3} from '../__mocks__/survey.data';

configure({ adapter: new Adapter() });

let wrapper;
const middleWare = [thunk];
const mockStore = configureStore(middleWare);
const initialData = data;
const store = mockStore({ surveyReducer: initialData });

describe('survey component test suits', () => {

  it('in case of no Quetions ,it should render correctly', () => {
    wrapper = mount(
      <Provider store={store}>
        <SurveyComponent />
      </Provider>);
    expect(wrapper.find('.no-data').length).toBe(1);
  });

  it('in case of one Quetions ,it should render correctly', () => {
    initialData.questionnaire.questions = questions;
    const newStore = mockStore({ surveyReducer: initialData });
    wrapper = mount(
      <Provider store={newStore}>
        <SurveyComponent />
      </Provider>);
    expect(wrapper.find('.no-data').length).toBe(0);

    expect(wrapper.find('.previous').length).toBe(1);
    expect(wrapper.find('.previous').get(0).props.disabled).toEqual(true);

    expect(wrapper.find('.next').length).toBe(1);
    expect(wrapper.find('.next').get(0).props.disabled).toEqual(true);

    expect(wrapper.find('.submit').get(0).props.style.display).toEqual('block');
  });

  it('in case of more than 1 question it should render', () => {
    initialData.questionnaire.questions = questions3;
    const newStore = mockStore({ surveyReducer: initialData });
    wrapper = mount(
      <Provider store={newStore}>
        <SurveyComponent />
      </Provider>);
    expect(wrapper.find('.no-data').length).toBe(0);

    expect(wrapper.find('.previous').length).toBe(1);
    expect(wrapper.find('.previous').get(0).props.disabled).toEqual(true);

    expect(wrapper.find('.next').length).toBe(1);
    expect(wrapper.find('.next').get(0).props.disabled).toEqual(false);

    expect(wrapper.find('.submit').get(0).props.style.display).toEqual('none');
  });

});