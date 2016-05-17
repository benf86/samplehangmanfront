'use strict';

require('reflect-metadata');

var SampleSvc = require('../../../build/app/services/sample.service.js');

describe('sample', function () {
    it('should get a sample from API', function () {
        expect(SampleSvc).toBeTruthy();
    });
});
