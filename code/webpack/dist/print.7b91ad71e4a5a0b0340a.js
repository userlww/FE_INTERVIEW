"use strict";
(self["webpackChunkwebpackSty"] = self["webpackChunkwebpackSty"] || []).push([["print"],{

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ printMe)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");

function printMe () {
  console.log(' I get called from print.js');
  _util__WEBPACK_IMPORTED_MODULE_0__["default"].log('common trunk');
}


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  log (msg) {
    // console.log('aaaaaaaaaa')
    console.log('output-msg', msg);
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["shared"], () => (__webpack_exec__("./src/print.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuN2I5MWFkNzFlNGE1YTBiMDM0MGEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDWDtBQUNmO0FBQ0EsRUFBRSxpREFBUTtBQUNWOzs7Ozs7Ozs7Ozs7Ozs7QUNKQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja1N0eS8uL3NyYy9wcmludC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrU3R5Ly4vc3JjL3V0aWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50TWUgKCkge1xuICBjb25zb2xlLmxvZygnIEkgZ2V0IGNhbGxlZCBmcm9tIHByaW50LmpzJyk7XG4gIHV0aWwubG9nKCdjb21tb24gdHJ1bmsnKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgbG9nIChtc2cpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYWFhYWFhYWFhYScpXG4gICAgY29uc29sZS5sb2coJ291dHB1dC1tc2cnLCBtc2cpO1xuICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9