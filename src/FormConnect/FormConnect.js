// ==========================================================================
// CONTENT BLOCKS / FORMCONNECT / #FORM CONNECT
// ==========================================================================

//
// Imports
//
import DomClassUtils from '../utils/DomClass';
import DomNameUtils from '../utils/DomName';
import DomDataUtils from '../utils/DomData';
import CheckValue from '../utils/CheckValue';
import DomElement from '../DomElement/DomElement';
import ContentBlock from '../ContentBlock/ContentBlock';
import DragDrop from '../DragDrop/DragDrop';
import OptionUtils from '../utils/Option';

//
// Default classes
//
// These are the default class names.
// They can be overwritten when initilising a new instance of FormConnect using the options param.
//
// Multiple classes are supported by using an array:
// {'block:wrapper' : ['classname1', 'classname2', 'etc']}
//
// Overwriting using the options param:
// new FormConnect(formEl, {}, {
//      classes: {
//          'block:wrapper' : ['classname1', 'classname2', 'etc']
//      }   
// });
//
// Modifier classes always use the first class in the array:
// {'block:wrapper' : ['classname1', 'classname2', 'etc']}
// modifier: classname1--modifier
//
// They are retrieved using a helper:
// getClassNamesFor('block:wrapper');
// # If only one class name is defined it will be added to an array.
// # Multiple classes added to an array are left untouched.
// # Get all the class names in the array.
//
// getClassNameFor('block:wrapper');
// # Calls getClassNamesFor();
// # Get the first class name in the array.
//
const defaultClasses = {
    'block:wrapper': 'content-blocks-wrapper',
    'block:parent': 'content-blocks',
    'block:single': 'content-block',
    'block:title': 'content-block__title',
    'block:nav': 'content-block__nav',
    'block:tab': 'content-block__tab',
    'block:tab:active': 'active',
    'block:icon': 'icon',
    'form:group': 'form-group',
    'form:control': 'form-control',
    'button:wrapper': 'content-blocks-buttons',
    'button:addBlock': 'bt-add-group',
    'button:removeBlock': 'bt-remove-group',
    'button:addDynamic': 'bt-add',
    'button:removeDynamic': 'bt-remove',
    'button:tab': 'bt-tab',
    'button:tab:active': 'active',
    'button:toggleDrag': 'bt-toggle-draggable',
    'button:toggleDrag:active': 'active',
    'drag:droppable': 'droppable',
    'drag:draggable': 'draggable'
};

//
// Default text
//
// These are the defaults for text content
// Can be overwritten when initilizing a new FormConnect instance using the options param
//
// Overwriting using the options param:
// new FormConnect(formEl, {}, {
//      text: {
//          'button:removeBlock' : 'Delete'
//      }
// });
//
const defaultText = {
    'button:removeBlock': 'Remove',
    'button:addDynamic': 'Add',
    'button:removeDynamic': 'Remove',
    'button:tab:default': 'Content'
};

//
// Default options
//
// These are the default options.
// There was something here...
// Leaving it for now.
//
const defaultOptions = {};

//
// Default form groups
//
// This object holds the default formGroups
// They're templates for form groups that are used multiple times in defaultContentBlocks
//
export const defaultFormGroups = {
    classes: {
        tab: 'classes',
        label: 'Classes',
        dynamic: true,
        attributes: {
            data: {
                el: 'input',
                type: 'text',
                name: 'class',
                placeholder: 'Class name'
            }
        }
    },
    paragraph: {
        label: 'Paragraph',
        dynamic: true,
        attributes: {
            data: {
                el: 'textarea',
                name: 'content'
            }
        }
    },
    inputTextarea: {
        label: 'Content',
        element: {
            node: 'textarea'
        }
    },
    inputText: {
        label: 'Content',
        element: {
            node: 'input',
            attributes: {
                type: 'text'
            }
        }
    },
    inputSelect: {
        label: 'Variation',
        element: {
            node: 'select'
        }
    }
};

//
// Default content blocks
//
// This object holds the default content blocks
// 
//
const defaultContentBlocks = {
    intro: {
        display: 'Introduction',
        icon: 'intro',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        formGroups: {
            content: {
                ...defaultFormGroups.inputTextarea,
                tab: 'content'

            },
            classes: {
                ...defaultFormGroups.classes
            }
        }
    },
    link: {
        display: 'Link',
        icon: 'link',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' }
        },
        variations: {
            internal: { display: 'Internal' },
            external: { display: 'External' }
        },
        formGroups: {
            variation: {
                ...defaultFormGroups.inputSelect,
                tab: 'content'
            },
            linkText: {
                ...defaultFormGroups.inputText,
                tab: 'content',
                label: 'Link Text',
                element: {
                    ...defaultFormGroups.inputText.element,
                    attributes: {
                        ...defaultFormGroups.inputText.element.attributes,
                        placeholder: 'Link text label'
                    }
                }
            },
            linkUrl: {
                ...defaultFormGroups.inputText,
                tab: 'content',
                label: 'Link URL',
                element: {
                    ...defaultFormGroups.inputText.element,
                    attributes: {
                        ...defaultFormGroups.inputText.element.attributes,
                        placeholder: 'Link URL'
                    }
                }
            },
            classes: {
                ...defaultFormGroups.classes
            }
        }
    },
    paragraph: {
        display: 'Paragraph',
        icon: 'paragraph',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        formGroups: {
            paragraph: {
                ...defaultFormGroups.paragraph,
                label: 'Content',
                tab: 'content'

            },
            classes: {
                ...defaultFormGroups.classes
            }
        }
    },
    heading: {
        display: 'Heading',
        icon: 'heading',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        variations: {
            h2: { display: 'H2' },
            h3: { display: 'H3' },
            h4: { display: 'H4' },
            h5: { display: 'H5' },
            h6: { display: 'H6' },
        },
        formGroups: {
            variation: {
                ...defaultFormGroups.inputSelect,
                tab: 'content'
            },
            content: {
                ...defaultFormGroups.inputText,
                tab: 'content',
                element: {
                    ...defaultFormGroups.inputText.element,
                    attributes: {
                        ...defaultFormGroups.inputText.element.attributes,
                        placeholder: 'Heading text'
                    }
                }
            },
            classes: {
                ...defaultFormGroups.classes
            }
        }
    },
    infoBox: {
        display: 'Information Box',
        icon: 'info',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        variations: {
            positive: { display: 'Positive' },
            negative: { display: 'Negative' },
            neutral: { display: 'Neutral' }
        },
        formGroups: {
            variation: {
                ...defaultFormGroups.inputSelect,
                tab: 'content',
            },
            title: {
                ...defaultFormGroups.inputText,
                tab: 'content',
                label: 'Title',
                element: {
                    ...defaultFormGroups.inputText.element,
                    attributes: {
                        ...defaultFormGroups.inputText.element.attributes,
                        placeholder: 'Box title'
                    }
                }
            },
            paragraph: {
                ...defaultFormGroups.paragraph,
                tab: 'content'
            },
            classes: {
                ...defaultFormGroups.classes
            }
        }
    },
    code: {
        display: 'Code Block',
        icon: 'code',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        variations: {
            html: { display: 'HTML' },
            javascript: { display: 'Javascript' }
        },
        formGroups: {
            variation: {
                ...defaultFormGroups.inputSelect,
                tab: 'content',
                label: 'Language'
            },
            content: {
                ...defaultFormGroups.inputTextarea,
                tab: 'content'

            },
            classes: {
                ...defaultFormGroups.classes
            }
        }
    }
};

//
// Form connect class
//
// @param {HTMLElement} formEl
// @param {object} contentGroups
// @param {object} options
//
// @throws
// Will throw an error if formEl parameter is falsy of its not a form node.
// Will throw an error if contentGroups is falsy or its not an object.
//
// @usage
// new FormConnect(formEl, contentGroups);
//
// @usage
// options is optional
// new FormConnect(formEl, contentGroups, options);
//
export default class FormConnect {

    //
    // Class constructor
    //
    // @constructs FormControl
    //
    // [1] If formEl is falsy or its not a form node throw an error.
    // [2] If contentGroups is falsy or its not an object throw an error.
    // [3] Set the formEl parameter to a class field.
    // [4] Set the contentGroups to a class field.
    // [5] Define a new options class field.
    // [6] Nest a classes object.
    // [7] Inlcude all the default classes.
    // [8] Include all the classes from the options parameter.
    //     # Duplicate key value pairs from the options param will overwrite anything set from default classes.
    //     # Allowing you to set custom classes when instantiating.
    // 
    // [9] Set the content blocks wrapper element to a class field as an HTMLElement.
    // [10] Set the content blocks parent element to a class field as an HTMLElement.
    // [11] Set the content blocks button wrapper element to a class field as an HTMLElement.
    // [12] Set the toggle drag element to a classfield as an HTMLElement.
    // [13] Set the individial content blocks to a class field as a live node list. 
    // [14] Set the initial drag state from the options.
    //      # Default is false.
    // [15] Call the render method on initialization.
    //
    constructor(formEl, contentBlocks = {}, options = {}) {
        if (!formEl || formEl.nodeName != 'FORM') throw new Error('A valid form node is required to connect a form'); // [1]
        if (!contentBlocks || typeof contentBlocks != 'object') throw new Error(`Content groups must be passed as an object. Currently ${typeof contentGroups}`); // [2]

        this.ACTION_ADD = 'add';
        this.ACTION_REMOVE = 'remove';

        this.formEl = formEl; // [3]
        this.contentGroups = { // [4]
            ...defaultContentBlocks,
            ...contentBlocks
        };

        this.options = { // [5]
            ...defaultOptions,
            ...options,
            text: {
                ...defaultText,
                ...(options.text || {})
            },
            classes: {
                ...defaultClasses,
                ...(options.classes || {})
            },
            exclude: {
                defaultBlocks: ((options.exclude || []).defaultBlocks || [])
            }
        };

        if (this.options.exclude.defaultBlocks.length > 0) this.excludeDefaultBlocks(); // [6]

        this.contentBlocksWrapperEl = this.formEl.querySelector(`.${this.getClassNameFor('block:wrapper')}`); // [9]
        this.contentBlocksParentEl = this.contentBlocksWrapperEl.querySelector(`.${this.getClassNameFor('block:parent')}`); // [10]
        this.contentBlocksButtonWrapperEl = this.contentBlocksWrapperEl.querySelector(`.${this.getClassNameFor('button:wrapper')}`); // [11]
        this.contentBlocksLNL = this.contentBlocksParentEl.getElementsByClassName(this.getClassNameFor('block:single')); // [13]

        this.dragDrop = new DragDrop(
            this.contentBlocksParentEl,
            this.contentBlocksLNL,
            this.options
        ); // NEW

        this.render(); // [15]
    };

    //
    // Exclude default content block
    // Deletes keys from the default content blocks
    // Deleted keys are defined in the options param when instantiating:
    // eg: exclude: { defaultBlocks: ['link'] }
    //
    // @usage
    // this.excludeDefaultBlocks();
    //
    excludeDefaultBlocks() {
        for (const excludeBlock of this.options.exclude.defaultBlocks) {
            delete this.contentGroups[excludeBlock];
        };
        return this;
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
        return OptionUtils.getClassNamesFor(name, this.options.classes);
    };

    //
    // Update wrapper indexes
    // Updates the data-id on content group fieldsets
    // Updates the child postContent names
    //
    // @usage
    // this.updateWrapperIndexes();
    //
    // [1] Start the index at 1
    // [2] For each content block in the node list:
    // [3] Set data-id to the index [1]
    // [4] Call this.updatedIndexInNames() to update the index in child name attributes.
    // [5] Increment the index by 1 each iteration.
    //
    updateWrapperIndexes() {
        let newIndex = 1; // [1]
        for (const contentBlock of this.contentBlocksLNL) { // [2]
            contentBlock.dataset.id = newIndex; // [3]
            DomNameUtils.updateIndexInNames(contentBlock, newIndex);
            newIndex++; // [5]
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
    toggleDynamicRemoveButton(targetEl, inputLength, action) {
        if (!targetEl || CheckValue.isNullUndefindedEmpty(inputLength)) throw new Error('To toggle the remove button a required parameter is missing'); // [1]
        if (![this.ACTION_ADD, this.ACTION_REMOVE].includes(action)) throw new Error(`To toggle the remove button the action parmeter needs to be \'add\' or \'remove\'. ${action} was provided.`); // [2]
        const shouldDisable = inputLength === 0; // [3]
        if ((action === this.ACTION_ADD && inputLength > 1) || (action === this.ACTION_REMOVE && !shouldDisable)) return; // [4]
        targetEl.disabled = shouldDisable; // [5]
    };

    //
    // Add dynamic element
    // Adds a dynamic element to the DOM.
    // Dynamic elements are elements that can be manually added to or removed from a form-control after it has been rendered to the dom.
    //
    // @param {HTMLElement} targetEl
    // @param {string} elType
    // @param {Live NodeList} allInputs
    //
    // @usage
    // this.addDynamicElement(targetEl, elType, allInputs);
    //
    // @example
    // this.addDynamicElement();
    //
    // [1] Get the data-id from the closest fieldset.
    // [2] Destruct the name and type from the closest form control dataset.
    //     # data-name, data-type.
    // [3] Define a new params object.
    //     # Only needs the name at this point.
    // [4] If there was a data-type on the parent [2] add a 'type' attribute to the params object:
    //     # This is in a conditional statement because not all inputs need a type param.
    //     # textarea for example doesn't need one. 
    // [5] Create a new dom element using the params object and insert before targetEl
    // [6] Call toggleDynamicRemoveButton();
    //     # Disables the remove button if required.
    //
    addDynamicElement(targetEl, elType, allInputs) {
        const contentIndex = targetEl.closest(`.${this.getClassNameFor('block:single')}`).dataset.id; // [1]
        const { name: inputName, type: inputType, placeholder: inputPlaceholder } = targetEl.closest(`.${this.getClassNameFor('form:group')}`).dataset; // [2]
        // const params = { name: this.generateName(contentIndex, inputName, true) }; // [3]
        const params = {
            name: DomNameUtils.generateName(contentIndex, inputName, true),
            classList: [...this.getClassNamesFor('form:control')]
        };
        if (inputType) params.type = inputType; // [4]
        if (inputPlaceholder) params.placeholder = inputPlaceholder;

        new DomElement(elType).addAttributes(params).insertBeforeEl(targetEl); // [5]
        this.toggleDynamicRemoveButton(targetEl.nextElementSibling, allInputs.length, this.ACTION_ADD); // [6]

        return this;
    };

    //
    // Remove dynamic element
    // Removes a dynamic element from the DOM
    // Dynamic elements are elements that can be manually added to or removed from a form-control after it has been rendered to the dom
    //
    // @param {HTMLElement} targetEl
    // @param {Live NodeList} allInputs
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
    removeDynamicElement(targetEl, allInputs) {
        const { length } = allInputs; // [1]

        if (length === 0) return; // [2]
        allInputs[length - 1].parentElement.removeChild(allInputs[length - 1]); // [3]
        this.toggleDynamicRemoveButton(targetEl, allInputs.length, this.ACTION_ADD); // [4]

        return this;
    };

    //
    // Add content block buttons
    // Adds content block creation to the bottom of the form
    // These buttons are used to add content blocks to the form
    //
    // @usage
    // this.addContentButtons();
    //
    // [1] For each content block type in this.contentGroups:
    // [2] Create a new button element.
    // [3] Set the type to 'button' so they dont submit the form.
    // [4] Set the textContent to a value from the object.
    // [5] Set the class list from this.options.
    //     # class will either be from the default classes.
    //     # or user defined on init.
    // [6] set the data-group to the group const
    //     # result will look something like data-group="heading"
    // [7] Append to the button wrapper
    //
    addContentButtons() {
        for (const group in this.contentGroups) { // [1]
            const { icon, display } = this.contentGroups[group];
            const { el: buttonEl } = new DomElement('button')
                .addAttributes({ // [2]
                    type: 'button', // [3]
                    textContent: display, // [4]
                    classList: [...this.getClassNamesFor('button:addBlock'), `${this.getClassNameFor('button:addBlock')}--${group}`], // [5]
                    dataset: { group } // [6]
                })
                .appendTo(this.contentBlocksButtonWrapperEl); // [7]

            if (icon) {
                new DomElement('i')
                    .addAttributes({
                        classList: [
                            ...this.getClassNamesFor('block:icon'),
                            `${this.getClassNameFor('block:icon')}--${icon}`
                        ]
                    })
                    .prependTo(buttonEl);
            };
        };
    };

    //
    // Remove content block
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
    removeContentBlock(targetEl) {
        if (!targetEl) return; // [1]
        targetEl.remove(); // [2]

        DomDataUtils.updateWrapperIndexes(this.contentBlocksLNL);
        if (!this.dragDrop.isDragAllowed()) this.dragDrop.disableDrag();
    };

    //
    // Switch to tab
    //
    // @todo comments
    //
    switchToTab(targetEl) {
        const parentContentBlock = targetEl.closest(`.${this.getClassNameFor('block:single')}`);
        const buttonWrapper = targetEl.parentElement;
        const targetTab = targetEl.dataset.target;

        // Update classes on the buttons
        const allButtons = buttonWrapper.querySelectorAll('button')
        for (const bt of allButtons) {
            bt.classList.remove(...this.getClassNamesFor('button:tab:active'));
            bt.disabled = false;
        };

        targetEl.classList.add(...this.getClassNamesFor('button:tab:active'));
        targetEl.disabled = true;

        // Update classes on the content tabs
        DomClassUtils.removeClassFromChildren(parentContentBlock, this.getClassNameFor('block:tab'), this.getClassNameFor('block:tab:active'));
        parentContentBlock.querySelector(`.${targetTab}`).classList.add(this.getClassNameFor('block:tab:active'));
    };

    //
    // Handle form clicks
    // Event delegation for the form buttons
    //
    // @param {DOM click event} event
    //
    // @throws
    // Throws an error if theres no data-el on the ancestor of a dynamic add button
    //
    // @usage
    // this.handleFormClicks();
    //
    // [1] Set targetEl to event.target.
    // [2] Make sure the button type is 'button' and not anything else like 'submit'
    // [3] Define some variables that we can access from parent scopes
    // [4] If targetEl is a dynamic add or remove button:
    //     # Set elType to the value of data-el on the ancestor form:group.
    //     # If theres no data-el on the ancestor throw an error.
    //     # Set allInputs to a live node list of siblings of targetEl that are the same type set in data-el
    //
    // [5] Switch board for the class list of targetEl
    // [6] If the click target is a dynamic add button
    //     # Add a dynamic element/
    // [7] If the click target is a dynamic remove button
    //     # Remove an element
    // [8] If the click target is an add block button
    //     # Add a block
    // [9] If the click target is a remove block button
    //     # Remove a block
    // [10] If the click target is the toggle drag button
    //     # Guessed it... Call the drag toggle handler
    //
    handleFormClicks(event) {
        const targetEl = event.target; // [1]
        if (targetEl.nodeName != 'BUTTON' || targetEl.type !== 'button') return; // [2]

        let allInputs, elType; // [3]

        if (DomClassUtils.targetHasClass(targetEl, [this.getClassNameFor('button:addDynamic'), this.getClassNameFor('button:removeDynamic')])) { // [4]
            elType = targetEl.closest(`.${this.getClassNameFor('form:group')}`).dataset.el;
            if (!elType) throw new Error('No data-el on the parent element');
            allInputs = targetEl.parentElement.getElementsByTagName(elType);
        };

        switch (targetEl.classList) { // [5]
            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:addDynamic')]): // [6]
                this.addDynamicElement(targetEl, elType, allInputs);
                break;

            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:removeDynamic')]): // [7]
                this.removeDynamicElement(targetEl, allInputs);
                break;

            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:addBlock')]): // [8]
                const contentBlock = new ContentBlock(
                    this.contentBlocksLNL,
                    this.contentBlocksParentEl,
                    this.options,
                    this.dragDrop
                );
                contentBlock.addContentBlock(
                    targetEl.dataset.group,
                    this.contentGroups[targetEl.dataset.group],
                );

                // this.addContentBlock(targetEl.dataset.group); // data-group
                break;

            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:removeBlock')]): // [9]
                this.removeContentBlock(targetEl.parentElement);
                break;

            case DomClassUtils.targetHasClass(targetEl, [this.getClassNameFor('button:tab')]):
                this.switchToTab(targetEl);
                break;
        };

        return this;
    };

    //
    // Form listener
    // Form buttons use event delegation so lets add a listener to the content blocks wrapper for the click.
    // And to the content blocks parent element for dragging.
    //
    // @usage
    // this.formListener();
    //
    formListener() {
        this.contentBlocksWrapperEl.addEventListener('click', this.handleFormClicks.bind(this));

        return this;
    };

    //
    // Render
    //
    // @usage
    // this.render();
    //
    // [1] Add buttons to the form that allow users to add new content blocks.
    // [2] Call the form listener, listening for clicks and drags.
    //
    render() {
        this.addContentButtons(); // [1]
        this.formListener(); // [2]

        return this;
    };
};