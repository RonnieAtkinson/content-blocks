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
    constructor(index, parentEl, options, dragDrop) {
        this.index = index + 1;
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
    // Block wrapper
    //
    addBlockWrapper(blockType) {
        const { el } = new DomElement('fieldset') // [5]
            .addAttributes({
                classList: [...this.getClassNamesFor('block:single'), `${this.getClassNameFor('block:single')}--${blockType}`],
                dataset: {
                    // id: this.index
                    index: this.index
                }
            });

        // Add conditional attributes
        if (this.dragDrop.dragState) {
            el.classList.add(...this.getClassNamesFor('drag:draggable'));
            el.draggable = true;
        };

        return el;
    };

    //
    // Block title
    //
    addBlockTitleTo(BlockEl, titleOptions) {
        const { display, icon } = titleOptions;
        const { el: displayEl } = new DomElement('legend') // [6]
            .addAttributes({
                textContent: display,
                classList: this.getClassNamesFor('block:title')
            })
            .appendTo(BlockEl);

        if (icon) {
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
    // [4] 
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
    add(blockType, blockOptions) {
        if (!blockType) throw new Error('No content type provided for this block'); // [1]
        const { display, icon, formGroups, variations, tabs } = (blockOptions || {}); // [2]
        if (!display || !formGroups) throw new Error(`Invalid options provided for the ${blockType} content block`); // [3]
        if (typeof formGroups != 'object' || !Object.keys(formGroups).length) throw new Error('No form controls were passed');
        const hasTabs = !!(tabs);

        // Block wrapper
        const blockSingleEl = this.addBlockWrapper(blockType);

        // Block legend
        this.addBlockTitleTo(blockSingleEl, { display, icon });

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
                name: DomNameUtils.generateName(this.index, 'type')
            })
            .appendTo(blockSingleEl);

        // Content tabs
        const contentTabs = (hasTabs) ? this.addTabContainers(tabs, blockSingleEl) : blockSingleEl;

        // Form groups
        const formGroup = new FormGroup(contentTabs, variations, this.index, this.options);
        for (const group in formGroups) { // [2]
            formGroup.add(group, formGroups[group]);
        };

        // Render to dom
        this.contentBlocksParentEl.appendChild(blockSingleEl); // [14]

        // if (this.isDragAllowed()) this.toggleDragEl.disabled = false; 
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

        DomDataUtils.updateWrapperIndexes(contentBlocksLNL);
        if (!this.dragDrop.isDragAllowed()) this.dragDrop.disableDrag();
    };
};