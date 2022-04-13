// ==========================================================================
// CONTENT BLOCKS / UTILS / #DOM DATA
// ==========================================================================

//
// Imports
//
import DomNameUtils from "./DomName";

//
// Dom data utils class
// Utility class
//
export default class DomDataUtils {

    //
    // Update wrapper indexes
    // Updates the data-index on content group fieldsets
    // Updates the child postContent names
    //
    // @param {live node list} nodeList
    //
    // @usage
    // this.updateWrapperIndexes();
    //
    // [1] Start the index at 1
    // [2] For each content block in the node list:
    // [3] Set data-index to the index [1]
    // [4] Call this.updatedIndexInNames() to update the index in child name attributes.
    // [5] Increment the index by 1 each iteration.
    //
    static updateWrapperIndexes(nodeList) {
        let newIndex = 1; // [1]
        for (const node of nodeList) { // [2]
            node.dataset.index = newIndex; // [3]
            DomNameUtils.updateIndexInNames(node, newIndex);
            newIndex++; // [5]
        };
    };

};