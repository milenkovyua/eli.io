/*
    WARN: Do use only for global contexts
*/

const createContext = (initialValue) => {
    const context = {
        value: initialValue
    };

    const useContext = () => {
        return context.value;
    };

    const ContextProvider = ({ value, children }) => {
        context.value = value;
        return children;
    }

    const setContextValue = (value) => {
        context.value = value;
    }

    return [ContextProvider, useContext, setContextValue];
};

module.exports = {
    createContext
};
