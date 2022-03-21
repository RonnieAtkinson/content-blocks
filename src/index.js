// ==========================================================================
// CONTENT BLOCKS
// ==========================================================================
//
// @todo change the data-id to data-index
// @todo default options
// @todo multiple contentBlock parents
// @todo label for attribute
//

import { FormConnect } from './FormConnect/FormConnect';

//
// Content Blocks Class
//
class ContentBlocks {

    //
    // Init 
    // Static method
    //
    // [1]
    // [2]
    // [3]
    //
    static init() {
        const formEl = document.querySelector('form'); // [1]
        const customBlocks = { // [2]
            list: {
                display: 'List',
                formControls: {
                    content: {
                        label: 'Check me',
                        element: {
                            node: 'input',
                            attributes: {
                                type: 'checkbox'
                            }
                        }
                    }
                }
            }
        };

        new FormConnect(formEl, customBlocks, { // [3]
            exclude: {
                defaultBlocks: ['link']
            }
        });
    };
}

//
// Init
//
ContentBlocks.init();