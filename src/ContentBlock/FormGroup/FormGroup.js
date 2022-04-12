// ==========================================================================
// CONTENT BLOCKS / CONTENTBLOCK / #FORM GROUP
// ==========================================================================

//
// Imports
//
import CheckValue from '../../utils/CheckValue';
import DomElement from '../../DomElement/DomElement';
import DomNameUtils from '../../utils/DomName';
import OptionUtils from '../../utils/Option';

//
// Variables
// These variables are used when adding and removing dynamic elements
//
const ACTION_ADD = 'add';
const ACTION_REMOVE = 'remove';

//
// Form group class
//
// @usage
// new FormGroup(parentNodes, variations, index, options);
//
export default class FormGroup {

    //
    // Class constructor
    //
    // @constructs FormGroup
    //
    // @param {object || HTMLElement} parentNodes
    // @param {object} variations
    // @param {number} index
    // @param {object} options
    //
    constructor(parentNodes, variations, index, options) {
        this.parentNodes = parentNodes;
        this.variations = variations;
        this.index = index;
        this.options = options;
    };

    //
    // Get class name for
    // Gets the first class as a string from an array of classes
    // @returns {string}
    //
    // @param {string} name
    //
    // @usage
    // this.getClassNameFor(name);
    // 
    // @example
    // this.getClassNameFor('block:wrapper');
    // Returns 'content-blocks-wrapper'
    //
    // [1] Return this first item in this.getClassNamesFor.
    //
    getClassNameFor(name) {
        return OptionUtils.getClassNamesFor(name, this.options.classes)[0]; // [1]
    };

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
    //
    getClassNamesFor(name) {
        return OptionUtils.getClassNamesFor(name, this.options.classes); // [1]
    };

    //
    // Add dynamic buttons
    // These buttons control the dynamic elements
    // Dynamic elements are elements that can be manually added to or removed from a form group after it has been rendered to the dom
    //
    // @param {HTMLElement} targetEl
    //
    // @usage
    // this.addDynamicButtonsTo(targetEl);
    //
    // [1] Create a new add button and append it to targetEl.
    // [2] Create a new remove button and append it to targetEl.
    //     # When a new content block is created the number of dynamic elements will always be zero so the remove button can be disabled.
    //
    addDynamicButtonsTo(targetEl) {
        new DomElement('button') // [1]
            .addAttributes({
                type: 'button',
                textContent: this.options.text['button:addDynamic'],
                classList: [...this.getClassNamesFor('button:addDynamic')]
            })
            .appendTo(targetEl);

        new DomElement('button') // [2]
            .addAttributes({
                type: 'button',
                textContent: this.options.text['button:removeDynamic'],
                classList: [...this.getClassNamesFor('button:removeDynamic')],
                disabled: true
            })
            .appendTo(targetEl);

        return this;
    };

    //
    // Add content block form group
    // Adds a form group
    // ie: <div class="form-group"></div>
    //
    // @param {string} groupName
    // @param {object} formGroup
    //
    // @throws
    // Will throw an error if theres no parent element.
    //
    // @usage
    // this.add(groupName, formGroup);
    //
    // [1] Get the tab value from the formGroup object.
    //     # Should be a string
    // [2] Set the parentEl using a ternary.
    //     # If the parentNodes length is greater than zero then theres tabs
    //     # Otherwise no tabs
    //
    // [3] If parentEl is null, undfined, or empty it could no be set so throw an error.
    //
    // [4] Define hasNode
    //     # Does formGroup.element have a 'node' key
    //     # Convert to a boolean
    // [5] Define hasVariations
    //     # Is the group name 'variation'
    //     # Does the variations parameter have a length greater than 0
    //     # Does this iteration have a node
    // [6] Define isDynamic
    //     # Is the dynamic key truthy
    //     # Convert to a boolean
    // [7] Set the element type based on is dynamic
    //     # Dynamic elements are placed in a fieldset with a legend
    //     # Non-dynamic elements are placed in a div with a label
    // [8] Add a new form group element
    //     # This will be the parent node
    // [9] Define a placeholder for the node type
    //     # Defining it here will mean any scopes down the chain have access to it.
    // [10] If this iteration is dynamic
    //     # Will render with zero inputs initally, the user will be able to add them as needed
    //     # Dynamic form groups will be a fieldset
    //     # Add a legend node to [8] (fieldset)
    //     # Add the buttons to [8] (fieldset) that allow inputs to be added and removed
    //     # If a form group is dynamic it wont initally have nodes so just continue with the next iteration.
    //
    // [11] If this iteration has a node
    //      # Create a label element and appaned it to the form group.
    //      # Create a form control node and append it to the label.
    //
    // [12] If this iteration has variations
    //      # For each variation:
    //      # Create a new node for the variation.
    //      # Append it to the form control node [9] & [11].
    //
    add(groupName, formGroup) {
        const tabName = formGroup.tab; // [1]
        const parentEl = (Object.keys(this.parentNodes).length > 0) ? this.parentNodes[tabName] : this.parentNodes; // [2]

        if (CheckValue.isNullUndefinedEmpty(parentEl)) throw new Error(`${formGroup.label} has been assigned to a tab that hasn't been defined`); // [3]

        const hasNode = !!((formGroup.element || {}).node); // [4]
        const hasVariations = groupName === 'variation' && !!(Object.keys(this.variations || {}).length) && hasNode; // [5]
        const isDynamic = !!((formGroup || {}).dynamic); // [6]
        const elType = (isDynamic) ? 'fieldset' : 'div'; // [7]

        const { el: formGroupEl } = new DomElement(elType) // [8]
            .addAttributes({
                classList: [
                    ...this.getClassNamesFor('form:group'),
                    `${this.getClassNameFor('form:group')}--${groupName}`,
                    ...((formGroup.attributes || {}).classList) || []
                ],
                dataset: ((formGroup.attributes || {}).data)
            })
            .appendTo(parentEl);

        let thisNode; // [9]

        if (isDynamic) { // [10]
            new DomElement('legend').addAttributes({ textContent: (formGroup || {}).label }).appendTo(formGroupEl);
            this.addDynamicButtonsTo(formGroupEl);
            return;
        };

        if (hasNode) { // [11]
            // Create a label element
            const { el: labelEl } = new DomElement('label')
                .addAttributes({
                    textContent: ((formGroup || {}).label),
                })
                .appendTo(formGroupEl);

            // Create the node
            ({ el: thisNode } = new DomElement(formGroup.element.node)
                .addAttributes({
                    ...formGroup.element.attributes || {},
                    name: DomNameUtils.generateName(this.index, groupName),
                    classList: [
                        ...this.getClassNamesFor('form:control'),
                        ...(formGroup.element.attributes || {}).classList || []
                    ]
                })
                .appendTo(labelEl)
            );
        };

        if (hasVariations) { // [11]
            for (const variation in this.variations) {
                new DomElement('option')
                    .addAttributes({
                        value: variation,
                        textContent: this.variations[variation].display
                    })
                    .appendTo(thisNode);
            };
        };
    };

    //
    // Toggle dynamic remove button
    // Conditionally toggles the disabled attribute on the remove button
    //
    // Sets the disabled status of the remove button based on the number of inputs
    // Zero inputs = disabled
    // More than zero = enabled
    //
    // @static
    //
    // @param {HTMLElement} targetEl
    // @param {number} inputLength
    // @param {string} action
    //
    // @throws
    // Will throw an error if targetEl is a falsy value.
    // Will throw an error if inputLength is null, undefined, or empty.
    // Will throw an error if action is not 'add' or 'remove'.
    //
    // @usage
    // this.toggleDynamicRemoveButton(targetEl, inputLength, action);
    //
    // @example 
    // this.toggleDynamicRemoveButton(targetEl, 1, 'add'); 
    // Output: targetEl.disabled = false;
    //
    // @example 
    // this.toggleDynamicRemoveButton(targetEl, 0, 'remove');
    // Output: targetEl.disabled = true;
    //
    // [1] If targetEl is falsy or inputLength is null, undefined, or empty throw an error.
    //     # Checking for null, undefined, or empty because it needs to let through 0.
    // [2] If action does not equal 'add' or 'remove' throw an error.
    // [3] If the length of inputs is zero assigns true otherwise assigns false.
    // [4] We only want to set the disabled attribute when required:
    //     # If the action is add and the input length is greater than one: the button doesnt need it's disabled attribute toggled.
    //     # If the action is remove and the input length is not zero: the button doesnt need it's disabled attribute toggled.
    // [5] Set the disabled attribute of targetEl
    //
    static toggleDynamicRemoveButton(targetEl, inputLength, action) {
        if (!targetEl || CheckValue.isNullUndefinedEmpty(inputLength)) throw new Error('To toggle the remove button a required parameter is missing'); // [1]
        if (![ACTION_ADD, ACTION_REMOVE].includes(action)) throw new Error(`To toggle the remove button the action parmeter needs to be \'add\' or \'remove\'. ${action} was provided.`); // [2]
        const shouldDisable = inputLength === 0; // [3]
        if ((action === ACTION_ADD && inputLength > 1) || (action === ACTION_REMOVE && !shouldDisable)) return; // [4]
        targetEl.disabled = shouldDisable; // [5]
    };

    //
    // Add dynamic element
    // Adds a dynamic element to the DOM.
    // Dynamic elements are elements that can be manually added to or removed from a form group after it has been rendered to the dom.
    //
    // @static
    //
    // @param {HTMLElement} targetEl
    // @param {string} elType
    // @param {live NodeList} allInputs
    //
    // @usage
    // this.addDynamicElement(targetEl, elType, allInputs);
    //
    // @example
    // this.addDynamicElement();
    //
    // [1] Get the data-index from the closest content block.
    // [2] Destruct the name, type, and placeholder from the closest form group dataset.
    //     # data-name, data-type.
    // [3] Define a new params object.
    //     # Only needs the name and classlist at this point.
    // [4] If there was a data-type [2] on the content block add a 'type' attribute to the params object:
    //     # This is in a conditional statement because not all inputs need a type param.
    //     # textarea for example doesn't need one. 
    // [5] If there was a data-placeholder [2] on the content block add a 'placeholder' to the params object.
    // [6] Create a new dom element using the params object and insert before targetEl
    // [7] Call toggleDynamicRemoveButton();
    //     # Disables the remove button if required.
    //
    static addDynamicElement(targetEl, elType, allInputs, classes) {
        const contentIndex = targetEl.closest(`.${classes['block:single']}`).dataset.index; // [1]
        const { name: inputName, type: inputType, placeholder: inputPlaceholder } = targetEl.closest(`.${classes['form:group']}`).dataset; // [2]
        const params = {
            name: DomNameUtils.generateName(contentIndex, inputName, true),
            classList: [...classes['form:control']]
        };
        if (inputType) params.type = inputType; // [4]
        if (inputPlaceholder) params.placeholder = inputPlaceholder; // [5]

        new DomElement(elType).addAttributes(params).insertBeforeEl(targetEl); // [6]
        FormGroup.toggleDynamicRemoveButton(targetEl.nextElementSibling, allInputs.length, ACTION_ADD); // [7]

        return this;
    };

    //
    // Remove dynamic element
    // Removes a dynamic element from the DOM
    // Dynamic elements are elements that can be manually added to or removed from a form group after it has been rendered to the dom
    //
    // @static
    //
    // @param {HTMLElement} targetEl
    // @param {live NodeList} allInputs
    //
    // @usage
    // this.removeDynamicElement(targetEl, allInputs);
    //
    // [1] Deconstruct the length from allInputs
    // [2] If the length is zero theres nothing to remove
    // [3] Remove the last child from allInputs
    // [4] Call toggleDynamicRemoveButton();
    //     # Disables the remove button if required.
    //
    static removeDynamicElement(targetEl, allInputs) {
        const { length } = allInputs; // [1]

        if (length === 0) return; // [2]
        allInputs[length - 1].parentElement.removeChild(allInputs[length - 1]); // [3]
        FormGroup.toggleDynamicRemoveButton(targetEl, allInputs.length, ACTION_ADD); // [4]
    };
};