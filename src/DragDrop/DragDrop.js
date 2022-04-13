// ==========================================================================
// CONTENT BLOCKS / DRAGDROP / #DRAG DROP
// ==========================================================================

//
// Imports
//
import DomClassUtils from '../utils/DomClass';
import DomDataUtils from '../utils/DomData';
import OptionUtils from '../utils/Option';

//
// Default options
//
const defaultOptions = {
    initialDragState: false
};

//
// Drag drop class
//
// @usage
// new DragDrop(parentEl, blocks, options);
//
export default class DragDrop {

    //
    // Constructor
    //
    // @constructs DragDrop
    //
    // @param {HTMLElement} parentEl
    // @param {live node list} blocks
    // @param {object} options
    //
    // [1] Set the initial drag state
    // [2] 
    // [3] 
    //
    constructor(parentEl, blocks, options = {}) {
        this.contentBlocksParentEl = parentEl;
        this.contentBlocksLNL = blocks;
        this.options = {
            ...defaultOptions,
            ...options
        };

        this.dragState = this.options.initialDragState; // [1]
        this.toggleDragEl = this.contentBlocksParentEl.querySelector(`.${this.getClassNameFor('button:toggleDrag')}`); // [2]
        this.dragListeners(); // [3]
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
    // Is drag allowed
    // Checks the length of the content blocks live node list
    // @returns boolean
    //
    // @usage
    // this.isDragAllowed();
    //
    // [1] Returns true if there is more than one content block in the DOM, otherwise returns false.
    //
    isDragAllowed() {
        return this.contentBlocksLNL.length > 1; // [1]
    };

    //
    // Disable drag
    // Disables the drag toggle button and sets all content blocks draggable attribute to false.
    //
    // @usage
    // this.disableDrag();
    //
    // [1] Set the dragState field to false.
    //     # Any blocks added in the future will get/set their draggable attribute from this field.
    // [2] Disable the drag toggle button
    // [3] Uncheck the drag toggle
    // [4] Remove the active class from the drag toggle button
    // [5] For each content block in the content block live node list: 
    //     # Set it's draggable attribute to false.
    //
    disableDrag() {
        this.dragState = false; // [1]
        this.toggleDragEl.disabled = true; // [2]
        this.toggleDragEl.checked = false; // [3]
        this.toggleDragEl.classList.remove(this.getClassNameFor('button:toggleDrag:active')); // [4]
        DomClassUtils.removeClassesFromNodeList(this.getClassNamesFor('drag:draggable'), this.contentBlocksLNL);
        for (const contentBlock of this.contentBlocksLNL) { // [5]
            contentBlock.draggable = false;
        };
    };

    //
    // Handle drag toggle
    // Drag toggle click event handler.
    //
    // @param {DOM click event} event
    //
    // @usage
    // this.handleDragToggle();
    //
    // [1] If dragging is not allowed return.
    // [2] Toggle the active class on the drag toggle button
    // 
    // [3] Set the drag state field
    //     # If the first node in the content blocks live node lists draggable attribute it true:
    //     - Set the drag state to false
    //     - Otherwise set it to true
    //     # Essentially setting the value of the field to the opposite of what it currently is
    //     # A toggle of sorts.
    // [4] For each node in the content block live node list:
    //     # Set its draggable attribute to the drag state field [3]
    //
    handleDragToggle(event) {
        if (!this.isDragAllowed()) return; // [1]
        this.toggleDragEl.classList.toggle(this.getClassNameFor('button:toggleDrag:active')); // [2]
        DomClassUtils.toggleClassesOnNodeList(this.getClassNamesFor('drag:draggable'), this.contentBlocksLNL);
        this.dragState = this.contentBlocksLNL[0].draggable ? false : true; // [3]
        for (const contentBlock of this.contentBlocksLNL) { // [4]
            contentBlock.draggable = this.dragState;
        };
    };

    //
    // Handle drag start
    // dragstart event handler.
    //
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event
    //
    // @param {DragEvent} event - DOM Drag event
    //
    // @usage
    // this.handleDragStart();
    //
    // [1] Set targetEl to the closest ancestor with the block:single class.
    // [2] If the draggable attribute on the ancestor is false return.
    //
    // Set some data transfer for the drag operation
    // # The DragEvent.dataTransfer property holds the drag operation's data as a DataTransfer object.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer 
    //
    // [3] Set the drag operations drag data to the specified format and data
    //     # dataTransfer.setData(format, data);
    //     # Currently passing data-index.
    // [4] Specify the effect that is allowed for the drag operation
    //     # move - An item may be moved to a new location
    //
    handleDragStart(event) {
        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        if (!targetEl.draggable) return; // [2]

        event.dataTransfer.setData('text/plain', targetEl.dataset.index); // [3]
        event.dataTransfer.effectAllowed = 'move'; // [4]
    };

    //
    // Handle drag end
    // dragend event handler.
    //
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/dragend_event
    //
    // @param {DragEvent} event - DOM Drag event
    //
    // @usage
    // this.handleDragEnd();
    //
    // [1] If the dropEffect in the DataTransfer object === 'none':
    //     # No drop effect means the drag was cancelled
    //     # Remove the drag:droppable class from all children of the content blocks parent element.
    // [2] Update the wrapper indexes.
    //
    handleDragEnd(event) {
        if (event.dataTransfer.dropEffect === 'none') { // [1]
            DomClassUtils.removeClassFromChildren(this.contentBlocksParentEl, this.getClassNameFor('drag:droppable'));
        };

        DomDataUtils.updateWrapperIndexes(this.contentBlocksLNL); // [3]
    };

    //
    // Handle drag enter
    // dragenter event handler.
    //
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event
    //
    // @param {DragEvent} event - DOM Drag event
    //
    // @usage
    // this.handleDragEnter();
    //
    // [1] Set targetEl to the closest ancestor with the block:single class.
    // [2] If targetEl is falsy return.
    // [3] If the first item in dataTransfer types is 'text/html'
    //     # Add the drag:droppable class to the targetEl
    // [4] Call preventDefault() to prevent additional event processing for this event
    //     # Such as touch events or pointer events
    //
    handleDragEnter(event) {
        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        if (!targetEl) return; // [2]
        if (event.dataTransfer.types[0] === 'text/plain') { // [3]
            targetEl.classList.add(this.getClassNameFor('drag:droppable'));
            event.preventDefault(); // [4]
        };
    };

    //
    // Handle drag over
    // dragover event hander.
    //
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event
    //
    // @param {DragEvent} event - DOM Drag event
    //
    // @usage
    // this.handleDragOver();
    //
    // [1] If the first item in dataTransfer types is 'text/html'
    //     # Call preventDefault() to prevent additional event processing for this event
    //     - Such as touch events or pointer events
    //
    handleDragOver(event) {
        if (event.dataTransfer.types[0] === 'text/plain') { // [1]
            event.preventDefault();
        };
    };

    //
    // Handle drag leave
    // dragleave event handler.
    //
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/dragleave_event
    //
    // @param {DragEvent} event - DOM Drag event
    //
    // @usage
    // this.handleDragLeave();
    //
    // [1] Set targetEl to the closest ancestor with the block:single class.
    // [2] If targetEl or event.relatedTarget are falsy return.
    // [3] If the closest ancestor with block:single class is not the targetEl.
    //     # Remove the drag:droppable class from all children of the content blocks parent element.
    //
    handleDragLeave(event) {
        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        if (!targetEl || !event.relatedTarget) return; // [2]
        if (event.relatedTarget.closest(`.${this.getClassNameFor('block:single')}`) !== targetEl) { // [3]
            DomClassUtils.removeClassFromChildren(this.contentBlocksParentEl, this.getClassNameFor('drag:droppable'));
        };
    };

    //
    // Handle drag drop
    // drop event handler.
    //
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
    //
    // @param {DragEvent} event - DOM Drag event
    //
    // @usage
    // this.handleDragDrop();
    //
    // [1] Set targetEl to the closest ancestor with the block:single class.
    //     # TargetEl is where we want to drop the node.
    // [2] Get the data set in handleDragStart() and assign it to a const.
    //     # The data set was the data-index
    // [3] Set newNode to the element with the data-index from [2]
    //     # This is the node we want to move.
    // [4] If targetEl or targetEl.parentElement are falsy return.
    // [5] Insert the new node before targetEl.
    // [6] Remove the drag:droppable class from targetEl
    //
    handleDragDrop(event) {
        event.preventDefault();

        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        const data = event.dataTransfer.getData('text/plain'); // [2]
        const newNode = document.querySelector(`[data-index='${data}']`); // [3]

        if (!targetEl || !targetEl.parentElement) return; // [4]

        targetEl.parentElement.insertBefore(newNode, targetEl); // [5]
        targetEl.classList.remove(this.getClassNameFor('drag:droppable')); // [6]
    };

    //
    // Drag listeners
    //
    // @usage
    // this.dragListeners();
    //
    dragListeners() {
        this.contentBlocksParentEl.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.contentBlocksParentEl.addEventListener('dragend', this.handleDragEnd.bind(this));
        this.contentBlocksParentEl.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.contentBlocksParentEl.addEventListener('dragover', this.handleDragOver.bind(this));
        this.contentBlocksParentEl.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.contentBlocksParentEl.addEventListener('drop', this.handleDragDrop.bind(this));
        this.toggleDragEl.addEventListener('change', this.handleDragToggle.bind(this));

        return this;
    };
};