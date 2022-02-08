const isPromise = (maybePromise) => typeof maybePromise === 'object' && typeof maybePromise.then === 'function';

const hasPromise = (values) => values.find(value => isPromise(value));

const turnAllIntoPromises = (values) => values.map(value => isPromise(value) ? value : Promise.resolve(value));

module.exports = {
    isPromise,
    hasPromise,
    turnAllIntoPromises
};
