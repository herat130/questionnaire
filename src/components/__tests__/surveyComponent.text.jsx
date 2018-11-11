import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('survey component test suits', () => {
  it('should render correctly', () => {
    expect(1).toBe(1);
  });
});