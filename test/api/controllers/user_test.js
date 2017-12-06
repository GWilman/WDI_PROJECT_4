/* globals api, expect, describe, beforeEach, afterEach, it */
require('../helper');

const User = require('../../../models/user');

describe('Users', function() {

  let token;

  beforeEach(done => {
    User.collection.remove();
    done();
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  describe('GET /api/users', () => {

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
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should return a 200 response', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an array of users', function(done) {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of user objects', function(done) {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'id',
              'username',
              'email',
              'image',
              'leagues',
              'picks',
              'createdAt',
              'updatedAt'
            ]);

          done();
        });
    });

    it('should have properties: _id, firstName, lastName, image, role, email', function(done) {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const firstUser = res.body[0];
          expect(firstUser)
            .to.have.property('id')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('username')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('email')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('image')
            .and.to.be.a('string');
          expect(firstUser)
            .to.have.property('leagues')
            .and.to.be.a('array');
          expect(firstUser)
            .to.have.property('picks')
            .and.to.be.a('array');
          done();
        });
    });
  });

  describe('returns multiple students', () => {

    beforeEach(done => {
      User.create([
        {
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        },
        {
          username: 'username2',
          email: 'user2@user2.com',
          image: 'user2-image',
          password: 'password',
          passwordConfirmation: 'password'
        }
      ])
        .then(() => done())
        .catch(done);
    });

    it('should create 2 users', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  describe('GET /api/users/:id', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(userData => {
          user = userData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });
    it('should return object with properties: _id, firstName, lastName, image, role, email, createdAt, updatedAt', done => {
      api.get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              'id',
              'username',
              'email',
              'image',
              'leagues',
              'picks',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });
  });

  describe('PUT /api/users/:id', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(userData => {
          user = userData;
          done();
        })
        .catch(done);
    });

    it('should return 200 status', function(done) {
      api
        .put(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'updated-username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return object with properties: _id, firstName, lastName, image, role, email, createdAt, updatedAt', done => {
      api.get(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              'id',
              'username',
              'email',
              'image',
              'leagues',
              'picks',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should return updated username', function(done) {
      api
        .put(`/api/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'updated-username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.body.username)
            .to.be.eq('updated-username');
          done();
        });
    });

  });

  describe('DELETE /api/users/:id', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          username: 'username',
          email: 'user@user.com',
          image: 'user-image',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(userData => {
          user = userData;
          done();
        })
        .catch(done);
    });

    it('should delete user and return 204', function(done) {
      api
        .delete(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204, done);
    });

  });
});
