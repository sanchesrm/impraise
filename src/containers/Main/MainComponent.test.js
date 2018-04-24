import React from 'react';
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { MainComponent } from './MainComponent';
import { SearchBar } from '../components/SearchBar';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<MainComponent />', () => {
  function setup() {
    const props = {
      shortenList: {},
      fetchUrlShortened: jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      ),
      fetchShortenedURLS: jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      )
    };
  
    const wrapper = shallow(<MainComponent {...props} store={store}/>);
    
    return {
      props,
      wrapper
    }
  }

  it('renders clear history button', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.clear-history-btn').exists()).toBeTruthy();
  });
});