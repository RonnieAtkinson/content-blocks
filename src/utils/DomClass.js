// ==========================================================================
// CONTENT BLOCKS / UTILS / DOMCLASS
// ==========================================================================

//
// Dom class utils class
// Utility class
//
export class DomClassUtils {

    //
    // Remove class from children
    // @static
    //
    // Removes a class from a node list of child elements.
    //
    // @param {HTMLElement} targetEl - The target element.
    // @param {string} childClass - The class name to get child elements by.
    // @param {string} removeClass - The class name to remove from child elements.
    //
    // @throws
    // Will throw an error if targetEl, childClass, or removeClass are falsy.
    //
    // @example
    // Two arguments
    // If you're getting and removing the same class:
    // DomClassUtils.removeClassFromChildren(targetEl, 'childClass');
    //
    // @example
    // Three arguments
    // If you're getting by one class and removing a different one:
    // DomClassUtils.removeClassFromChildren(targetEl, 'childClass', 'removeClass');
    //
    // [1] If targetEl OR childClass are falsy throw an error.
    // [2] Store a live list of nodes with the childClass present in their class list.
    // [3] While there is a node in the node list:
    // [4] Remove the class from the node.
    //     # If removeClass is not provided it will remove the class that was searched for instead. See the examples.
    //     # When a class is removed the live node list will be updated reducing the number of nodes until its empty.
    //
    static removeClassFromChildren(targetEl, childClass, removeClass) {
        if (!targetEl || !childClass) throw new Error('To remove classes from children a required parameter is missing'); // [1]
        const childLNL = targetEl.getElementsByClassName(childClass); // [2]
        while (childLNL[0]) { // [3]
            childLNL[0].classList.remove(removeClass || childClass); // [4]
        };
    };

    //
    // Target has class
    // @static
    //
    // Finds a class in a classList
    //
    // @param {HTMLElement} targetEl - The target element.
    // @param {string[]} classArr - An array of class names to check.
    //
    // @throws
    // Will throw an error if targetEl or classArr are falsy.
    //
    // @usage
    // DomClassUtils.targetHasClass(targetEl, classArr);
    //
    // @example 
    // Single value
    // DomClassUtils.targetHasClass(targetEl, ['class1']);
    //
    // @example
    // Multiple values
    // DomClassUtils.targetHasClass(targetEl, ['class1', 'class2']);
    //
    // [1] If targetEl OR classArr are falsy throw an error.
    // [2] The some() method tests wheather at least one element in the classArr is present in the class list of the target element.
    //     # Returns true on the first truthy otherwise returns false.
    // [3] Return the targetEl class list
    //
    static targetHasClass(targetEl, classArr) {
        if (!targetEl || !classArr) throw new Error('To check if a target has a class a required parameter is missing'); // [1]
        if (classArr.some(className => targetEl.classList.contains(className))) { // [2]
            return targetEl.classList; // [3]
        };
    };
};