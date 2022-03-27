// ==========================================================================
// CONTENT BLOCKS / UTILS / #OPTION
// ==========================================================================

export default class OptionUtils {

    //
    // Get class names for
    // Gets class names from this.options as an array
    // @returns {string[]}
    //
    // @param {string} name
    //
    // @usage
    // this.getClassNamesFor(name);
    //
    // @example
    // this.getClassNamesFor('block:wrapper');
    // Returns ['content-blocks-wrapper']
    //
    // [1]
    // [2]
    // [3]
    // [4]
    //
    static getClassNamesFor(name, classOptions) {
        const classNames = classOptions[name]; // [1]

        if (Array.isArray(classNames)) {
            return classNames; // [2]

        } else if (typeof classNames == 'string') {
            return [classNames]; // [3]

        } else {
            return []; // [4]
        };
    };
}