/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoginForm from '../../../src/components/auth/LoginForm';

describe('LoginForm tests', () => {

  it('should render two input fields', done => {
    const props = {
      user: {
        email: '',
        password: ''
      },
      errors: {}
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('FormControl').length).to.equal(2);
    done();
  });

  it('should populate the form', done => {
    const props = {
      user: {
        email: 'email',
        password: 'password'
      },
      errors: {}
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find({ value: 'email' }).length).to.equal(1);
    expect(wrapper.find({ value: 'password' }).length).to.equal(1);
    done();
  });

  it('should correctly display errors', done => {
    const props = {
      user: {
        email: '',
        password: ''
      },
      errors: {
        message: 'Invalid Credentials'
      }
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('small.red').length).to.equal(1);
    done();
  });

});
