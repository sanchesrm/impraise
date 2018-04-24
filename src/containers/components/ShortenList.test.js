import React from 'react';
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { ShortenList } from './ShortenList';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<ShortenList />', () => {
  it('renders empty list in ShortenList', () => {
    const props = {
      shortenList: {}
    };
    const wrapper = mount(<ShortenList {...props} store={store} />);
    expect(wrapper.find('.noURLToShow').exists()).toBeTruthy();
  });

  it('renders ShortenList with elements', () => {
    const props = {
      shortenList: { "TIhVSf": { "startDate": "2018-04-23T19:49:01+00:00", "redirectCount": 0, "url": "https://gist.github.com" } }
    };

    const wrapper = mount(<ShortenList {...props} store={store} />);
    const tbody = wrapper.find('tbody')
    
    expect(wrapper.find('.noURLToShow').exists()).toBeFalsy();
    expect(tbody.find('tr').length).toBe(1);
  });

  it('renders ShortenList newElement', () => {
    const props = {
      shortenList: { "TIhVSf": { "startDate": "2018-04-23T19:49:01+00:00", "redirectCount": 0, "url": "https://gist.github.com", "newElement": true } }
    };

    const wrapper = mount(<ShortenList {...props} store={store} />);
    const tbody = wrapper.find('tbody')
    expect(tbody.find('tr.newElementClass').length).toBe(1);
  });
});