import { clone, isString, isNumber, isBoolean , map } from 'lodash-es';

//TODO: remove this
export function slenderizeObject(fatObject) {
    let propertyIdentifiers = [];
    let slenderObject = {};

    function processNode(theNode, _propertyIdentifiers, _slenderObject) {
        theNode = theNode || {};
        _propertyIdentifiers = _propertyIdentifiers || [];
        let retVal = map(theNode,
            (value, key) => {
                let myKeys = clone(_propertyIdentifiers);
                let ret = {};
                myKeys.push(key);
                // if value is a string, number or boolean
                if (isString(value) || isNumber(value) || isBoolean(value)) {
                    // build a keyString to use as a property identifier
                    let keyString = myKeys.join('.');
                    // add a property with that identifier and childNode as the value to our return object
                    ret[keyString] = _slenderObject[keyString] = value;
                } else {
                    // Call processNode recursively if value isn't a leaf node type (string, number or boolean)
                    processNode(value, myKeys, _slenderObject);
                    ret = value;
                }
                return ret;
            }
        );
        return retVal;
    }
    processNode(fatObject, propertyIdentifiers, slenderObject);
    return slenderObject;
}
//TODO: remove this
export function isBlank(obj) {
    return obj === undefined || obj === null;
}

//TODO: remove this
export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
