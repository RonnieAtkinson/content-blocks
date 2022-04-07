// ==========================================================================
// CONTENT BLOCKS / UTILS / #CHECK VALUE
// ==========================================================================

//
// Check value class
// Utility class
//
export default class CheckValue {

    //
    // Is null undefined or empty
    // @static
    //
    // Checks if a value is null, undefined or empty.
    // Lets false and 0 values through.
    //
    // @param {*} value
    //
    // @usage
    // CheckValue.isNullUndefinedEmpty(value);
    //
    // @example
    // CheckValue.isNullUndefinedEmpty(null);
    // Returns true
    //
    // @example
    // CheckValue.isNullUndefinedEmpty(undefined);
    // Returns true
    //
    // @example
    // CheckValue.isNullUndefinedEmpty('');
    // Returns true
    //
    // @example
    // CheckValue.isNullUndefinedEmpty(false);
    // Returns false
    //
    // @example
    // CheckValue.isNullUndefinedEmpty(0);
    // Returns false
    //
    // [1] Returns true if the value is null, undefined or empty, otherwise returns false;
    //     # Note the loose equality operator 
    //     - Performs type coercion, checking for both null and undefined
    //     - See: http://webreflection.blogspot.com/2010/10/javascript-coercion-demystified.html
    //
    static isNullUndefinedEmpty(value) {
        return value == null || value === ''; // [1]
    };
};