/* globals api, expect, describe, beforeEach, afterEach, it */
require('../helper');

const User = require('../../../models/user');

describe('Authentications', function() {

  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('POST /api/register', function() {

    it('should register a user with the correct credentials', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome username!');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should not register a user without a username', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          expect(res.body.errors.username).to.eq('Username is required.');
          done();
        });
    });

    it('should not register a user without an email', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          expect(res.body.errors.email).to.eq('Email is required.');
          done();
        });
    });

    it('should not register a user without a password', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          expect(res.body.errors.password).to.eq('Password is required.');
          done();
        });
    });

    it('should not register a user with no password confirmation', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          expect(res.body.errors.passwordConfirmation).to.eq('Passwords do not match.');
          done();
        });
    });
  });

  describe('checking unique fields', function() {

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(() => done())
        .catch(() => done());
    });

    it('should not register a user with duplicate email', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username2',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          expect(res.body.errors.email).to.eq('That email has already been taken.');
          done();
        });
    });

    it('should not register a user with duplicate username', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          email: 'user2@user2.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          expect(res.body.errors.username).to.eq('That username has already been taken.');
          done();
        });
    });

  });

  describe('POST /api/login', function() {

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end(() => {
          done();
        });
    });

    it('should login a user with the correct credentials', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'user@user.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome back username!');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should not login a user without an email', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Invalid Credentials');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });

    it('should not login a user with the wrong password', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'user@user.com',
          password: '123123'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Invalid Credentials');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });

  });
});
