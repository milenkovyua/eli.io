const callFunction = require('../src/callFunction');
const chai = require('chai');

const { expect } = chai;

describe('Call function test', function() {
    describe('Basic call function', function() {
        it('Should return the function value', function() {
            const result = callFunction(() => 5, {});
            expect(result).to.equal(5);
        });

        it('Should return the passed prop value', function() {
            const result = callFunction(({ val }) => val, { val: 5 });
            expect(result).to.equal(5);
        });

        it('Should return the passed children value from props', function() {
            const result = callFunction(({ children }) => children, { children: 5 });
            expect(result).to.equal(5);
        });

        it('Should return the passed children value from children array', function() {
            const result = callFunction(({ children }) => children, {}, 5);
            expect(result).to.equal(5);
        });

        it('Should multiply the passed props', function() {
            const result = callFunction(({ value, multiplyBy }) => value * multiplyBy, { value: 5, multiplyBy: 2 });
            expect(result).to.equal(10);
        });

        it('Should multiply the passed children', function() {
            const result = callFunction(({ multiplyBy, children }) => children * multiplyBy, { multiplyBy: 2 }, 5);
            expect(result).to.equal(10);
        });

        it('Should receive children as array and return them', function() {
            const result = callFunction(({ children }) => children, {}, 5, 2, 18, 10);
            expect(result).to.be.an('array');
        });

        it('Should sum the children array', function() {
            const result = callFunction(({ children }) => children.reduce((prev, curr) => prev + curr, 0), {}, 5, 2, 18, 10);
            expect(result).to.equal(35);
        });
    });

    describe('Promise functions call', function() {
        it('Should call the component and return a promise', function(done) {
            const result = callFunction(async() => 5, {});
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(5);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should multiply the component values', function(done) {
            const result = callFunction(async({ value, multiplyBy }) => value * multiplyBy, { value: 2, multiplyBy: 5 });
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(10);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should multiply the component children value', function(done) {
            const result = callFunction(async({ children, multiplyBy }) => children * multiplyBy, { multiplyBy: 5 }, 2);
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(10);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should sum the component children value', function(done) {
            const result = callFunction(async({ children }) => children.reduce((prev, curr) => prev + curr, 0), {}, 5, 2, 18, 10);
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(35);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should return promise, because of one of the children, being promise', function(done) {
            const result = callFunction(() => 5, {}, 5, 2, Promise.resolve(18), 10);
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(5);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });

        it('Should sum children values, when one of the children, being promise', function(done) {
            const result = callFunction(({ children }) => children.reduce((prev, curr) => prev + curr, 0), {}, 5, 2, Promise.resolve(18), 10);
            expect(result).to.be.a('promise');
            result.then(resultValue => {
                expect(resultValue).to.equal(35);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });
    });
});
