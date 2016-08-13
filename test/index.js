'use strict';
global.chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();

const metascrape = require('../src/index');

describe('Main', function() {

    it('should scrape github', function(done) {

        metascrape.fetch('http://github.com', 1000).then(function(response) {

            // Response items
            response.should.have.property('url');
            response.should.have.property('normal');
            response.should.have.property('openGraph');
            response.should.have.property('icons');

            // Real url
            response.url.should.equal('https://github.com/');

            done();
        });

    });

});
