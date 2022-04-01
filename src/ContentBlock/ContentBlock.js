// ==========================================================================
// CONTENT BLOCKS / CONTENTBLOCK / #CONTENT BLOCK
// ==========================================================================

//
// Imports
//
import CheckValue from '../utils/CheckValue';
import DomElement from '../DomElement/DomElement';
import DomNameUtils from '../utils/DomName';
import OptionUtils from '../utils/Option';

//
// Default options
//
const defaultOptions = {};

//
// Content block class
//
export default class ContentBlock {

    //
    // Constructor
    //
    constructor(contentBlocksLNL, parentEl, options, dragDrop) {
        this.contentBlocksLNL = contentBlocksLNL;
        this.contentBlocksParentEl = parentEl;
        this.options = {
            ...defaultOptions,
            ...options
        };
        this.dragDrop = dragDrop;
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
    // Dynamic elements are elements that can be manually added to or removed from a form-control after it has been rendered to the dom
    //
    // @param {HTMLElement} targetEl
    //
    // @usage
    // this.addDynamicButtonsTo(targetEl);
    //
    // [1] Create a new add button and append it to targetEl.
    // [2] Create a new remove button and append it to targetEl.
    //     New content block dynamic elements will always be zero so the remove button can be set to disabled.
    //
    addDynamicButtonsTo(targetEl) {
        new DomElement('button') // [1]
            .addAttributes({
                type: 'button',
                textContent: this.options.text['button:addDynamic'],
                classList: [...this.getClassNamesFor('button:addDynamic')]
            })
            .appendTo(targetEl)

        new DomElement('button')
            .addAttributes({
                type: 'button',
                textContent: this.options.text['button:removeDynamic'],
                classList: [...this.getClassNamesFor('button:removeDynamic')],
                disabled: true
            })
            .appendTo(targetEl) // [2]

        return this;
    };

    //
    // Add tabbing buttons
    //
    // @todo comments
    //
    addTabButtons(tabs, targetEl) {
        const { el: buttonWrapperEl } = new DomElement('div')
            .addAttributes({
                classList: [...this.getClassNamesFor('block:nav')]
            })
            .appendTo(targetEl);

        for (const contentTab in tabs) {
            const { el: tabButtonEl } = new DomElement('button')
                .addAttributes({
                    type: 'button',
                    textContent: (tabs[contentTab].display || this.options.text['button:tab:default']),
                    classList: [
                        ...this.getClassNamesFor('button:tab'),
                        `${this.getClassNameFor('button:tab')}--${contentTab}`
                    ],
                    dataset: {
                        target: (`${this.getClassNameFor('block:tab')}--${contentTab}`)
                    }
                })
                .appendTo(buttonWrapperEl);

            if (tabs[contentTab].active) {
                tabButtonEl.disabled = true;
                tabButtonEl.classList.add(this.getClassNameFor('button:tab:active'))
            };
        };
    };

    //
    // Add tab containers
    //
    // @todo comments
    //
    addTabContainers(tabs, targetEl) {
        const tabNodes = {};

        for (const tabContainer in tabs) {
            const { el: tabContainerEl } = new DomElement('div')
                .addAttributes({
                    classList: [
                        ...this.getClassNamesFor('block:tab'),
                        `${this.getClassNameFor('block:tab')}--${tabContainer}`,
                    ]
                })
                .appendTo(targetEl);

            if (tabs[tabContainer].active) {
                tabContainerEl.classList.add(this.getClassNamesFor('block:tab:active'));
            };

            tabNodes[tabContainer] = tabContainerEl;
        };

        return tabNodes;
    };

    //
    // Add content block form controls
    // Adds the form-controls for the content type
    // ie: <div class="form-control"></div>
    //
    // @todo
    // Need to add a 'for' attribute to the label node
    //
    // @param {HTMLElement} fieldSetEl
    // @param {Object} formControls
    // @param {Object} variations
    // @param {Number} index
    //
    // @throws
    // Will throw an error if form controls is not an object.
    // Will throw an error if form controls length is zero.
    //
    // @usage
    // this.addContentBlockFormControls(fieldsetEl, formControls, variations);
    //
    // [1] If the form controls parameter is not an object or its an empty object, throw an error
    // [2] For each key in form controls:
    // [3] Define hasNode
    //     # Does formcontrol.element have a node key
    // [4] Define hasVariations
    //     # Is the form control key 'variation'
    //     # Does the variations parameter have a length greater than 0
    //     # Does this iteration have a node
    // [5] Define isDynamic
    //     # Is the dynamic key truthy
    // [6] Set the element type based on is dynamic
    //     # Dynamic elements are placed in a fieldset with a legend
    //     # Non-dynamic elements are placed in a div with a label
    // [7] Add a new form control element
    //     # This will be the parent node
    // [8] Define a placeholder for the node type
    //     # Defining it here will mean any scopes up the chain have access to it.
    // [9] If this iteration is dynamic
    //     # Will render with zero inputs initally, the user will be able to add them as needed
    //     # Dynamic form controls will be a fieldset
    //     # Add a legend node to [7] (fieldset)
    //     # Add the buttons to [7] (fieldset) that allow inputs to be added and removed
    //     # If a form control is dynamic it wont initally have nodes so just continue with the next iteration
    //     
    //     If this iteration is not dynamic
    //     # Add a label to [7] (div)
    //
    // [10] If this iteration has a node
    //      # Create the node and add it to [7] (div)
    //      # Assign a reference of it to [8]
    //
    // [11] If this iteration has variations
    //      # For each variation in the variations parameter:
    //      # Create a new node for the variation.
    //      # Add it as a child to the parent variation node [8] & [10].
    //
    addFormGroups(parentNodes, formGroups, variations, index) {
        if (typeof formGroups != 'object' || !Object.keys(formGroups).length) throw new Error('No form controls were passed'); // [1]

        for (const formGroup in formGroups) { // [2]

            const tabName = formGroups[formGroup].tab;
            const parentEl = (Object.keys(parentNodes).length > 0) ? parentNodes[tabName] : parentNodes;

            if (CheckValue.isNullUndefindedEmpty(parentEl)) throw new Error(`${formGroups[formGroup].label} has been assigned to a tab that hasn't been defined`);

            const hasNode = !!((formGroups[formGroup].element || {}).node); // [3]
            const hasVariations = formGroup === 'variation' && !!(Object.keys(variations || {}).length) && hasNode; // [4]
            const isDynamic = !!((formGroups[formGroup] || {}).dynamic); // [5]
            const elType = (isDynamic) ? 'fieldset' : 'div'; // [6]

            const { el: formGroupEl } = new DomElement(elType) // [7]
                .addAttributes({
                    classList: [
                        ...this.getClassNamesFor('form:group'),
                        `${this.getClassNameFor('form:group')}--${formGroup}`,
                        ...((formGroups[formGroup].attributes || {}).classList) || []
                    ],
                    dataset: ((formGroups[formGroup].attributes || {}).data)
                })
                .appendTo(parentEl);

            let thisNode; // [8]

            if (isDynamic) { // [9]
                new DomElement('legend').addAttributes({ textContent: (formGroups[formGroup] || {}).label }).appendTo(formGroupEl);
                this.addDynamicButtonsTo(formGroupEl);
                continue;

            } else {
                new DomElement('label')
                    .addAttributes({
                        textContent: ((formGroups[formGroup] || {}).label),
                        htmlFor: 'test' // @todo
                    })
                    .appendTo(formGroupEl);
            };

            if (hasNode) { // [10]
                ({ el: thisNode } = new DomElement(formGroups[formGroup].element.node)
                    .addAttributes({
                        ...formGroups[formGroup].element.attributes || {},
                        name: DomNameUtils.generateName(index, formGroup),
                        classList: [
                            ...this.getClassNamesFor('form:control'),
                            ...(formGroups[formGroup].element.attributes || {}).classList || []
                        ]
                    })
                    .appendTo(formGroupEl)
                );
            };

            if (hasVariations) { // [11]
                for (const variation in variations) {
                    new DomElement('option')
                        .addAttributes({
                            value: variation,
                            textContent: variations[variation].display
                        })
                        .appendTo(thisNode);
                };
            };
        };
    };

    //
    // Add content block
    // Adds a content block to the DOM
    //
    // @param {string} contentType
    //
    // @throws
    // Will throw an error if the content type is falsy.
    // Will throw an error if the content type doesn't have display or formControl keys.
    //
    // @usage
    // this.addContentBlock(contentType);
    //
    // @example
    // this.addContentBlock('link');
    //
    // [1] If contentType is falsy throw an error.
    // [2] Deconstruct some keys from this.contentGroups.
    // [3] If the desctucted display or formcontrols keys are falsy thow an error
    // [4] Set an index from the current length of the content blocks in the live node list
    //
    // [5] Create a new content block
    //     # Set the drag state from this.dragState
    //     # Initially this will be false.
    //     # If the user has enabled dragging and then adds a new block this will be true.
    // [6] Create a new leged for the content block [5]
    // [7] Create a new remove button for the content block [5]
    //
    // [8] Create a 'type' form control
    //     # Every content block will have a type so just define it here
    // [9] Add a hidden input to [8] with the content type as a value
    //
    // [10] Add a 'classes' form control
    //      # Every content block will have dynamic classes
    //      # The datasets define what kind of element the dynamic buttons will add
    // [11] Create a legend node for the classes form control [10]
    // [12] Add dynamic buttons to the classes form control [10]
    // [13] Add any custom form controls
    //      # Form controls are defined in the content type object in the constructor
    //      # Either from the defaultContentBlocks object or user defined
    // [14] Render the content block [5] to the DOM
    // [15] If drag is allowed enabled the drag button
    //      # Dragging is allowed when there is > 1 content block in the DOM
    //
    addContentBlock(blockType, blockOptions) {
        if (!blockType) throw new Error('No content type provided for this block'); // [1]
        const { display, icon, formGroups, variations, tabs } = (blockOptions || {}); // [2]
        if (!display || !formGroups) throw new Error(`Invalid options provided for the ${blockType} content block`); // [3]
        const index = this.contentBlocksLNL.length + 1; // [4]

        const hasTabs = !!(tabs);

        // Fieldset wrapper
        const { el: blockSingleEl } = new DomElement('fieldset') // [5]
            .addAttributes({
                classList: [...this.getClassNamesFor('block:single'), `${this.getClassNameFor('block:single')}--${blockType}`],
                dataset: {
                    id: index
                }
            });

        // Add conditional attributes
        if (this.dragDrop.dragState) {
            blockSingleEl.classList.add(...this.getClassNamesFor('drag:draggable'));
            blockSingleEl.draggable = true;
        };

        // Block legend
        const { el: legendEl } = new DomElement('legend') // [6]
            .addAttributes({
                textContent: display,
                classList: this.getClassNamesFor('block:title')
            })
            .appendTo(blockSingleEl);

        if (icon) {
            new DomElement('i')
                .addAttributes({
                    classList: [
                        ...this.getClassNamesFor('block:icon'),
                        `${this.getClassNameFor('block:icon')}--${icon}`
                    ]
                })
                .prependTo(legendEl);
        };

        // Block remove button
        new DomElement('button') // [7]
            .addAttributes({
                type: 'button',
                textContent: this.options.text['button:removeBlock'],
                classList: this.getClassNamesFor('button:removeBlock')
            })
            .appendTo(blockSingleEl);

        // Tab buttons
        if (hasTabs) this.addTabButtons(tabs, blockSingleEl);

        // Hidden content type
        new DomElement('input') // [9]
            .addAttributes({
                type: 'hidden',
                value: blockType,
                name: DomNameUtils.generateName(index, 'type')
            })
            .appendTo(blockSingleEl);

        // Content tabs
        const contentTabs = (hasTabs) ? this.addTabContainers(tabs, blockSingleEl) : blockSingleEl;

        // Form groups
        this.addFormGroups(contentTabs, formGroups, variations, index); // [13]

        // Render to dom
        this.contentBlocksParentEl.appendChild(blockSingleEl); // [14]

        // if (this.isDragAllowed()) this.toggleDragEl.disabled = false; 
        // if (this.dragDrop.isDragAllowed()) this.dragDrop.toggleDragEl.disabled = false; // [15] extract this?
        if (this.dragDrop.isDragAllowed()) this.dragDrop.toggleDragEl.disabled = false; // [15] extract this?
    };

};