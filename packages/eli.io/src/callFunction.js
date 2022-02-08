const { useContextLibrary } = require('./contextLibrary');
const {
    isPromise,
    hasPromise,
    turnAllIntoPromises
} = require('./helpers');

module.exports = function callFunction(functionComponent, config, children) {
    const props = {};

    if (config != null) {
        for (const propName in config) {
            props[propName] = config[propName];
        }
    }

    const childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
    }

    let isLibraryFunction = false;

    if (typeof functionComponent === 'string') {
        functionComponent = useContextLibrary()[functionComponent];
        isLibraryFunction = true;
    }

    if (functionComponent && functionComponent.defaultProps) {
        const defaultProps = functionComponent.defaultProps;
        for (const propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    const propsChildrenIsArray = props.children && Array.isArray(props.children);

    if (!propsChildrenIsArray && isPromise(props.children)) {
        return new Promise((resolve, reject) => {
            props.children
                .then(childrenValue => resolve(
                    functionComponent(isLibraryFunction ? childrenValue : { ...props, children: childrenValue })
                ))
                .catch(err => reject(err));
        });
    } else if (propsChildrenIsArray && props.children.length > 1 && hasPromise(props.children)) {
        return new Promise((resolve, reject) => {
            Promise.all(
                turnAllIntoPromises(props.children)
            )
                .then(childrenValue => resolve(
                    functionComponent(isLibraryFunction ? childrenValue : { ...props, children: childrenValue })
                ))
                .catch(err => reject(err));
        });
    } else {
        return functionComponent(isLibraryFunction ? props.children : props);
    }
};
