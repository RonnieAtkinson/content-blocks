// ==========================================================================
// CONTENT BLOCKS / UTILS / #DOM NAME
// ==========================================================================

//
// Dom name utils class
// Utility class
//
export default class DomNameUtils {

    //
    // Generate name
    // Generates a name for an HTMLElement
    // @returns {string}
    //
    // @param {number} index
    // @param {string} key
    // @param {boolean} isNested
    //
    // @throws 
    // Will throw an error if either the index or key parameter is falsy.
    //
    // @usage 
    // this.generateName(index, key, isNested);
    //
    // @example
    // Not nested
    // this.generateName(1, 'variation');
    // Returns 'postContent[a1][variation]';
    //
    // @example
    // Not nested
    // this.generateName(2, 'id', false);
    // Returns 'postContent[a2][id]'
    //
    // @example
    // Nested
    // this.generateName(3, 'class', true);
    // Returns 'postContent[a3][class][]'
    //
    // [1] If index or key are falsy throw an error.
    // [2] Assign the generated name to a constant.
    // [3] If isNested is true return the generated name with '[]' appended.
    //     # example: postContent[a1][name][];
    //     - fields with nested names like this will be passed as an object like so:
    //     - { name: ['value1', 'value2'] }
    //
    //     Otherwise just return the generated name as is.
    //     # example: postContent[a1][name];
    //     - fields that are not nested will be passed as key value pairs like so:
    //     - { name: 'value1' }
    //
    static generateName(index, key, isNested) {
        if (!index || !key) throw new Error('An index and key are required to generate a name'); // [1]
        const generatedName = `postContent[a${index}][${key}]`; // [2]
        return (isNested === true) ? generatedName + '[]' : generatedName; // [3]
    };

    //
    // Update index in names
    // Updates the index in the name attributes
    //
    // @param {HTMLElement} wrapperEl
    // @param {number} newIndex
    //
    // @usage
    // this.updateIndexInNames(wrapperEl, newIndex);
    //
    // @example
    // this.updateIndexInNames(typeWrapperEl, 3);
    // returns postContent[a3][type]
    //
    // @example
    // this.updateIndexInNames(contentWrapperEl, 7);
    // returns postContent[a7][content]
    //
    // [1] Get all the nodes with where the name starts with postContent
    // [2] For each node found:
    // [3] Replace the number in the string with the newIndex provided in the parameters
    //
    static updateIndexInNames(wrapperEl, newIndex) {
        const childElements = wrapperEl.querySelectorAll('[name^="postContent"]'); // [1]
        for (const childEl of childElements) { // [2]
            childEl.name = childEl.name.replace(/(\d+)+/g, (match, index) => index = newIndex); // [3]
        };
    };
};