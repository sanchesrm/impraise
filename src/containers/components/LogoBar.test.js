import React from 'react';
import { mount } from "enzyme";
import LogoBar from './LogoBar';


describe('<LogoBar />', () => {
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

  it('renders LogoBar', () => {
    const wrapper = mount(<LogoBar />);
    expect(wrapper.find('.logo').exists()).toBeTruthy();
    expect(wrapper.find('.sublogo').exists()).toBeTruthy();
  });
});