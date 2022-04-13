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
    // @param {object} classOptions
    //
    // @usage
    // this.getClassNamesFor(name);
    //
    // @example
    // this.getClassNamesFor('block:wrapper');
    // Returns ['content-blocks-wrapper']
    //
    // [1] Get the class names from the object.
    // [2] If class names are already an array return it.
    // [3] If the class names are a string this means theres only one
    //     # Add it to an array and return it.
    // [4] If class names is neither an array or a string just return an empty array
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