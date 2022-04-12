// ==========================================================================
// CONTENT BLOCKS / CONTENTBLOCK / #CONTENT BLOCK
// ==========================================================================

//
// Imports
//
import DomElement from '../DomElement/DomElement';
import DomNameUtils from '../utils/DomName';
import DomDataUtils from '../utils/DomData';
import OptionUtils from '../utils/Option';
import FormGroup from './FormGroup/FormGroup';

//
// Content block class
//
// @usage
// new ContentBlock(index, parentEl, options, dragDrop);
//
export default class ContentBlock {

    //
    // Constructor
    //
    // @constructs ContentBlock
    //
    // @param {number} index
    // @param {HTMLElement} parentEl
    // @param {object} options
    // @param {DragDrop} dragDrop
    //
    constructor(index, parentEl, options, dragDrop) {
        this.index = index + 1;
        this.contentBlocksParentEl = parentEl;
        this.options = options;
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
    // Add tabbing buttons
    // Adds the tab buttons to the target element.
    // 
    // @param {object} tabs
    // @param {HTMLElement} targetEl
    // 
    // @usage
    // this.addTabButtons(tabs, targetEl);
    //
    // [1] Create a new wrapper for the buttons and append it to the target.
    // [2] For each tab in the tabs object:
    //     # Create a new button element.
    //     # Add the attributes.
    //     # Add a data-target so the click handler knows which tab to switch to.
    //     # Append it to the button wrapper.
    //
    // [3] If this iteration [2] has an 'active' key:
    //     # Set the button to disabled.
    //     # Add an active class to the button.
    //
    addTabButtons(tabs, targetEl) {
        const { el: buttonWrapperEl } = new DomElement('div') // [1]
            .addAttributes({
                classList: [...this.getClassNamesFor('block:nav')]
            })
            .appendTo(targetEl);

        for (const contentTab in tabs) { // [2]
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

            if (tabs[contentTab].active) { // [3]
                tabButtonEl.disabled = true;
                tabButtonEl.classList.add(this.getClassNameFor('button:tab:active'))
            };
        };
    };

    //
    // Add tab containers
    // Adds the tab containers (divs)
    // 
    // @param {object} tabs
    // @param {HTMLElement} targetEl
    // 
    // @usage
    // this.addTabContainers(tabs, targetEl);
    //
    // [1] Create an empty tabNodes object
    //     # We'll be adding tabs to this and returning it so form groups can be added to the correct tabs.
    //
    // [2] For each tab in the tabs object:
    //     # Create a new div node and apppend it to the target element.
    //
    // [3] If this iteration [2] has an 'active' key:
    //     # Add an active class to the button.
    //
    // [4] Add a new key to the tabNodes object [1]
    //     # Set the value to a reference of the node created in [2]
    //     # Result should look something like: 
    //     {content: div.content-block__tab.content-block__tab--content.active, classes: div.content-block__tab.content-block__tab--classes}
    //
    // [5] Return the tabNodes object
    //
    addTabContainers(tabs, targetEl) {
        const tabNodes = {}; // [1]

        for (const tabContainer in tabs) { // [2]
            const { el: tabContainerEl } = new DomElement('div')
                .addAttributes({
                    classList: [
                        ...this.getClassNamesFor('block:tab'),
                        `${this.getClassNameFor('block:tab')}--${tabContainer}`,
                    ]
                })
                .appendTo(targetEl);

            if (tabs[tabContainer].active) { // [3]
                tabContainerEl.classList.add(this.getClassNamesFor('block:tab:active'));
            };

            tabNodes[tabContainer] = tabContainerEl; // [4]
        };

        return tabNodes; // [5]
    };

    //
    // Block wrapper
    // Adds a block wrapper (fieldset)
    // 
    // @param {string} blockType
    //
    // @usage
    // this.addBlockWrapper(blockType);
    //
    // [1] Create a new fieldset node
    //     # Add a data-index attribute
    //
    // [2] If dragging is turned on when the wrapper is added:
    //     # Add the draggable classes
    //     # Set the draggable attribute to true
    //
    addBlockWrapper(blockType) {
        const { el } = new DomElement('fieldset') // [1]
            .addAttributes({
                classList: [...this.getClassNamesFor('block:single'), `${this.getClassNameFor('block:single')}--${blockType}`],
                dataset: {
                    index: this.index
                }
            });

        // Add conditional attributes
        if (this.dragDrop.dragState) { // [2]
            el.classList.add(...this.getClassNamesFor('drag:draggable'));
            el.draggable = true;
        };

        return el;
    };

    //
    // Block title
    // Adds a legend to a content block wrapper
    // 
    // @param {HTMLElement} blockEl
    // @param {object} titleOptions
    //
    // @usage
    // this.addBlockTitleTo(blockEl, titleOptions)
    //
    // [1] Destruct the display and icon from the titleOptions.
    // [2] Create a new legened node and appened it to the block element
    // [3] If and icon was descructed from the title options:
    //     # Create a new idiomatic node
    //     # Prepend it to the legend so it appears before the text
    // 
    addBlockTitleTo(blockEl, titleOptions) {
        const { display, icon } = titleOptions; // [1]
        const { el: displayEl } = new DomElement('legend') // [2]
            .addAttributes({
                textContent: display,
                classList: this.getClassNamesFor('block:title')
            })
            .appendTo(blockEl);

        if (icon) { // [3]
            new DomElement('i')
                .addAttributes({
                    classList: [
                        ...this.getClassNamesFor('block:icon'),
                        `${this.getClassNameFor('block:icon')}--${icon}`
                    ]
                })
                .prependTo(displayEl);
        };

        return this;
    };

    //
    // Add content block
    // Adds a content block to the DOM
    //
    // @param {string} blockType
    // @param {object} blockOptions
    //
    // @throws
    // Will throw an error if the block type is falsy.
    // Will throw an error if the block options doesn't destruct values from the display or formControl keys.
    // Will throw an error if the destructed formGroups is not an object or its empty.
    //
    // @usage
    // this.addContentBlock(blockType, blockOptions);
    //
    // @example
    // this.addContentBlock('link', options);
    //
    // [1] If blockType is falsy throw an error.
    // [2] Deconstruct some keys from the blockOptions.
    // [3] If the desctucted display or formcontrols keys are falsy thow an error.
    // [4] If the destructed Form groups are not an object or its length is zero throw an error.
    // [5] Define hasTabs. 
    // [6] Add a block wrapper
    // [7] Add a block title
    // [8] Create a remove button for the content block
    // [9] If this block has tabs add buttons for them.
    // [10] Add a hidden input so when we submit the form we know what kind of content this block is
    // [11] Define contentTabs using a ternary:
    //      # Will be set to an object of tabs if the block has tabs.
    //      # Otherwise will be set to the block wrapper.
    // [12] Create a new FormGroup instance
    // [13] For each group in the formGroups object:
    //      # Call the add method of FormGroup
    // [14] Append the block to the DOM
    // [15] If drag is allowed enabled the drag button
    //      # Dragging is allowed when there is > 1 content block in the DOM

    // [5] Create a new content block
    //     # Set the drag state from this.dragState
    //     # Initially this will be false.
    //     # If the user has enabled dragging and then adds a new block this will be true.
    //
    add(blockType, blockOptions) {
        if (!blockType) throw new Error('No content type provided for this block'); // [1]
        const { display, icon, formGroups, variations, tabs } = (blockOptions || {}); // [2]
        if (!display || !formGroups) throw new Error(`Invalid options provided for the ${blockType} content block`); // [3]
        if (typeof formGroups != 'object' || !Object.keys(formGroups).length) throw new Error('No form controls were passed'); // [4]
        const hasTabs = !!(tabs); // [5]

        // Block wrapper
        const blockSingleEl = this.addBlockWrapper(blockType); // [6]

        // Block legend
        this.addBlockTitleTo(blockSingleEl, { display, icon }); // [7]

        // Block remove button
        new DomElement('button') // [8]
            .addAttributes({
                type: 'button',
                textContent: this.options.text['button:removeBlock'],
                classList: this.getClassNamesFor('button:removeBlock')
            })
            .appendTo(blockSingleEl);

        // Tab buttons
        if (hasTabs) this.addTabButtons(tabs, blockSingleEl); // [9]

        // Hidden content type
        new DomElement('input') // [10]
            .addAttributes({
                type: 'hidden',
                value: blockType,
                name: DomNameUtils.generateName(this.index, 'type')
            })
            .appendTo(blockSingleEl);

        // Content tabs
        const contentTabs = (hasTabs) ? this.addTabContainers(tabs, blockSingleEl) : blockSingleEl; // [11]

        // Form groups
        const formGroup = new FormGroup(contentTabs, variations, this.index, this.options); // [12]
        for (const group in formGroups) { // [13]
            formGroup.add(group, formGroups[group]);
        };

        // Render to dom
        this.contentBlocksParentEl.appendChild(blockSingleEl); // [14]

        if (this.dragDrop.isDragAllowed()) this.dragDrop.toggleDragEl.disabled = false; // [15] extract this?
    };

    //
    // Remove
    // Removes a content block from the DOM
    //
    // @param {HTMLElement} targetEl
    //
    // @usage
    // this.removeContentBlock(targetEl);
    //
    // [1] If targetEl is falsy return.
    // [2] Remove targetEl from the DOM.
    // [3] Update the indexes in the siblings that are left
    // [4] If dragging is not allowed disable it.
    //     # Dragging will be disabled if there's less than 2 content blocks in the DOM.
    //
    remove(targetEl, contentBlocksLNL) {
        if (!targetEl) return; // [1]
        targetEl.remove(); // [2]

        DomDataUtils.updateWrapperIndexes(contentBlocksLNL); // [3]
        if (!this.dragDrop.isDragAllowed()) this.dragDrop.disableDrag(); // [4]
    };
};