// ==========================================================================
// CONTENT BLOCKS / FORMCONNECT / FORMCONNECT
// ==========================================================================

//
// Imports
//
import DomClassUtils from '../utils/DomClass';
import CheckValue from '../utils/CheckValue';
import DomElement from '../DomElement/DomElement';

//
// Default classes
//
const defaultClasses = {
    'block:wrapper': 'content-blocks-wrapper',
    'block:parent': 'content-blocks',
    'block:single': 'content-blocks__single',
    'form:control': 'form-control',
    'content:tab': 'content-tab',
    'content:active': 'active',
    'button:wrapper': 'content-blocks-buttons',
    'button:addBlock': 'bt-add-group',
    'button:removeBlock': 'bt-remove-group',
    'button:addDynamic': 'bt-add',
    'button:removeDynamic': 'bt-remove',
    'button:tab': 'bt-tab',
    'button:tab:active': 'active',
    'button:tab:wrapper': 'tabbing-buttons',
    'button:toggleDrag': 'bt-toggle-draggable',
    'button:toggleDrag:active': 'active',
    'drag:droppable': 'droppable',
    'drag:draggable': 'draggable'
};

//
// Default text
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
const defaultOptions = {
    initialDragState: false,
};

//
// Default form controls
//
const defaultFormControls = {
    classes: {
        tab: 'classes',
        label: 'Classes',
        dynamic: true,
        attributes: {
            data: {
                el: 'input',
                type: 'text',
                name: 'class'
            }
        }
    }
};

//
// Default content blocks
//
const defaultContentBlocks = {
    intro: {
        display: 'Introduction',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        formControls: {
            content: {
                tab: 'content',
                label: 'Content',
                element: {
                    node: 'textarea',
                    attributes: {}
                }
            },
            classes: {
                ...defaultFormControls.classes
            }
        }
    },
    link: {
        display: 'Link',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' }
        },
        variations: {
            internal: { display: 'Internal' },
            external: { display: 'External' }
        },
        formControls: {
            variation: {
                tab: 'content',
                label: 'variation',
                element: {
                    node: 'select'
                }
            },
            linkText: {
                tab: 'content',
                label: 'Link Text',
                element: {
                    node: 'input',
                    attributes: {
                        type: 'text',
                        placeholder: 'test'
                    }
                }
            },
            linkUrl: {
                tab: 'content',
                label: 'Link URL',
                element: {
                    node: 'input',
                    attributes: {
                        type: 'text'
                    }
                }
            },
            classes: {
                ...defaultFormControls.classes
            }
        }
    },
    paragraph: {
        display: 'Paragraph',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        formControls: {
            content: {
                tab: 'content',
                label: 'Content',
                element: {
                    node: 'textarea',
                    attributes: {}
                }
            },
            classes: {
                ...defaultFormControls.classes
            }
        }
    },
    heading: {
        display: 'Heading',
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
        formControls: {
            variation: {
                tab: 'content',
                label: 'variation',
                element: {
                    node: 'select',
                    attributes: {}
                }
            },
            content: {
                tab: 'content',
                label: 'Content',
                element: {
                    node: 'input',
                    attributes: {
                        type: 'text'
                    }
                }
            },
            classes: {
                ...defaultFormControls.classes
            }
        }
    },
    infoBox: {
        display: 'Information Box',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        variations: {
            positive: { display: 'Positive' },
            negative: { display: 'Negative' },
            neutral: { display: 'Neutral' }
        },
        formControls: {
            variation: {
                tab: 'content',
                label: 'variation',
                element: {
                    node: 'select',
                    attributes: {}
                }
            },
            title: {
                tab: 'content',
                label: 'Title',
                element: {
                    node: 'input',
                    attributes: {
                        type: 'text'
                    }
                }
            },
            paragraph: {
                tab: 'content',
                label: 'Paragraph',
                dynamic: true,
                attributes: {
                    data: {
                        el: 'textarea',
                        name: 'content'
                    }
                }
            },
            classes: {
                ...defaultFormControls.classes
            }
        }
    },
    code: {
        display: 'Code Block',
        tabs: {
            content: { display: 'Content', active: true },
            classes: { display: 'Classes' },
        },
        variations: {
            html: { display: 'HTML' },
            javascript: { display: 'Javascript' }
        },
        formControls: {
            variation: {
                tab: 'content',
                label: 'Language',
                element: {
                    node: 'select',
                    attributes: {}
                }
            },
            content: {
                tab: 'content',
                label: 'Content',
                element: {
                    node: 'textarea',
                    attributes: {}
                }
            },
            classes: {
                ...defaultFormControls.classes
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
        this.toggleDragEl = this.contentBlocksParentEl.querySelector(`.${this.getClassNameFor('button:toggleDrag')}`); // [12]
        this.contentBlocksLNL = this.contentBlocksParentEl.getElementsByClassName(this.getClassNameFor('block:single')); // [13]
        this.dragState = this.options.initialDragState; // [14]
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
        return this.getClassNamesFor(name)[0]; // [1]
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
    // [2]
    // [3]
    // [4]
    //
    getClassNamesFor(name) {
        const classNames = this.options.classes[name]; // [1]

        if (Array.isArray(classNames)) {
            return classNames; // [2]

        } else if (typeof classNames == 'string') {
            return [classNames]; // [3]

        } else {
            return []; // [4]
        };
    };

    //
    // Generate name
    // Generates a name for an HTMLElement
    // @returns {string}
    //
    // @param {number} index
    // @param {string} key
    // @param {boolean} isNested
    //
    // @throws 
    // Will throw an error if either the index or key parameter is falsy.
    //
    // @usage 
    // this.generateName(index, key, isNested);
    //
    // @example
    // Not nested
    // this.generateName(1, 'variation');
    // Returns 'postContent[a1][variation]';
    //
    // @example
    // Not nested
    // this.generateName(2, 'id', false);
    // Returns 'postContent[a2][id]'
    //
    // @example
    // Nested
    // this.generateName(3, 'class', true);
    // Returns 'postContent[a3][class][]'
    //
    // [1] If index or key are falsy throw an error.
    // [2] Assign the generated name to a constant.
    // [3] If isNested is true return the generated name with '[]' appended.
    //     # example: postContent[a1][name][];
    //     - fields with nested names like this will be passed as an object like so:
    //     - { name: ['value1', 'value2'] }
    //
    //     Otherwise just return the generated name as is.
    //     # example: postContent[a1][name];
    //     - fields that are not nested will be passed as key value pairs like so:
    //     - { name: 'value1' }
    //
    generateName(index, key, isNested) {
        if (!index || !key) throw new Error('An index and key are required to generate a name'); // [1]
        const generatedName = `postContent[a${index}][${key}]`; // [2]
        return (isNested === true) ? generatedName + '[]' : generatedName; // [3]
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
        const { name: inputName, type: inputType } = targetEl.closest(`.${this.getClassNameFor('form:control')}`).dataset; // [2]
        const params = { name: this.generateName(contentIndex, inputName, true) }; // [3]
        if (inputType) params.type = inputType; // [4]

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
            new DomElement('button')
                .addAttributes({ // [2]
                    type: 'button', // [3]
                    textContent: this.contentGroups[group].display, // [4]
                    classList: [...this.getClassNamesFor('button:addBlock'), `${this.getClassNameFor('button:addBlock')}--${group}`], // [5]
                    dataset: { group } // [6]
                })
                .appendTo(this.contentBlocksButtonWrapperEl); // [7]
        };
    };

    //
    // Add tabbing buttons
    //
    // @todo comments
    //
    addTabButtons(tabs, targetEl) {
        const { el: buttonWrapperEl } = new DomElement('div')
            .addAttributes({
                classList: [...this.getClassNamesFor('button:tab:wrapper')]
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
                        target: (`${this.getClassNameFor('content:tab')}--${contentTab}`)
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
                        ...this.getClassNamesFor('content:tab'),
                        `${this.getClassNameFor('content:tab')}--${tabContainer}`,
                    ]
                })
                .appendTo(targetEl);

            if (tabs[tabContainer].active) {
                tabContainerEl.classList.add(this.getClassNamesFor('content:active'));
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
    addContentBlockFormControls(parentNodes, formControls, variations, index) {
        if (typeof formControls != 'object' || !Object.keys(formControls).length) throw new Error('No form controls were passed'); // [1]

        for (const formControl in formControls) { // [2]

            const tabName = formControls[formControl].tab;
            const parentEl = (Object.keys(parentNodes).length > 0) ? parentNodes[tabName] : parentNodes;

            if (CheckValue.isNullUndefindedEmpty(parentEl)) throw new Error(`${formControls[formControl].label} has been assigned to a tab that hasn't been defined`);

            const hasNode = !!((formControls[formControl].element || {}).node); // [3]
            const hasVariations = formControl === 'variation' && !!(Object.keys(variations || {}).length) && hasNode; // [4]
            const isDynamic = !!((formControls[formControl] || {}).dynamic); // [5]
            const elType = (isDynamic) ? 'fieldset' : 'div'; // [6]

            const { el: formControlEl } = new DomElement(elType) // [7]
                .addAttributes({
                    classList: [
                        ...this.getClassNamesFor('form:control'),
                        `${this.getClassNameFor('form:control')}--${formControl}`
                    ],
                    dataset: ((formControls[formControl].attributes || {}).data)
                })
                .appendTo(parentEl);

            let thisNode; // [8]

            if (isDynamic) { // [9]
                new DomElement('legend').addAttributes({ textContent: (formControls[formControl] || {}).label }).appendTo(formControlEl);
                this.addDynamicButtonsTo(formControlEl);
                continue;

            } else {
                new DomElement('label')
                    .addAttributes({
                        textContent: ((formControls[formControl] || {}).label),
                        htmlFor: 'test' // @todo
                    })
                    .appendTo(formControlEl);
            };

            if (hasNode) { // [10]
                ({ el: thisNode } = new DomElement(formControls[formControl].element.node)
                    .addAttributes({
                        ...formControls[formControl].element.attributes || {},
                        name: this.generateName(index, formControl)
                    })
                    .appendTo(formControlEl)
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
    addContentBlock(contentType) {
        if (!contentType) throw new Error('No content type provided for this block'); // [1]
        const { display, formControls, variations, tabs } = (this.contentGroups[contentType] || {}); // [2]
        if (!display || !formControls) throw new Error(`Invalid options provided for the ${contentType} content block`); // [3]
        const index = this.contentBlocksLNL.length + 1; // [4]

        const hasTabs = !!(tabs);

        // Fieldset wrapper
        const { el: blockSingleEl } = new DomElement('fieldset') // [5]
            .addAttributes({
                classList: [...this.getClassNamesFor('block:single'), `${this.getClassNameFor('block:single')}--${contentType}`],
                dataset: {
                    id: index
                }
            });

        // Add conditional attributes
        if (this.dragState) {
            blockSingleEl.classList.add(...this.getClassNamesFor('drag:draggable'));
            blockSingleEl.draggable = true;
        };

        // Block legend
        new DomElement('legend') // [6]
            .addAttributes({ textContent: display })
            .appendTo(blockSingleEl);

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
                value: contentType,
                name: this.generateName(index, 'type')
            })
            .appendTo(blockSingleEl);

        // Content tabs
        const contentTabs = (hasTabs) ? this.addTabContainers(tabs, blockSingleEl) : blockSingleEl;

        // Form controls
        this.addContentBlockFormControls(contentTabs, formControls, variations, index); // [13]

        // Render to dom
        this.contentBlocksParentEl.appendChild(blockSingleEl); // [14]

        if (this.isDragAllowed()) this.toggleDragEl.disabled = false; // [15] extract this?
    };

    //
    // Update index in names
    // Updates the index in the name attributes
    //
    // @param {HTMLElement} wrapperEl
    // @param {number} newIndex
    //
    // @usage
    // this.updateIndexInNames(wrapperEl, newIndex);
    //
    // @example
    // this.updateIndexInNames(typeWrapperEl, 3);
    // returns postContent[a3][type]
    //
    // @example
    // this.updateIndexInNames(contentWrapperEl, 7);
    // returns postContent[a7][content]
    //
    // [1] Get all the nodes with where the name starts with postContent
    // [2] For each node found:
    // [3] Replace the number in the string with the newIndex provided in the parameters
    //
    updateIndexInNames(wrapperEl, newIndex) {
        const childElements = wrapperEl.querySelectorAll('[name^="postContent"]'); // [1]
        for (const childEl of childElements) { // [2]
            childEl.name = childEl.name.replace(/(\d+)+/g, (match, index) => index = newIndex); // [3]
        };
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
            this.updateIndexInNames(contentBlock, newIndex); // [4]
            newIndex++; // [5]
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
        this.updateWrapperIndexes(); // [3]
        if (!this.isDragAllowed()) this.disableDrag(); // [4]
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
    //     Any blocks added in the future will set their draggable attribute from this field.
    // [2] Disable the drag toggle button
    // [3] Uncheck the drag toggle
    // [4] Remove the active class from the drag toggle button
    // [5] For each content block in the content block live node list: 
    //     # Set their draggable attribute to false.
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
    //     # Currently passing data-id.
    // [4] Specify the effect that is allowed for the drag operation
    //     # move - An item may be moved to a new location
    //
    handleDragStart(event) {
        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        if (!targetEl.draggable) return; // [2]

        event.dataTransfer.setData('text/plain', targetEl.dataset.id); // [3]
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

        this.updateWrapperIndexes(); // [3]
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
    // [5] Call preventDefault() to prevent additional event processing for this event
    //     # Such as touch events or pointer events
    //
    handleDragEnter(event) {
        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        if (!targetEl) return; // [2]
        if (event.dataTransfer.types[0] === 'text/plain') { // [3]
            targetEl.classList.add(this.getClassNameFor('drag:droppable'));
            event.preventDefault(); // [5]
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
    //     # The data set was the data-id
    // [3] Set newNode to the element with the data-id from [2]
    //     # This is the node we want to move.
    // [4] If targetEl or targetEl.parentElement are falsy return.
    // [5] Insert the new node before targetEl.
    // [6] Remove the drag:droppable class from targetEl
    //
    handleDragDrop(event) {
        const targetEl = event.target.closest(`.${this.getClassNameFor('block:single')}`); // [1]
        const data = event.dataTransfer.getData('text/plain'); // [2]
        const newNode = document.querySelector(`[data-id='${data}']`); // [3]

        if (!targetEl || !targetEl.parentElement) return; // [4]

        event.preventDefault();

        targetEl.parentElement.insertBefore(newNode, targetEl); // [5]
        targetEl.classList.remove(this.getClassNameFor('drag:droppable')); // [6]
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
        DomClassUtils.removeClassFromChildren(parentContentBlock, this.getClassNameFor('content:tab'), this.getClassNameFor('content:active'));
        parentContentBlock.querySelector(`.${targetTab}`).classList.add(this.getClassNameFor('content:active'));
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
    //     # Set elType to the value of data-el on the ancestor form:control.
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
            elType = targetEl.closest(`.${this.getClassNameFor('form:control')}`).dataset.el;
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
                this.addContentBlock(targetEl.dataset.group); // data-group
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
        this.contentBlocksParentEl.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.contentBlocksParentEl.addEventListener('dragend', this.handleDragEnd.bind(this));
        this.contentBlocksParentEl.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.contentBlocksParentEl.addEventListener('dragover', this.handleDragOver.bind(this));
        this.contentBlocksParentEl.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.contentBlocksParentEl.addEventListener('drop', this.handleDragDrop.bind(this));
        this.toggleDragEl.addEventListener('change', this.handleDragToggle.bind(this));

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