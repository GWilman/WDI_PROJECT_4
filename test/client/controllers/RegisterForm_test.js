/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import RegisterForm from '../../../src/components/auth/RegisterForm';

describe('RegisterForm tests', () => {

  it('should render five input fields', done => {
    const props = {
      user: {
        username: '',
        email: '',
        image: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {}
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('FormControl').length).to.equal(5);
    done();
  });

  it('should populate the form', done => {
    const props = {
      user: {
        username: 'username',
        email: 'email',
        image: 'image',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      },
      errors: {}
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find({ value: 'username' }).length).to.equal(1);
    expect(wrapper.find({ value: 'email' }).length).to.equal(1);
    expect(wrapper.find({ value: 'image' }).length).to.equal(1);
    expect(wrapper.find({ value: 'password' }).length).to.equal(1);
    expect(wrapper.find({ value: 'passwordConfirmation' }).length).to.equal(1);
    done();
  });

  it('should correctly display errors', done => {
    const props = {
      user: {
        username: '',
        email: '',
        image: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {
        username: 'Username is required.',
        email: 'Email is required.',
        password: 'Password is required.'
      }
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('small.red').length).to.equal(3);
    done();
  });

});
