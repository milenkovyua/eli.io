const { createContext, callFunction } = require('../src');
const chai = require('chai');

const { expect } = chai;

describe('Context tests', function() {
    describe('Basic context usage', function() {
        it('Should return array of context provider and useContext functions', function() {
            const [Provider, useContext] = createContext(5);
            expect(useContext).to.be.a('function');
            expect(Provider).to.be.a('function');
        });

        it('Should return the initial value when useContext is being called', function() {
            const [Provider, useContext] = createContext(5);
            expect(useContext).to.be.a('function');
            expect(Provider).to.be.a('function');
            expect(useContext()).to.equal(5);
        });

        it('Should change the context values, when being called', function() {
            const [Provider, useContext] = createContext(5);
            expect(useContext).to.be.a('function');
            expect(Provider).to.be.a('function');
            expect(useContext()).to.equal(5);
            const providerResult = Provider({ value: 15, children: 7 });
            expect(providerResult).to.equal(7);
        });
    });

    describe('Context being called from callFunction', function() {
        it('Should change the context values, and echo it children', function() {
            const [Provider, useContext] = createContext(5);
            expect(useContext()).to.equal(5);
            const result = callFunction(Provider, { value: 18 }, 78);
            expect(useContext()).to.equal(18);
            expect(result).to.equal(78);
        });
    });

    describe('Context being called from callFunction with promise as children', function() {
        it('Should change the context values, when being called', function(done) {
            const [Provider, useContext] = createContext(5);
            expect(useContext()).to.equal(5);
            const result = callFunction(Provider, { value: 18 }, Promise.resolve(78));
            expect(result).to.be.a('promise');
            result.then(resultChildren => {
                expect(useContext()).to.equal(18);
                expect(resultChildren).to.equal(78);
                return done();
            }).catch(err => {
                expect(err).to.be.null();
            });
        });
    });
});
