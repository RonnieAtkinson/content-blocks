// ==========================================================================
// CONTENT BLOCKS / FORMCONNECT / #FORM CONNECT
// ==========================================================================

//
// Imports
//
import DomClassUtils from '../utils/DomClass';
import DomElement from '../DomElement/DomElement';
import ContentBlock from '../ContentBlock/ContentBlock';
import DragDrop from '../DragDrop/DragDrop';
import OptionUtils from '../utils/Option';
import FormGroup from '../ContentBlock/FormGroup/FormGroup';

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
// These are the defaults for text content attributes
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
    },
    list: {
        display: 'List',
        icon: 'list',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' }
        },
        variations: {
            unordered: { display: 'Unordered' },
            ordered: { display: 'Ordered' }
        },
        formGroups: {
            variation: {
                ...defaultFormGroups.inputSelect,
                tab: 'content',
                label: 'List type'
            },
            list: {
                tab: 'content',
                label: 'List items',
                dynamic: true,
                attributes: {
                    data: {
                        el: 'input',
                        type: 'text',
                        name: 'list',
                        placeholder: 'List item'
                    }
                }
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
// @usage
// new FormConnect(formEl);
//
// @usage
// contentBlocks is optional
// new FormConnect(formEl, contentBlocks);
//
// @usage
// options is optional
// new FormConnect(formEl, contentBlocks, options);
//
export default class FormConnect {

    //
    // Class constructor
    //
    // @constructs FormConnect
    //
    // @param {HTMLElement} formEl
    // @param {object} contentBlocks
    // @param {object} options
    //
    // @throws
    // Will throw an error if formEl parameter is falsy or its not a form node.
    // Will throw an error if contentBlocks is not an object.
    //
    // [1] If formEl is falsy or its not a form node throw an error.
    // [2] If contentGroups is falsy or its not an object throw an error.
    // [3] Set the formEl parameter to a class field.
    // [4] Define a new contentGroups class field object.
    //     # Spread the default content blocks defined in this file.
    //     # Spread any user defined content blocks defined when instantiating.
    //
    // [5] Define a new options class field object.
    //     # Spread the default options defined in this file.
    //     # Spread any user defined options (defined when instantiating).
    //       - If none are defined use an empty object instead so the spread is still iterable. 
    //     # Duplicate keys from the user defined options will overwrite anything set from default options.
    //     # Allowing you to set custom options when instantiating.
    //
    //     Define a nested 'text' object: options.text
    //     Define a nested 'classes' object: options.classes
    //     Define a nested 'exclude' object: options.exclude
    //
    //     Define a 'defaultBlocks' key: options.exclude.defaultBlocks
    //     # The value of this key is an array of strings.
    //     # Used to delete keys from the defaultContentBlocks defined in this file.
    //     # see this.excludeDefaultBlocks();
    //     # Set the value to a user defined array (defined when instantiating)
    //       - If nothing is defined use an empty array instead 
    //       - When defining this array the strings need to match the default content block keys. eg ['intro', 'link']
    //
    // [6] If any default blocks need excluding call this.excludeDefaultBlocks();
    //
    // [7] Set the content blocks wrapper element to a class field as an HTMLElement.
    // [8] Set the content blocks parent element to a class field as an HTMLElement.
    // [9] Set the content blocks button wrapper element to a class field as an HTMLElement.
    // [10] Set the individial content blocks to a class field as a live node list. 
    // [11] Create a new DragDrop instance.
    // [12] Create a new ContentBlock instance.
    // [13] Call the render method.
    //
    constructor(formEl, contentBlocks = {}, options = {}) {
        if (!formEl || formEl.nodeName != 'FORM') throw new Error('A valid form node is required to connect a form'); // [1]
        if (typeof contentBlocks != 'object') throw new Error(`Content groups must be passed as an object. Currently ${typeof contentGroups}`); // [2]

        // Class fields
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

        // Exclude default content blocks if defined
        if (this.options.exclude.defaultBlocks.length > 0) this.excludeDefaultBlocks(); // [6]

        // DOM references
        this.contentBlocksWrapperEl = this.formEl.querySelector(`.${this.getClassNameFor('block:wrapper')}`); // [7]
        this.contentBlocksParentEl = this.contentBlocksWrapperEl.querySelector(`.${this.getClassNameFor('block:parent')}`); // [8]
        this.contentBlocksButtonWrapperEl = this.contentBlocksWrapperEl.querySelector(`.${this.getClassNameFor('button:wrapper')}`); // [9]
        this.contentBlocksLNL = this.contentBlocksParentEl.getElementsByClassName(this.getClassNameFor('block:single')); // [10]

        // Create a new DragDrop instance
        this.dragDrop = new DragDrop( // [11]
            this.contentBlocksParentEl,
            this.contentBlocksLNL,
            this.options
        );

        // Create a new ContentBlock instance
        this.contentBlock = new ContentBlock( // [12]
            this.contentBlocksLNL.length,
            this.contentBlocksParentEl,
            this.options,
            this.dragDrop
        );

        this.render(); // [13]
    };

    //
    // Exclude default blocks
    //
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
    getClassNameFor(name) {
        return OptionUtils.getClassNamesFor(name, this.options.classes)[0];
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
    getClassNamesFor(name) {
        return OptionUtils.getClassNamesFor(name, this.options.classes);
    };

    //
    // Add content block buttons
    // Adds content block creation buttons
    // These buttons are used to add content blocks to the form
    //
    // @usage
    // this.addContentButtons();
    //
    // [1] For each content block type in this.contentGroups:
    // [2] Destruct icon and display values
    // [3] Create a new button element.
    //     # Set the type to 'button' so they dont submit the form.
    //     # Set the textContent to the destructed display value.
    //     # Set the class list from this.options.
    //     # Add a modifier class for the group type
    //     # Set the data-group attribute to the group name
    //     # Append to the button wrapper
    //     # result will look something like:
    //     <button class="bt-add-group bt-add-group--heading" type="button" data-group="heading">display</button>
    //
    // [4] If an icon value was destructed from the contentGroup:
    // [5] Create a new i element
    //     # Set the class list
    //     # Add a modifier class for the icon name
    //     # Prepend to the button element
    //     # Result will look something like:
    //     <i class="icon icon-intro"></i>
    // 
    addContentButtons() {
        for (const group in this.contentGroups) { // [1]
            const { icon, display } = this.contentGroups[group]; // [2]

            // Create a new button element
            const { el: buttonEl } = new DomElement('button') // [3]
                .addAttributes({
                    type: 'button',
                    textContent: display,
                    classList: [...this.getClassNamesFor('button:addBlock'), `${this.getClassNameFor('button:addBlock')}--${group}`],
                    dataset: { group }
                })
                .appendTo(this.contentBlocksButtonWrapperEl);

            // Add an icon if one was defined
            if (icon) { // [4]
                new DomElement('i') // [5]
                    .addAttributes({
                        classList: [
                            ...this.getClassNamesFor('block:icon'),
                            `${this.getClassNameFor('block:icon')}--${icon}`
                        ]
                    })
                    .prependTo(buttonEl);
            };
        };

        return this;
    };

    //
    // Switch to tab
    // Makes the target tab active
    // Makes all other tabs inactive
    //
    // @param {HTMLElement} targetEl
    //
    // @usage
    // this.switchToTab(targetEl);
    //
    // [1] Get content block we're tabbing within.
    // [2] Get the button wrapper.
    // [3] Get the target tab from the dataset on the button.
    //     # data-target
    //
    // Update all the buttons:
    // [4] Get a node list of all the buttons that are children of the button wrapper.
    // [5] For all the buttons in the node list:
    //     # Remove the active class.
    //     # Set the disabled attribute to false.
    // 
    // Update the target button:
    // [6] Add the active class to the target button.
    // [7] Set the disabled attribute to true.
    //
    // Update content tabs:
    // [8] Remove the active class from all content tabs.
    // [9] Add the active class to the tab we want to show.
    //
    switchToTab(targetEl) {
        const parentContentBlock = targetEl.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        const buttonWrapper = targetEl.parentElement; // [2]
        const targetTab = targetEl.dataset.target; // [3]

        // Update ALL the buttons
        const allButtons = buttonWrapper.querySelectorAll('button'); // [4]
        for (const bt of allButtons) { // [5]
            bt.classList.remove(...this.getClassNamesFor('button:tab:active'));
            bt.disabled = false;
        };

        // Update the target button
        targetEl.classList.add(...this.getClassNamesFor('button:tab:active')); // [6]
        targetEl.disabled = true; // [7]

        // Update classes on the content tabs
        DomClassUtils.removeClassFromChildren(parentContentBlock, this.getClassNameFor('block:tab'), this.getClassNameFor('block:tab:active')); // [8]
        parentContentBlock.querySelector(`.${targetTab}`).classList.add(this.getClassNameFor('block:tab:active')); // [9]

        return this;
    };

    //
    // Handle form clicks
    // Event delegation for the form buttons
    //
    // @param {DOM click event} event
    //
    // @throws
    // Throws an error if theres no data-el on the form group of a dynamic button.
    //
    // @usage
    // this.handleFormClicks();
    //
    // [1] Get the event target.
    // [2] Make sure the event target is a button and the type attribute is 'button' and not anything else like 'submit'.
    //     # If the event target is not a button, return we dont want to do anything.
    // [3] Define some variables that we can access from block scopes.
    //
    // [4] If the event target is a dynamic add or remove button:
    //     # We need some more information before continuing:
    //       - A list of all the input fields the button controls
    //       - The type of input field the button controls
    //
    //     # Set elType to the value of data-el on the ancestor form:group.
    //     # If theres no data-el on the ancestor throw an error.
    //     # Set allInputs to a live node list of event target siblings that are the same type set in data-el above.
    //
    // [5] Switch board for the event target classlist
    // [6] If the click target is a dynamic add button
    //     # Add a dynamic element
    // [7] If the click target is a dynamic remove button
    //     # Remove an element
    // [8] If the click target is an add block button
    //     # Add a block
    // [9] If the click target is a remove block button
    //     # Remove a block
    // [10] If the click target is a tab button
    //     # Switch to that tab
    //
    handleFormClicks(event) {
        const targetEl = event.target; // [1]
        if (targetEl.nodeName != 'BUTTON' || targetEl.type !== 'button') return; // [2]

        let allInputs, elType; // [3]

        // If the target is a dynamic add or remove button
        if (DomClassUtils.targetHasClass(targetEl, [this.getClassNameFor('button:addDynamic'), this.getClassNameFor('button:removeDynamic')])) { // [4]
            elType = targetEl.closest(`.${this.getClassNameFor('form:group')}`).dataset.el;
            if (!elType) throw new Error('No data-el on the parent element');
            allInputs = targetEl.parentElement.getElementsByTagName(elType);
        };

        // Switch board for the event target classlist
        switch (targetEl.classList) { // [5]
            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:addDynamic')]): // [6]
                FormGroup.addDynamicElement(targetEl, elType, allInputs, {
                    'block:single': this.getClassNameFor('block:single'),
                    'form:group': this.getClassNameFor('form:group'),
                    'form:control': this.getClassNamesFor('form:control')
                });
                break;

            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:removeDynamic')]): // [7]
                FormGroup.removeDynamicElement(targetEl, allInputs);
                break;

            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:addBlock')]): // [8]
                this.contentBlock.add(targetEl.dataset.group, this.contentGroups[targetEl.dataset.group]);
                break;

            case DomClassUtils.targetHasClass(targetEl, [...this.getClassNamesFor('button:removeBlock')]): // [9]
                this.contentBlock.remove(targetEl.parentElement, this.contentBlocksLNL);
                break;

            case DomClassUtils.targetHasClass(targetEl, [this.getClassNameFor('button:tab')]): // [10]
                this.switchToTab(targetEl);
                break;
        };

        return this;
    };

    //
    // Form listener
    // Form buttons use event delegation so lets add a listener to the content blocks wrapper for the click.
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
    // [1] Add buttons to the form so users can add new content blocks.
    // [2] Call the form listener, listening for clicks.
    //
    render() {
        this.addContentButtons(); // [1]
        this.formListener(); // [2]

        return this;
    };
};