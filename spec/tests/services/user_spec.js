'use strict';

require('reflect-metadata');

var UserSvc = require('../../../build/app/services/user.service.js');

describe('user', function () {
    it('should get a user from API', function () {
        expect(UserSvc).toBeTruthy();
    });
});
