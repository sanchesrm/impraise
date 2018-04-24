import React from 'react';
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { SearchBar } from './SearchBar';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<SearchBar />', () => {
  it('renders SearchBar', () => {
    const wrapper = shallow(<SearchBar/>);

    expect(wrapper.find('.shortenInput').exists()).toBeTruthy();
    expect(wrapper.find('.shortenButton').exists()).toBeTruthy();
  });
});