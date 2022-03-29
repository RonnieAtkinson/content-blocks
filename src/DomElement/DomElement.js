// ==========================================================================
// CONTENT BLOCKS / DOMELEMENT / DOMELEMENT
// ==========================================================================

//
// Imports
//
import CheckValue from '../utils/CheckValue';

//
// DOM element class
//
// @param {string} elType
// @param {Object} params
//
// @throws 
// Will throw an error if the elType parameter is falsy.
//
// @usage
// new DomElement('elType');
// new DomElement('elType').addAttributes({params});
// new DomElement('elType').addAttributes({params}).appendTo(HTMLElement);
// const { el } = new DomElement('elType');
// const { el } = new DomElement('elType').addAttributes({params});
// const { el } = new DomElement('elType').addAttributes({params}).appendTo(HTMLElement);
//
// @example
// Supports no attributes
// new DomElement('div');
// Output: <div></div>
//
// @example 
// Supports HTML attributes
// new DomElement('input').addAttributes({ type:'text', name:'postcode', className:'input-text' });
// Output: <input type="text" name="postcode" class="input-text">
//
// @example
// Supports multiple classes
// new DomElement('input').addAttributes({ type:'hidden', name:'postId', classList: ['input', 'input--text'] });
// Output: <input type="hidden" name="postId" class="input input--text">
//
// @example
// Supports datasets
// new DomElement('textarea').addAttributes({ name:'feedback', dataset:{ icon: 'multiline', language: 'html' }});
// Output: <textarea name="feedback" data-icon="multiline" data-language"html"></textarea>
//
export default class DomElement {

    //
    // Class constructor
    // @constructs DomElement
    //
    // [1] If elType is falsy throw an error.
    // [2] Create an element using the elType paramater and set it to a field.
    //
    constructor(elType) {
        if (!elType) throw new Error('The kind of element you want to create is required as the first parameter'); // [1]
        this.el = document.createElement(elType); // [2]
    };

    //
    // Add attributes
    // Adds attributes to this.el, an HTMLElement.
    //
    // @param {Object} params
    //
    // @throws
    // Will throw an error if params is falsy.
    // Will throw an error if params is not an object.
    // Will throw an error if an object is provided as the value for anything other than classList or dataset.
    //
    // @usage
    // this.addAttributes();
    //
    // [1] If params is falsy throw an error.
    // [2] If params is not an object throw an error.
    //
    // [3] For each attribute key in the params:
    // [4] If the value of the attribute key is null, undefined, or empty continue with the next iteration.
    //     # Only checking for null, undefined, or empty because we still need to let through values of false.
    //     - This is useful when computed values return undefined as might be the case here (key[value] || {}).nestedObject
    //     - We also check for typeof in the next if statement and typeof null == 'object'
    //
    // If the value is a nested object:
    // [5] If the value is an object:
    //     # typeof always returns a string so no need for strict equality.
    // [6] For each key in the nested object:
    // [7] If the value of the key is null, undefined, or empty continue with the next iteration.
    //     # Only checking for null, undefined, or empty because we still need to let through values of false.
    //
    // [8] If the attribute key [3] is 'classList':
    // [9] Add the value of the key [6] to the class list of this.el
    //     # Same as this.el.classList.add('value');
    //
    // [10] If the attribute key [3] is 'dataset':
    // [11] Add the value of the key [6] as a data attribute.
    //      # Same as this.el.dataset[foo] = bar;
    //
    // [12] If the attribute key [3] is anything else:
    // [13] Throw an error
    //      # Objects are only accepted for classList and dataset attribute values.
    //     
    // If the value is not an object:
    // [14] Add the attribute to this.el
    // # Same as this.el.foo = bar;
    //
    addAttributes(params) {
        if (!params) throw new Error('No attributes were provided'); // [1]
        if (typeof params != 'object') throw new Error('Attributes need to be passed as an object, eg: { name: \'foo\', id: \'bar\' }'); // [2]

        for (const attribute in params) { // [3]
            if (CheckValue.isNullUndefindedEmpty(params[attribute])) continue; // [4]

            if (typeof params[attribute] == 'object') { // [5]
                for (const value in params[attribute]) { // [6]
                    if (CheckValue.isNullUndefindedEmpty(params[attribute][value])) continue; // [7]

                    if (attribute === 'classList') { // [8]
                        this.el[attribute].add(params[attribute][value]); // [9]

                    } else if (attribute === 'dataset') { // [10]
                        this.el[attribute][value] = params[attribute][value]; // [11]

                    } else { // [12]
                        throw new Error(`An object was provided as the value of '${attribute}'. Objects can only be used with 'classList' or 'dataset'.`); // [13]
                    };
                };

            } else {
                this.el[attribute] = params[attribute]; // [14]
            };
        };
        return this;
    };

    //
    // Append to
    // Appends this.el to an HTMLElement as a child
    //
    // @param {HTMLElement} parentEl
    //
    // @usage
    // this.appendTo(parentEl);
    //
    // [1] Adds this.el to the end of the list of children of the parentEl node.
    //
    appendTo(parentEl) {
        parentEl.appendChild(this.el); // [1]
        return this;
    };

    //
    // Prepend to
    // Prepends this.el to an HTMLElement as a child
    //
    // @param {HTMLElement} parentEl
    // 
    // @usage
    // this.prependTo(parentEl)
    //
    // [1] Adds this.el to the start of the list of children of the parent node.
    //
    prependTo(parentEl) {
        parentEl.prepend(this.el);
        return this;
    };

    //
    // Insert before element
    // Inserts this.el before the target element
    //
    // @param {HTMLElement} parentEl
    //
    // @usage
    // this.insertBeforeEl(targetEl);
    //
    // [1] Inserts this.el before the targetEl reference node.
    //
    insertBeforeEl(targetEl) {
        targetEl.parentElement.insertBefore(this.el, targetEl); // [1]
        return this;
    };
};