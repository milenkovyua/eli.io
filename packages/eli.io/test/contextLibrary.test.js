const { ContextLibraryProvider, useContextLibrary, setContextLibrary, callFunction } = require('../src');
const chai = require('chai');

const { expect } = chai;

const contextLibraryFunctions = {
    toUpperCase: str => str.toUpperCase(),
    toLowerCase: (str) => str.toLowerCase(),
    filterOdds: (arr) => arr.filter(i => i % 2)
};

describe('Context Library tests', function() {
    describe('Basic context library usage', function() {
        it('Should not have defined context library', function() {
            const contextLibrary = useContextLibrary();
            expect(contextLibrary).to.equal(null);
            expect(ContextLibraryProvider).to.be.a('function');
        });

        it('Should define global context library', function() {
            setContextLibrary(contextLibraryFunctions);
            const contextLibrary = useContextLibrary();
            expect(contextLibrary).to.not.equal(null);
            expect(contextLibrary.toUpperCase).to.be.a('function');
            expect(contextLibrary.toLowerCase).to.be.a('function');
            expect(contextLibrary.filterOdds).to.be.a('function');
        });

        it('Should call the context library functions, when passed function name as string to callFunction', function() {
            const str = 'SOME string TO be PROCESSED';
            const resultToLowercase = callFunction('toLowerCase', {}, str);
            expect(resultToLowercase).to.equal(str.toLowerCase());
            const resultToUppercase = callFunction('toUpperCase', {}, str);
            expect(resultToUppercase).to.equal(str.toUpperCase());
            const arrToTest = [3, 6, 9, 12];
            const oddNumbers = callFunction('filterOdds', {}, arrToTest);
            expect(oddNumbers).to.has.lengthOf(2);
            expect(oddNumbers[0]).to.equal(3);
            expect(oddNumbers[1]).to.equal(9);
        });

        it('Should set the context library to null using the ContextLibraryProvider', function() {
            const providerResult = callFunction(ContextLibraryProvider, { value: null }, 7);
            expect(providerResult).to.equal(7);
            const contextLibrary = useContextLibrary();
            expect(contextLibrary).to.equal(null);
        });

        it('Should set the context library functions using the ContextLibraryProvider', function() {
            const providerResult = callFunction(ContextLibraryProvider, { value: contextLibraryFunctions }, 7);
            expect(providerResult).to.equal(7);
            const contextLibrary = useContextLibrary();
            expect(contextLibrary).to.not.equal(null);
        });

        it('Should call the context library functions, after being passed using ContextLibraryProvider', function() {
            const str = 'SOME string TO be PROCESSED';
            const resultToLowercase = callFunction('toLowerCase', {}, str);
            expect(resultToLowercase).to.equal(str.toLowerCase());
            const resultToUppercase = callFunction('toUpperCase', {}, str);
            expect(resultToUppercase).to.equal(str.toUpperCase());
            const arrToTest = [3, 6, 9, 12];
            const oddNumbers = callFunction('filterOdds', {}, arrToTest);
            expect(oddNumbers).to.has.lengthOf(2);
            expect(oddNumbers[0]).to.equal(3);
            expect(oddNumbers[1]).to.equal(9);
        });
    });

    describe('Using context library functions with promises', function() {
        it('Should call the toUppercase when text is passed as promise', function(done) {
            const str = 'SOME string TO be PROCESSED';
            const toUpperCaseResult = callFunction('toUpperCase', {}, Promise.resolve(str));
            toUpperCaseResult.then(result => {
                expect(result).to.equal(str.toUpperCase());
                return done();
            }).catch(err => {
                expect(err).to.equal(null);
            });
        });

        it('Should call the toLowerCase when text is passed as promise', function(done) {
            const str = 'SOME string TO be PROCESSED';
            const toLowerCaseResult = callFunction('toLowerCase', {}, Promise.resolve(str));
            toLowerCaseResult.then(result => {
                expect(result).to.equal(str.toLowerCase());
                return done();
            }).catch(err => {
                expect(err).to.equal(null);
            });
        });

        it('Should call the toLowerCase and toUpperCase after that', function(done) {
            const str = 'SOME string TO be PROCESSED';
            const toLowerCaseResult = callFunction('toLowerCase', {}, Promise.resolve(str));
            const toUpperCaseResult = callFunction('toUpperCase', {}, toLowerCaseResult);
            toUpperCaseResult.then(result => {
                expect(result).to.equal(str.toUpperCase());
                return done();
            }).catch(err => {
                expect(err).to.equal(null);
            });
        });

        it('Should call the filterOdds from array with promises', function(done) {
            const filterOddsResult = callFunction(
                'filterOdds',
                {},
                Promise.resolve(3),
                Promise.resolve(6),
                Promise.resolve(9),
                Promise.resolve(12)
            );
            filterOddsResult.then(result => {
                expect(result).to.has.lengthOf(2);
                expect(result[0]).to.equal(3);
                expect(result[1]).to.equal(9);
                return done();
            }).catch(err => {
                expect(err).to.equal(null);
            });
        });

        it('Should call the filterOdds from array where some of the values are promises', function(done) {
            const filterOddsResult = callFunction(
                'filterOdds',
                {},
                Promise.resolve(3),
                6,
                9,
                Promise.resolve(12)
            );
            filterOddsResult.then(result => {
                expect(result).to.has.lengthOf(2);
                expect(result[0]).to.equal(3);
                expect(result[1]).to.equal(9);
                return done();
            }).catch(err => {
                expect(err).to.equal(null);
            });
        });
    });
});
