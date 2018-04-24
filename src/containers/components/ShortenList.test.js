import React from 'react';
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { ShortenList } from './ShortenList';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<ShortenList />', () => {
  function setup() {
    const props = {
      shortenList: {}
    };
  
    const wrapper = mount(<ShortenList {...props} store={store}/>);
    
    return {
      props,
      wrapper
    }
  }

  it('renders ShortenList', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.noURLToShow').exists()).toBeTruthy();
  });
});