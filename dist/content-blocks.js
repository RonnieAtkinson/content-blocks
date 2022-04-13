!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ContentBlocks",[],e):"object"==typeof exports?exports.ContentBlocks=e():t.ContentBlocks=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function n(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){l=!0,s=t},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw s}}}}function r(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.d(e,{FormConnect:()=>lt});var s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,s;return e=t,s=[{key:"removeClassFromChildren",value:function(t,e,r){if(!t||!e)throw new Error("To remove classes from children a required parameter is missing");var a,o=n(t.getElementsByClassName(e));try{for(o.s();!(a=o.n()).done;)a.value.classList.remove(r||e)}catch(t){o.e(t)}finally{o.f()}}},{key:"targetHasClass",value:function(t,e){if(!t||!e)throw new Error("To check if a target has a class a required parameter is missing");if(e.some((function(e){return t.classList.contains(e)})))return t.classList}},{key:"toggleClassesOnNodeList",value:function(t,e){if(!e||!t)throw new Error("To add a class to a node list a required paramater is missing");var r,a=n(e);try{var o=function(){var e=r.value;t.map((function(t){return e.classList.toggle(t)}))};for(a.s();!(r=a.n()).done;)o()}catch(t){a.e(t)}finally{a.f()}}},{key:"removeClassesFromNodeList",value:function(t,e){if(!e||!t)throw new Error("To remove a class from a node list a required paramater is missing");var o,s,i=n(e);try{for(i.s();!(o=i.n()).done;){var l;(l=o.value.classList).remove.apply(l,function(t){if(Array.isArray(t))return a(t)}(s=t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(s)||r(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}}catch(t){i.e(t)}finally{i.f()}}}],null&&o(e.prototype,null),s&&o(e,s),Object.defineProperty(e,"prototype",{writable:!1}),t}();function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n;return e=t,n=[{key:"isNullUndefinedEmpty",value:function(t){return null==t||""===t}}],null&&i(e.prototype,null),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d=function(){function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!e)throw new Error("The kind of element you want to create is required as the first parameter");this.el=document.createElement(e)}var e,n;return e=t,(n=[{key:"addAttributes",value:function(t){if(!t)throw new Error("No attributes were provided");if("object"!=c(t))throw new Error("Attributes need to be passed as an object, eg: { name: 'foo', id: 'bar' }");for(var e in t)if(!l.isNullUndefinedEmpty(t[e]))if("object"==c(t[e])){for(var n in t[e])if(!l.isNullUndefinedEmpty(t[e][n]))if("classList"===e)this.el[e].add(t[e][n]);else{if("dataset"!==e)throw new Error("An object was provided as the value of '".concat(e,"'. Objects can only be used with 'classList' or 'dataset'."));this.el[e][n]=t[e][n]}}else this.el[e]=t[e];return this}},{key:"appendTo",value:function(t){return t.appendChild(this.el),this}},{key:"prependTo",value:function(t){return t.prepend(this.el),this}},{key:"insertBeforeEl",value:function(t){return t.parentElement.insertBefore(this.el,t),this}}])&&u(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var b=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n;return e=t,n=[{key:"generateName",value:function(t,e,n){if(!t||!e)throw new Error("An index and key are required to generate a name");var r="postContent[a".concat(t,"][").concat(e,"]");return!0===n?r+"[]":r}},{key:"updateIndexInNames",value:function(t,e){var n,r=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){i=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw o}}}}(t.querySelectorAll('[name^="postContent"]'));try{for(r.s();!(n=r.n()).done;){var a=n.value;a.name=a.name.replace(/(\d+)+/g,(function(t,n){return e}))}}catch(t){r.e(t)}finally{r.f()}}}],null&&p(e.prototype,null),n&&p(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var h=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n;return e=t,n=[{key:"updateWrapperIndexes",value:function(t){var e,n=1,r=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){i=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw o}}}}(t);try{for(r.s();!(e=r.n()).done;){var a=e.value;a.dataset.index=n,b.updateIndexInNames(a,n),n++}}catch(t){r.e(t)}finally{r.f()}}}],null&&m(e.prototype,null),n&&m(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var v=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n;return e=t,n=[{key:"getClassNamesFor",value:function(t,e){var n=e[t];return Array.isArray(n)?n:"string"==typeof n?[n]:[]}}],null&&g(e.prototype,null),n&&g(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function k(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?k(Object(n),!0).forEach((function(e){C(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function C(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function N(t){return function(t){if(Array.isArray(t))return E(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return E(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var j="add",L="remove",F=function(){function t(e,n,r,a){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.parentNodes=e,this.variations=n,this.index=r,this.options=a}var e,n,r;return e=t,r=[{key:"toggleDynamicRemoveButton",value:function(t,e,n){if(!t||l.isNullUndefinedEmpty(e))throw new Error("To toggle the remove button a required parameter is missing");if(![j,L].includes(n))throw new Error("To toggle the remove button the action parmeter needs to be 'add' or 'remove'. ".concat(n," was provided."));var r=0===e;n===j&&e>1||n===L&&!r||(t.disabled=r)}},{key:"addDynamicElement",value:function(e,n,r,a){var o=e.closest(".".concat(a["block:single"])).dataset.index,s=e.closest(".".concat(a["form:group"])).dataset,i=s.name,l=s.type,c=s.placeholder,u={name:b.generateName(o,i,!0),classList:N(a["form:control"])};return l&&(u.type=l),c&&(u.placeholder=c),new d(n).addAttributes(u).insertBeforeEl(e),t.toggleDynamicRemoveButton(e.nextElementSibling,r.length,j),this}},{key:"removeDynamicElement",value:function(e,n){var r=n.length;0!==r&&(n[r-1].parentElement.removeChild(n[r-1]),t.toggleDynamicRemoveButton(e,n.length,j))}}],(n=[{key:"getClassNameFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)[0]}},{key:"getClassNamesFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)}},{key:"addDynamicButtonsTo",value:function(t){return new d("button").addAttributes({type:"button",textContent:this.options.text["button:addDynamic"],classList:N(this.getClassNamesFor("button:addDynamic"))}).appendTo(t),new d("button").addAttributes({type:"button",textContent:this.options.text["button:removeDynamic"],classList:N(this.getClassNamesFor("button:removeDynamic")),disabled:!0}).appendTo(t),this}},{key:"add",value:function(t,e){var n=e.tab,r=Object.keys(this.parentNodes).length>0?this.parentNodes[n]:this.parentNodes;if(l.isNullUndefinedEmpty(r))throw new Error("".concat(e.label," has been assigned to a tab that hasn't been defined"));var a,o=!!(e.element||{}).node,s="variation"===t&&!!Object.keys(this.variations||{}).length&&o,i=!!(e||{}).dynamic,c=new d(i?"fieldset":"div").addAttributes({classList:[].concat(N(this.getClassNamesFor("form:group")),["".concat(this.getClassNameFor("form:group"),"--").concat(t)],N((e.attributes||{}).classList||[])),dataset:(e.attributes||{}).data}).appendTo(r).el;if(i)return new d("legend").addAttributes({textContent:(e||{}).label}).appendTo(c),void this.addDynamicButtonsTo(c);if(o){var u=new d("label").addAttributes({textContent:(e||{}).label}).appendTo(c).el;a=new d(e.element.node).addAttributes(w(w({},e.element.attributes||{}),{},{name:b.generateName(this.index,t),classList:[].concat(N(this.getClassNamesFor("form:control")),N((e.element.attributes||{}).classList||[]))})).appendTo(u).el}if(s)for(var f in this.variations)new d("option").addAttributes({value:f,textContent:this.variations[f].display}).appendTo(a)}}])&&O(e.prototype,n),r&&O(e,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function D(t){return function(t){if(Array.isArray(t))return A(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return A(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function S(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var T=function(){function t(e,n,r,a){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.index=e+1,this.contentBlocksParentEl=n,this.options=r,this.dragDrop=a}var e,n;return e=t,(n=[{key:"getClassNameFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)[0]}},{key:"getClassNamesFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)}},{key:"addTabButtons",value:function(t,e){var n=new d("div").addAttributes({classList:D(this.getClassNamesFor("block:nav"))}).appendTo(e).el;for(var r in t){var a=new d("button").addAttributes({type:"button",textContent:t[r].display||this.options.text["button:tab:default"],classList:[].concat(D(this.getClassNamesFor("button:tab")),["".concat(this.getClassNameFor("button:tab"),"--").concat(r)]),dataset:{target:"".concat(this.getClassNameFor("block:tab"),"--").concat(r)}}).appendTo(n).el;t[r].active&&(a.disabled=!0,a.classList.add(this.getClassNameFor("button:tab:active")))}}},{key:"addTabContainers",value:function(t,e){var n={};for(var r in t){var a=new d("div").addAttributes({classList:[].concat(D(this.getClassNamesFor("block:tab")),["".concat(this.getClassNameFor("block:tab"),"--").concat(r)])}).appendTo(e).el;t[r].active&&a.classList.add(this.getClassNamesFor("block:tab:active")),n[r]=a}return n}},{key:"addBlockWrapper",value:function(t){var e,n=new d("fieldset").addAttributes({classList:[].concat(D(this.getClassNamesFor("block:single")),["".concat(this.getClassNameFor("block:single"),"--").concat(t)]),dataset:{index:this.index}}).el;return this.dragDrop.dragState&&((e=n.classList).add.apply(e,D(this.getClassNamesFor("drag:draggable"))),n.draggable=!0),n}},{key:"addBlockTitleTo",value:function(t,e){var n=e.display,r=e.icon,a=new d("legend").addAttributes({textContent:n,classList:this.getClassNamesFor("block:title")}).appendTo(t).el;return r&&new d("i").addAttributes({classList:[].concat(D(this.getClassNamesFor("block:icon")),["".concat(this.getClassNameFor("block:icon"),"--").concat(r)])}).prependTo(a),this}},{key:"add",value:function(t,e){if(!t)throw new Error("No content type provided for this block");var n=e||{},r=n.display,a=n.icon,o=n.formGroups,s=n.variations,i=n.tabs;if(!r||!o)throw new Error("Invalid options provided for the ".concat(t," content block"));if("object"!=B(o)||!Object.keys(o).length)throw new Error("No form controls were passed");var l=!!i,c=this.addBlockWrapper(t);this.addBlockTitleTo(c,{display:r,icon:a}),new d("button").addAttributes({type:"button",textContent:this.options.text["button:removeBlock"],classList:this.getClassNamesFor("button:removeBlock")}).appendTo(c),l&&this.addTabButtons(i,c),new d("input").addAttributes({type:"hidden",value:t,name:b.generateName(this.index,"type")}).appendTo(c);var u=l?this.addTabContainers(i,c):c,f=new F(u,s,this.index,this.options);for(var p in o)f.add(p,o[p]);this.contentBlocksParentEl.appendChild(c),this.dragDrop.isDragAllowed()&&(this.dragDrop.toggleDragEl.disabled=!1)}},{key:"remove",value:function(t,e){t&&(t.remove(),h.updateWrapperIndexes(e),this.dragDrop.isDragAllowed()||this.dragDrop.disableDrag())}}])&&S(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function x(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return P(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?P(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){i=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw o}}}}function P(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function I(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function U(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?I(Object(n),!0).forEach((function(e){q(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function G(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function H(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var W={initialDragState:!1},M=function(){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};G(this,t),this.contentBlocksParentEl=e,this.contentBlocksLNL=n,this.options=U(U({},W),r),this.dragState=this.options.initialDragState,this.toggleDragEl=this.contentBlocksParentEl.querySelector(".".concat(this.getClassNameFor("button:toggleDrag"))),this.dragListeners()}var e,n;return e=t,(n=[{key:"getClassNameFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)[0]}},{key:"getClassNamesFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)}},{key:"isDragAllowed",value:function(){return this.contentBlocksLNL.length>1}},{key:"disableDrag",value:function(){this.dragState=!1,this.toggleDragEl.disabled=!0,this.toggleDragEl.checked=!1,this.toggleDragEl.classList.remove(this.getClassNameFor("button:toggleDrag:active")),s.removeClassesFromNodeList(this.getClassNamesFor("drag:draggable"),this.contentBlocksLNL);var t,e=x(this.contentBlocksLNL);try{for(e.s();!(t=e.n()).done;)t.value.draggable=!1}catch(t){e.e(t)}finally{e.f()}}},{key:"handleDragToggle",value:function(t){if(this.isDragAllowed()){this.toggleDragEl.classList.toggle(this.getClassNameFor("button:toggleDrag:active")),s.toggleClassesOnNodeList(this.getClassNamesFor("drag:draggable"),this.contentBlocksLNL),this.dragState=!this.contentBlocksLNL[0].draggable;var e,n=x(this.contentBlocksLNL);try{for(n.s();!(e=n.n()).done;)e.value.draggable=this.dragState}catch(t){n.e(t)}finally{n.f()}}}},{key:"handleDragStart",value:function(t){var e=t.target.closest(".".concat(this.getClassNameFor("block:single")));e.draggable&&(t.dataTransfer.setData("text/plain",e.dataset.index),t.dataTransfer.effectAllowed="move")}},{key:"handleDragEnd",value:function(t){"none"===t.dataTransfer.dropEffect&&s.removeClassFromChildren(this.contentBlocksParentEl,this.getClassNameFor("drag:droppable")),h.updateWrapperIndexes(this.contentBlocksLNL)}},{key:"handleDragEnter",value:function(t){var e=t.target.closest(".".concat(this.getClassNameFor("block:single")));e&&"text/plain"===t.dataTransfer.types[0]&&(e.classList.add(this.getClassNameFor("drag:droppable")),t.preventDefault())}},{key:"handleDragOver",value:function(t){"text/plain"===t.dataTransfer.types[0]&&t.preventDefault()}},{key:"handleDragLeave",value:function(t){var e=t.target.closest(".".concat(this.getClassNameFor("block:single")));e&&t.relatedTarget&&t.relatedTarget.closest(".".concat(this.getClassNameFor("block:single")))!==e&&s.removeClassFromChildren(this.contentBlocksParentEl,this.getClassNameFor("drag:droppable"))}},{key:"handleDragDrop",value:function(t){t.preventDefault();var e=t.target.closest(".".concat(this.getClassNameFor("block:single"))),n=t.dataTransfer.getData("text/plain"),r=document.querySelector("[data-index='".concat(n,"']"));e&&e.parentElement&&(e.parentElement.insertBefore(r,e),e.classList.remove(this.getClassNameFor("drag:droppable")))}},{key:"dragListeners",value:function(){return this.contentBlocksParentEl.addEventListener("dragstart",this.handleDragStart.bind(this)),this.contentBlocksParentEl.addEventListener("dragend",this.handleDragEnd.bind(this)),this.contentBlocksParentEl.addEventListener("dragenter",this.handleDragEnter.bind(this)),this.contentBlocksParentEl.addEventListener("dragover",this.handleDragOver.bind(this)),this.contentBlocksParentEl.addEventListener("dragleave",this.handleDragLeave.bind(this)),this.contentBlocksParentEl.addEventListener("drop",this.handleDragDrop.bind(this)),this.toggleDragEl.addEventListener("change",this.handleDragToggle.bind(this)),this}}])&&H(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function R(t){return function(t){if(Array.isArray(t))return J(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||_(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){i=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw o}}}}function _(t,e){if(t){if("string"==typeof t)return J(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(t,e):void 0}}function J(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function V(t){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(t)}function z(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function K(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Q(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function X(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Q(Object(n),!0).forEach((function(e){Y(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function Y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Z={"block:wrapper":"content-blocks-wrapper","block:parent":"content-blocks","block:single":"content-block","block:title":"content-block__title","block:nav":"content-block__nav","block:tab":"content-block__tab","block:tab:active":"active","block:icon":"icon","form:group":"form-group","form:control":"form-control","button:wrapper":"content-blocks-buttons","button:addBlock":"bt-add-group","button:removeBlock":"bt-remove-group","button:addDynamic":"bt-add","button:removeDynamic":"bt-remove","button:tab":"bt-tab","button:tab:active":"active","button:toggleDrag":"bt-toggle-draggable","button:toggleDrag:active":"active","drag:droppable":"droppable","drag:draggable":"draggable"},tt={"button:removeBlock":"Remove","button:addDynamic":"Add","button:removeDynamic":"Remove","button:tab:default":"Content"},et={},nt={tab:"classes",label:"Classes",dynamic:!0,attributes:{data:{el:"input",type:"text",name:"class",placeholder:"Class name"}}},rt={label:"Paragraph",dynamic:!0,attributes:{data:{el:"textarea",name:"content"}}},at={label:"Content",element:{node:"textarea"}},ot={label:"Content",element:{node:"input",attributes:{type:"text"}}},st={label:"Variation",element:{node:"select"}},it={intro:{display:"Introduction",icon:"intro",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},formGroups:{content:X(X({},at),{},{tab:"content"}),classes:X({},nt)}},link:{display:"Link",icon:"link",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},variations:{internal:{display:"Internal"},external:{display:"External"}},formGroups:{variation:X(X({},st),{},{tab:"content"}),linkText:X(X({},ot),{},{tab:"content",label:"Link Text",element:X(X({},ot.element),{},{attributes:X(X({},ot.element.attributes),{},{placeholder:"Link text label"})})}),linkUrl:X(X({},ot),{},{tab:"content",label:"Link URL",element:X(X({},ot.element),{},{attributes:X(X({},ot.element.attributes),{},{placeholder:"Link URL"})})}),classes:X({},nt)}},paragraph:{display:"Paragraph",icon:"paragraph",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},formGroups:{paragraph:X(X({},rt),{},{label:"Content",tab:"content"}),classes:X({},nt)}},heading:{display:"Heading",icon:"heading",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},variations:{h2:{display:"H2"},h3:{display:"H3"},h4:{display:"H4"},h5:{display:"H5"},h6:{display:"H6"}},formGroups:{variation:X(X({},st),{},{tab:"content"}),content:X(X({},ot),{},{tab:"content",element:X(X({},ot.element),{},{attributes:X(X({},ot.element.attributes),{},{placeholder:"Heading text"})})}),classes:X({},nt)}},infoBox:{display:"Information Box",icon:"info",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},variations:{positive:{display:"Positive"},negative:{display:"Negative"},neutral:{display:"Neutral"}},formGroups:{variation:X(X({},st),{},{tab:"content"}),title:X(X({},ot),{},{tab:"content",label:"Title",element:X(X({},ot.element),{},{attributes:X(X({},ot.element.attributes),{},{placeholder:"Box title"})})}),paragraph:X(X({},rt),{},{tab:"content"}),classes:X({},nt)}},code:{display:"Code Block",icon:"code",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},variations:{html:{display:"HTML"},javascript:{display:"Javascript"}},formGroups:{variation:X(X({},st),{},{tab:"content",label:"Language"}),content:X(X({},at),{},{tab:"content"}),classes:X({},nt)}},list:{display:"List",icon:"list",tabs:{content:{display:"Content",active:!0},classes:{display:"Classes"}},variations:{unordered:{display:"Unordered"},ordered:{display:"Ordered"}},formGroups:{variation:X(X({},st),{},{tab:"content",label:"List type"}),list:{tab:"content",label:"List items",dynamic:!0,attributes:{data:{el:"input",type:"text",name:"list",placeholder:"List item"}}},classes:X({},nt)}}},lt=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(z(this,t),!e||"FORM"!=e.nodeName)throw new Error("A valid form node is required to connect a form");if("object"!=V(n))throw new Error("Content groups must be passed as an object. Currently ".concat("undefined"==typeof contentGroups?"undefined":V(contentGroups)));this.formEl=e,this.contentGroups=X(X({},it),n),this.options=X(X(X({},et),r),{},{text:X(X({},tt),r.text||{}),classes:X(X({},Z),r.classes||{}),exclude:{defaultBlocks:(r.exclude||[]).defaultBlocks||[]}}),this.options.exclude.defaultBlocks.length>0&&this.excludeDefaultBlocks(),this.contentBlocksWrapperEl=this.formEl.querySelector(".".concat(this.getClassNameFor("block:wrapper"))),this.contentBlocksParentEl=this.contentBlocksWrapperEl.querySelector(".".concat(this.getClassNameFor("block:parent"))),this.contentBlocksButtonWrapperEl=this.contentBlocksWrapperEl.querySelector(".".concat(this.getClassNameFor("button:wrapper"))),this.contentBlocksLNL=this.contentBlocksParentEl.getElementsByClassName(this.getClassNameFor("block:single")),this.dragDrop=new M(this.contentBlocksParentEl,this.contentBlocksLNL,this.options),this.contentBlock=new T(this.contentBlocksLNL.length,this.contentBlocksParentEl,this.options,this.dragDrop),this.render()}var e,n;return e=t,(n=[{key:"excludeDefaultBlocks",value:function(){var t,e=$(this.options.exclude.defaultBlocks);try{for(e.s();!(t=e.n()).done;){var n=t.value;delete this.contentGroups[n]}}catch(t){e.e(t)}finally{e.f()}return this}},{key:"getClassNameFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)[0]}},{key:"getClassNamesFor",value:function(t){return v.getClassNamesFor(t,this.options.classes)}},{key:"addContentButtons",value:function(){for(var t in this.contentGroups){var e=this.contentGroups[t],n=e.icon,r=e.display,a=new d("button").addAttributes({type:"button",textContent:r,classList:[].concat(R(this.getClassNamesFor("button:addBlock")),["".concat(this.getClassNameFor("button:addBlock"),"--").concat(t)]),dataset:{group:t}}).appendTo(this.contentBlocksButtonWrapperEl).el;n&&new d("i").addAttributes({classList:[].concat(R(this.getClassNamesFor("block:icon")),["".concat(this.getClassNameFor("block:icon"),"--").concat(n)])}).prependTo(a)}return this}},{key:"switchToTab",value:function(t){var e,n,r=t.closest(".".concat(this.getClassNameFor("block:single"))),a=t.parentElement,o=t.dataset.target,i=$(a.querySelectorAll("button"));try{for(i.s();!(n=i.n()).done;){var l,c=n.value;(l=c.classList).remove.apply(l,R(this.getClassNamesFor("button:tab:active"))),c.disabled=!1}}catch(t){i.e(t)}finally{i.f()}return(e=t.classList).add.apply(e,R(this.getClassNamesFor("button:tab:active"))),t.disabled=!0,s.removeClassFromChildren(r,this.getClassNameFor("block:tab"),this.getClassNameFor("block:tab:active")),r.querySelector(".".concat(o)).classList.add(this.getClassNameFor("block:tab:active")),this}},{key:"handleFormClicks",value:function(t){var e=t.target;if("BUTTON"==e.nodeName&&"button"===e.type){var n,r;if(s.targetHasClass(e,[this.getClassNameFor("button:addDynamic"),this.getClassNameFor("button:removeDynamic")])){if(!(r=e.closest(".".concat(this.getClassNameFor("form:group"))).dataset.el))throw new Error("No data-el on the parent element");n=e.parentElement.getElementsByTagName(r)}switch(e.classList){case s.targetHasClass(e,R(this.getClassNamesFor("button:addDynamic"))):F.addDynamicElement(e,r,n,{"block:single":this.getClassNameFor("block:single"),"form:group":this.getClassNameFor("form:group"),"form:control":this.getClassNamesFor("form:control")});break;case s.targetHasClass(e,R(this.getClassNamesFor("button:removeDynamic"))):F.removeDynamicElement(e,n);break;case s.targetHasClass(e,R(this.getClassNamesFor("button:addBlock"))):this.contentBlock.add(e.dataset.group,this.contentGroups[e.dataset.group]),this.contentBlock.index++;break;case s.targetHasClass(e,R(this.getClassNamesFor("button:removeBlock"))):this.contentBlock.remove(e.parentElement,this.contentBlocksLNL),this.contentBlock.index--;break;case s.targetHasClass(e,[this.getClassNameFor("button:tab")]):this.switchToTab(e)}return this}}},{key:"formListener",value:function(){return this.contentBlocksWrapperEl.addEventListener("click",this.handleFormClicks.bind(this)),this}},{key:"render",value:function(){return this.addContentButtons(),this.formListener(),this}}])&&K(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();return e.FormConnect})()}));