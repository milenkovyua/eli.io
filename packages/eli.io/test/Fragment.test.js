const { callFunction, Fragment } = require('../src');
const chai = require('chai');

const { expect } = chai;

describe('Fragment function test', function() {
    describe('Fragment basics', function() {
        it('Should echo the children value', function() {
            const result = Fragment({ children: 5 });
            expect(result).to.equal(5);
        });

        it('Should not return other values than children', function() {
            const result = Fragment({ children: 5, test1: 1, test2: 2 });
            expect(result).to.equal(5);
        });
    });

    describe('Fragment as parameter to callFunction', function() {
        it('Should echo the children value', function() {
            const result = callFunction(Fragment, {}, 5);
            expect(result).to.equal(5);
        });

        it('Should not return other values than children', function() {
            const result = callFunction(Fragment, { test1: 1, test2: 2 }, 5);
            expect(result).to.equal(5);
        });

        it('Should receive receive other component result and echo its value', function() {
            const result = callFunction(Fragment, {}, callFunction(() => 5, {}));
            expect(result).to.equal(5);
        });
    });

    describe('Fragment as parameter to callFunction with promises', function() {
        it('Should echo the children value and being promise', function(done) {
            const result = callFunction(Fragment, {}, Promise.resolve(5));
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(5);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should receive all promise values as params and echo them', function(done) {
            const result = callFunction(Fragment, {}, Promise.resolve(5), Promise.resolve(20), Promise.resolve(10));
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.be.an('array');
                expect(resultValue).to.have.lengthOf(3);
                expect(resultValue[0]).to.equal(5);
                expect(resultValue[1]).to.equal(20);
                expect(resultValue[2]).to.equal(10);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should receive receive other component result and echo its value', function(done) {
            const result = callFunction(Fragment, {}, callFunction(async() => 15, {}));
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(15);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });
    });
});
