const { createContext } = require('./EliContext');

const [ContextLibraryProvider, useContextLibrary, setContextLibrary] = createContext(null);

module.exports = {
    ContextLibraryProvider,
    useContextLibrary,
    setContextLibrary
};
