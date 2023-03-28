/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emailjs/browser/es/api/sendPost.js":
/*!**********************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/api/sendPost.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendPost": () => (/* binding */ sendPost)
/* harmony export */ });
/* harmony import */ var _models_EmailJSResponseStatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/EmailJSResponseStatus */ "./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store */ "./node_modules/@emailjs/browser/es/store/store.js");


const sendPost = (url, data, headers = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', ({ target }) => {
            const responseStatus = new _models_EmailJSResponseStatus__WEBPACK_IMPORTED_MODULE_0__.EmailJSResponseStatus(target);
            if (responseStatus.status === 200 || responseStatus.text === 'OK') {
                resolve(responseStatus);
            }
            else {
                reject(responseStatus);
            }
        });
        xhr.addEventListener('error', ({ target }) => {
            reject(new _models_EmailJSResponseStatus__WEBPACK_IMPORTED_MODULE_0__.EmailJSResponseStatus(target));
        });
        xhr.open('POST', _store_store__WEBPACK_IMPORTED_MODULE_1__.store._origin + url, true);
        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(data);
    });
};


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "init": () => (/* reexport safe */ _methods_init_init__WEBPACK_IMPORTED_MODULE_0__.init),
/* harmony export */   "send": () => (/* reexport safe */ _methods_send_send__WEBPACK_IMPORTED_MODULE_1__.send),
/* harmony export */   "sendForm": () => (/* reexport safe */ _methods_sendForm_sendForm__WEBPACK_IMPORTED_MODULE_2__.sendForm)
/* harmony export */ });
/* harmony import */ var _methods_init_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/init/init */ "./node_modules/@emailjs/browser/es/methods/init/init.js");
/* harmony import */ var _methods_send_send__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/send/send */ "./node_modules/@emailjs/browser/es/methods/send/send.js");
/* harmony import */ var _methods_sendForm_sendForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/sendForm/sendForm */ "./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    init: _methods_init_init__WEBPACK_IMPORTED_MODULE_0__.init,
    send: _methods_send_send__WEBPACK_IMPORTED_MODULE_1__.send,
    sendForm: _methods_sendForm_sendForm__WEBPACK_IMPORTED_MODULE_2__.sendForm,
});


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/methods/init/init.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/methods/init/init.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./node_modules/@emailjs/browser/es/store/store.js");

/**
 * Initiation
 * @param {string} publicKey - set the EmailJS public key
 * @param {string} origin - set the EmailJS origin
 */
const init = (publicKey, origin = 'https://api.emailjs.com') => {
    _store_store__WEBPACK_IMPORTED_MODULE_0__.store._userID = publicKey;
    _store_store__WEBPACK_IMPORTED_MODULE_0__.store._origin = origin;
};


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendForm": () => (/* binding */ sendForm)
/* harmony export */ });
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./node_modules/@emailjs/browser/es/store/store.js");
/* harmony import */ var _utils_validateParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/validateParams */ "./node_modules/@emailjs/browser/es/utils/validateParams.js");
/* harmony import */ var _api_sendPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/sendPost */ "./node_modules/@emailjs/browser/es/api/sendPost.js");



const findHTMLForm = (form) => {
    let currentForm;
    if (typeof form === 'string') {
        currentForm = document.querySelector(form);
    }
    else {
        currentForm = form;
    }
    if (!currentForm || currentForm.nodeName !== 'FORM') {
        throw 'The 3rd parameter is expected to be the HTML form element or the style selector of form';
    }
    return currentForm;
};
/**
 * Send a form the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {string | HTMLFormElement} form - the form element or selector
 * @param {string} publicKey - the EmailJS public key
 * @returns {Promise<EmailJSResponseStatus>}
 */
const sendForm = (serviceID, templateID, form, publicKey) => {
    const uID = publicKey || _store_store__WEBPACK_IMPORTED_MODULE_0__.store._userID;
    const currentForm = findHTMLForm(form);
    (0,_utils_validateParams__WEBPACK_IMPORTED_MODULE_1__.validateParams)(uID, serviceID, templateID);
    const formData = new FormData(currentForm);
    formData.append('lib_version', '3.10.0');
    formData.append('service_id', serviceID);
    formData.append('template_id', templateID);
    formData.append('user_id', uID);
    return (0,_api_sendPost__WEBPACK_IMPORTED_MODULE_2__.sendPost)('/api/v1.0/email/send-form', formData);
};


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/methods/send/send.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/methods/send/send.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "send": () => (/* binding */ send)
/* harmony export */ });
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./node_modules/@emailjs/browser/es/store/store.js");
/* harmony import */ var _utils_validateParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/validateParams */ "./node_modules/@emailjs/browser/es/utils/validateParams.js");
/* harmony import */ var _api_sendPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/sendPost */ "./node_modules/@emailjs/browser/es/api/sendPost.js");



/**
 * Send a template to the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {object} templatePrams - the template params, what will be set to the EmailJS template
 * @param {string} publicKey - the EmailJS public key
 * @returns {Promise<EmailJSResponseStatus>}
 */
const send = (serviceID, templateID, templatePrams, publicKey) => {
    const uID = publicKey || _store_store__WEBPACK_IMPORTED_MODULE_0__.store._userID;
    (0,_utils_validateParams__WEBPACK_IMPORTED_MODULE_1__.validateParams)(uID, serviceID, templateID);
    const params = {
        lib_version: '3.10.0',
        user_id: uID,
        service_id: serviceID,
        template_id: templateID,
        template_params: templatePrams,
    };
    return (0,_api_sendPost__WEBPACK_IMPORTED_MODULE_2__.sendPost)('/api/v1.0/email/send', JSON.stringify(params), {
        'Content-type': 'application/json',
    });
};


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmailJSResponseStatus": () => (/* binding */ EmailJSResponseStatus)
/* harmony export */ });
class EmailJSResponseStatus {
    constructor(httpResponse) {
        this.status = httpResponse ? httpResponse.status : 0;
        this.text = httpResponse ? httpResponse.responseText : 'Network Error';
    }
}


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/store/store.js":
/*!*********************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/store/store.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
const store = {
    _origin: 'https://api.emailjs.com',
};


/***/ }),

/***/ "./node_modules/@emailjs/browser/es/utils/validateParams.js":
/*!******************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/utils/validateParams.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateParams": () => (/* binding */ validateParams)
/* harmony export */ });
const validateParams = (publicKey, serviceID, templateID) => {
    if (!publicKey) {
        throw 'The public key is required. Visit https://dashboard.emailjs.com/admin/account';
    }
    if (!serviceID) {
        throw 'The service ID is required. Visit https://dashboard.emailjs.com/admin';
    }
    if (!templateID) {
        throw 'The template ID is required. Visit https://dashboard.emailjs.com/admin/templates';
    }
    return true;
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/style/mediaQuerys.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/style/mediaQuerys.css ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media (max-width: 620px) {\r\n    header h1 {\r\n        font-size: 28px;\r\n    }\r\n\r\n    header form {\r\n        width: 80%;\r\n        flex-direction: column;\r\n    }\r\n\r\n    header div {\r\n        width: 100vw;\r\n    }\r\n\r\n    input[type=\"email\"] {\r\n        width: 100%;\r\n        margin-bottom: 0.5rem;\r\n    }\r\n\r\n    form button {\r\n        width: 100%;\r\n        margin: 0;\r\n    }\r\n\r\n    main img {\r\n        max-width: 365px;\r\n    }\r\n}\r\n\r\n@media (max-width: 400px) {\r\n    header h1 {\r\n        font-size: 22px;\r\n    }\r\n\r\n    main img {\r\n        max-width: 320px;\r\n    }\r\n}", "",{"version":3,"sources":["webpack://./src/assets/style/mediaQuerys.css"],"names":[],"mappings":"AAAA;IACI;QACI,eAAe;IACnB;;IAEA;QACI,UAAU;QACV,sBAAsB;IAC1B;;IAEA;QACI,YAAY;IAChB;;IAEA;QACI,WAAW;QACX,qBAAqB;IACzB;;IAEA;QACI,WAAW;QACX,SAAS;IACb;;IAEA;QACI,gBAAgB;IACpB;AACJ;;AAEA;IACI;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;AACJ","sourcesContent":["@media (max-width: 620px) {\r\n    header h1 {\r\n        font-size: 28px;\r\n    }\r\n\r\n    header form {\r\n        width: 80%;\r\n        flex-direction: column;\r\n    }\r\n\r\n    header div {\r\n        width: 100vw;\r\n    }\r\n\r\n    input[type=\"email\"] {\r\n        width: 100%;\r\n        margin-bottom: 0.5rem;\r\n    }\r\n\r\n    form button {\r\n        width: 100%;\r\n        margin: 0;\r\n    }\r\n\r\n    main img {\r\n        max-width: 365px;\r\n    }\r\n}\r\n\r\n@media (max-width: 400px) {\r\n    header h1 {\r\n        font-size: 22px;\r\n    }\r\n\r\n    main img {\r\n        max-width: 320px;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/style/style.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/style/style.css ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n    --color-label: hsl(0, 0%, 59%);\r\n    --color-bottom: hsl(223, 87%, 63%);\r\n    --color1: hsl(223, 100%, 88%);\r\n    --second-color: hsl(354, 100%, 66%);\r\n}\r\n\r\n* {\r\n    box-sizing: border-box;\r\n    font-family: 'roboto', sans-serif;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nbody {\r\n    height: 100vh;\r\n    /* background-color: hsl(217, 19%, 24%); */\r\n    background-color: #fff;\r\n}\r\n\r\nbody * {\r\n    font-family: 'Italic', sans-serif, fantasy;\r\n}\r\n\r\nheader{\r\n    width: 100%;\r\n    padding: 1rem;\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nheader div {\r\n    /* width: 80vw; */\r\n    width: 80vw;\r\n    /* width: 620px; */\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n\r\n    /* background-color: var(--color1); */\r\n}\r\n\r\nheader svg {\r\n    margin: 2rem;\r\n}\r\n\r\nheader h1 {\r\n    color: silver;\r\n    font-size: 42px;\r\n    font-family: 'libre Franklin', sans-serif;\r\n    font-weight: 100;\r\n}\r\n\r\nstrong {\r\n    color: black;\r\n    font-weight: 800;\r\n}\r\n\r\nheader p {\r\n    color: black;\r\n    font-family: 'libre Franklin', sans-serif;\r\n    font-weight: 400;\r\n    margin: 1rem 0 2rem;\r\n}\r\n\r\nheader form {\r\n    width: 580px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\ninput[type=\"email\"]{\r\n    width: 60%;\r\n\r\n    padding: 1rem;\r\n    border-radius: 26px;\r\n    border: 0.5px solid rgba(192, 192, 192, 0.37);\r\n    color: var(--color-label);\r\n    font-family: 'libre Franklin', sans-serif;\r\n\r\n}\r\n\r\ninput[type=\"email\"] {\r\n    box-shadow: 0 0 0 0;\r\n    outline: 0;\r\n}\r\n\r\n/* input[type=\"email\"]:valid {\r\n    border-color: rgba(192, 192, 192, 0.37);\r\n}\r\n\r\ninput[type=\"email\"]:invalid {\r\n    border-color: red;\r\n} */\r\n\r\n\r\nform button {\r\n    width: 40%;\r\n    padding: 1rem;\r\n    border-radius: 26px;\r\n\r\n    background-color: var(--color-bottom);\r\n    border: none;\r\n    color: #fff;\r\n    margin-left: 0.5rem;\r\n\r\n    cursor: pointer;\r\n    box-shadow: 9px 5px 25px -5px var(--color-bottom);\r\n}\r\nform button:hover {\r\n    filter: brightness(0.8);\r\n    transform: scale(1.01, 1.01);\r\n}\r\n\r\n\r\n\r\nmain {\r\n    width: 100%;\r\n    /* position: relative; */\r\n\r\n    margin: 4rem 0px 4rem 0px;\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nmain img {\r\n    max-width: 520px;\r\n}\r\n\r\nmain img:hover {\r\n    opacity: .9;\r\n    transform: scale(1.01, 1.01);\r\n}\r\n\r\n\r\nfooter{\r\n    width: 100%;\r\n    height: 20vh;\r\n    bottom: 0;\r\n    position: relative;\r\n\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n}\r\n\r\nfooter div {\r\n    padding: 1rem;\r\n}\r\n\r\nfooter ul {\r\n    display: flex;\r\n    justify-content: space-around;\r\n}\r\n\r\nfooter ul li {\r\n    list-style: none;\r\n    border-radius: 60%;\r\n    border: 0.5px solid rgba(91, 91, 255, 0.301);\r\n    padding: 0.5rem;\r\n\r\n    margin: 1rem;\r\n    cursor: pointer;\r\n}\r\n\r\nfooter ul li:hover {\r\n    transform: scale(1.1, 1.1);\r\n}\r\n\r\nli a {\r\n    display: flex;\r\n}\r\n\r\nfooter ul li img {\r\n    width: 16px;\r\n    height: 16px;\r\n    color: var(--color-bottom);\r\n}\r\n\r\n\r\nfooter p {\r\n    font-size: 13px;\r\n    color: var(--color-label);\r\n    font-family: 'libre Franklin', sans-serif;\r\n    font-weight: 100;\r\n\r\n    text-align: center;\r\n}\r\n\r\n\r\n\r\n\r\n", "",{"version":3,"sources":["webpack://./src/assets/style/style.css"],"names":[],"mappings":"AAAA;IACI,8BAA8B;IAC9B,kCAAkC;IAClC,6BAA6B;IAC7B,mCAAmC;AACvC;;AAEA;IACI,sBAAsB;IACtB,iCAAiC;IACjC,UAAU;IACV,SAAS;AACb;;AAEA;IACI,aAAa;IACb,0CAA0C;IAC1C,sBAAsB;AAC1B;;AAEA;IACI,0CAA0C;AAC9C;;AAEA;IACI,WAAW;IACX,aAAa;;IAEb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,WAAW;IACX,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;;IAGnB,qCAAqC;AACzC;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,eAAe;IACf,yCAAyC;IACzC,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,yCAAyC;IACzC,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,UAAU;;IAEV,aAAa;IACb,mBAAmB;IACnB,6CAA6C;IAC7C,yBAAyB;IACzB,yCAAyC;;AAE7C;;AAEA;IACI,mBAAmB;IACnB,UAAU;AACd;;AAEA;;;;;;GAMG;;;AAGH;IACI,UAAU;IACV,aAAa;IACb,mBAAmB;;IAEnB,qCAAqC;IACrC,YAAY;IACZ,WAAW;IACX,mBAAmB;;IAEnB,eAAe;IACf,iDAAiD;AACrD;AACA;IACI,uBAAuB;IACvB,4BAA4B;AAChC;;;;AAIA;IACI,WAAW;IACX,wBAAwB;;IAExB,yBAAyB;;IAEzB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,WAAW;IACX,4BAA4B;AAChC;;;AAGA;IACI,WAAW;IACX,YAAY;IACZ,SAAS;IACT,kBAAkB;;IAElB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,sBAAsB;AAC1B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,6BAA6B;AACjC;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,4CAA4C;IAC5C,eAAe;;IAEf,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,0BAA0B;AAC9B;;;AAGA;IACI,eAAe;IACf,yBAAyB;IACzB,yCAAyC;IACzC,gBAAgB;;IAEhB,kBAAkB;AACtB","sourcesContent":[":root {\r\n    --color-label: hsl(0, 0%, 59%);\r\n    --color-bottom: hsl(223, 87%, 63%);\r\n    --color1: hsl(223, 100%, 88%);\r\n    --second-color: hsl(354, 100%, 66%);\r\n}\r\n\r\n* {\r\n    box-sizing: border-box;\r\n    font-family: 'roboto', sans-serif;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nbody {\r\n    height: 100vh;\r\n    /* background-color: hsl(217, 19%, 24%); */\r\n    background-color: #fff;\r\n}\r\n\r\nbody * {\r\n    font-family: 'Italic', sans-serif, fantasy;\r\n}\r\n\r\nheader{\r\n    width: 100%;\r\n    padding: 1rem;\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nheader div {\r\n    /* width: 80vw; */\r\n    width: 80vw;\r\n    /* width: 620px; */\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n\r\n    /* background-color: var(--color1); */\r\n}\r\n\r\nheader svg {\r\n    margin: 2rem;\r\n}\r\n\r\nheader h1 {\r\n    color: silver;\r\n    font-size: 42px;\r\n    font-family: 'libre Franklin', sans-serif;\r\n    font-weight: 100;\r\n}\r\n\r\nstrong {\r\n    color: black;\r\n    font-weight: 800;\r\n}\r\n\r\nheader p {\r\n    color: black;\r\n    font-family: 'libre Franklin', sans-serif;\r\n    font-weight: 400;\r\n    margin: 1rem 0 2rem;\r\n}\r\n\r\nheader form {\r\n    width: 580px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\ninput[type=\"email\"]{\r\n    width: 60%;\r\n\r\n    padding: 1rem;\r\n    border-radius: 26px;\r\n    border: 0.5px solid rgba(192, 192, 192, 0.37);\r\n    color: var(--color-label);\r\n    font-family: 'libre Franklin', sans-serif;\r\n\r\n}\r\n\r\ninput[type=\"email\"] {\r\n    box-shadow: 0 0 0 0;\r\n    outline: 0;\r\n}\r\n\r\n/* input[type=\"email\"]:valid {\r\n    border-color: rgba(192, 192, 192, 0.37);\r\n}\r\n\r\ninput[type=\"email\"]:invalid {\r\n    border-color: red;\r\n} */\r\n\r\n\r\nform button {\r\n    width: 40%;\r\n    padding: 1rem;\r\n    border-radius: 26px;\r\n\r\n    background-color: var(--color-bottom);\r\n    border: none;\r\n    color: #fff;\r\n    margin-left: 0.5rem;\r\n\r\n    cursor: pointer;\r\n    box-shadow: 9px 5px 25px -5px var(--color-bottom);\r\n}\r\nform button:hover {\r\n    filter: brightness(0.8);\r\n    transform: scale(1.01, 1.01);\r\n}\r\n\r\n\r\n\r\nmain {\r\n    width: 100%;\r\n    /* position: relative; */\r\n\r\n    margin: 4rem 0px 4rem 0px;\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\nmain img {\r\n    max-width: 520px;\r\n}\r\n\r\nmain img:hover {\r\n    opacity: .9;\r\n    transform: scale(1.01, 1.01);\r\n}\r\n\r\n\r\nfooter{\r\n    width: 100%;\r\n    height: 20vh;\r\n    bottom: 0;\r\n    position: relative;\r\n\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n}\r\n\r\nfooter div {\r\n    padding: 1rem;\r\n}\r\n\r\nfooter ul {\r\n    display: flex;\r\n    justify-content: space-around;\r\n}\r\n\r\nfooter ul li {\r\n    list-style: none;\r\n    border-radius: 60%;\r\n    border: 0.5px solid rgba(91, 91, 255, 0.301);\r\n    padding: 0.5rem;\r\n\r\n    margin: 1rem;\r\n    cursor: pointer;\r\n}\r\n\r\nfooter ul li:hover {\r\n    transform: scale(1.1, 1.1);\r\n}\r\n\r\nli a {\r\n    display: flex;\r\n}\r\n\r\nfooter ul li img {\r\n    width: 16px;\r\n    height: 16px;\r\n    color: var(--color-bottom);\r\n}\r\n\r\n\r\nfooter p {\r\n    font-size: 13px;\r\n    color: var(--color-label);\r\n    font-family: 'libre Franklin', sans-serif;\r\n    font-weight: 100;\r\n\r\n    text-align: center;\r\n}\r\n\r\n\r\n\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/style/mediaQuerys.css":
/*!******************************************!*\
  !*** ./src/assets/style/mediaQuerys.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_mediaQuerys_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./mediaQuerys.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/style/mediaQuerys.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_mediaQuerys_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_mediaQuerys_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_mediaQuerys_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_mediaQuerys_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/assets/style/style.css":
/*!************************************!*\
  !*** ./src/assets/style/style.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/style/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/style/style.css */ "./src/assets/style/style.css");
/* harmony import */ var _assets_style_mediaQuerys_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/style/mediaQuerys.css */ "./src/assets/style/mediaQuerys.css");
/* harmony import */ var _emailjs_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emailjs/browser */ "./node_modules/@emailjs/browser/es/index.js");




const inputEmail = document.getElementById('input_email')
const form = document.querySelector('form')
const buttomClick = document.querySelector('#btn-notify')
const icons = document.querySelectorAll('.icon')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let nome = 'pedro'

    const templateParams = {
        from_name: nome,
        email: inputEmail.value,
        message: 'iai seu cagao'
    }

    _emailjs_browser__WEBPACK_IMPORTED_MODULE_2__["default"].send("service_sywlngt", "template_wnl4o5w", templateParams, "EF2-B2Suwj2YSHuxq")
        .then((response) => {
            console.log('SUCESS!', response.status, response.text)
            nome
            inputEmail.value
        })
        .catch((error) => console.log('FAILE...', error))
       

    inputEmail.value = ""
    
})


inputEmail.addEventListener('input', function(e) {
    if(inputEmail.checkValidity() == false) {
        inputEmail.style.borderColor = 'red';
    } else {
        inputEmail.style.borderColor = 'rgba(192, 192, 192, 0.37)'

    }

})



Array.from(icons).forEach((element) => {
    element.addEventListener('mouseover', function(e) {
        element.style.backgroundColor = 'hsl(223, 87%, 63%)'

        let link_a = element.querySelectorAll('a');
        let iconsImg = [];

        for(let i = 0; i < link_a.length; i++) {
            let elemento_pai = link_a[i]
            let img =  elemento_pai.querySelector('img')

            if(img.src.includes('instagram')) {
                img.setAttribute('src', "./src/assets/img/icon-instagram-branco.png")
            }

            if(img.src.includes('facebook')) {
                img.setAttribute('src', "./src/assets/img/icon-facebook-branco.png")
            }

            if(img.src.includes('twitter')) {
                img.setAttribute('src', "./src/assets/img/icon-twitter-branco.png")
            }

            // console.log(img.src.includes('instagram'))
            // img.setAttribute('src', "./src/assets/img/icons8-facebook-64 (2).png")

        };

    });

    element.addEventListener('mouseout', function(e) {
        element.style.backgroundColor = ''
        let link_a = element.querySelectorAll('a')
        // console.log(element)

        for(let i = 0; i < link_a.length; i++) {
            let elemento_pai = link_a[i]
            let img =  elemento_pai.querySelector('img')

            if(img.src.includes('instagram')) {
                img.setAttribute('src', "./src/assets/img/icon-instagram.png")
            }

            if(img.src.includes('facebook')) {
                img.setAttribute('src', "./src/assets/img/icon-facebook.png")
            }

            if(img.src.includes('twitter')) {
                img.setAttribute('src', "./src/assets/img/icon-twitter.png")
            }

        };
    });

})


// icons.addEventListener('mouseover', function(e) {
//     console.log(e)
// })




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map