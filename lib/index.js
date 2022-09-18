(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["aa"] = factory();
	else
		root["aa"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "convertToChineseNumber": () => (/* binding */ convertToChineseNumber)
});

;// CONCATENATED MODULE: ./src/constant.ts
const chnNumChar = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
];
const chnUnitChar = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
    "十",
    "百",
    "千",
    "兆",
    "十",
    "百",
    "千",
];
const specialUnit = ["万", "亿", "兆"];
const ZERO = "零";

;// CONCATENATED MODULE: ./src/index.ts

const convertToChineseNumber = (num) => {
    if (isNaN(+num)) {
        throw Error("The parameter need to be number");
    }
    const validNumStr = parseFloat(num + "").toString();
    let chnIntStr = validNumStr;
    let chnDecimalStr = "";
    let chnStr = "";
    if (validNumStr.includes(".")) {
        const arr = validNumStr.split(".");
        chnIntStr = arr[0];
        chnDecimalStr = arr[1];
    }
    while (chnIntStr.length > 0) {
        const tmpNum = chnNumChar[parseInt(chnIntStr.slice(0, 1))];
        const tmpUnit = chnUnitChar[chnIntStr.length - 1];
        // 处理中间多个零的情况
        chnStr += chnStr.slice(-1) == ZERO && tmpNum == ZERO ? "" : tmpNum;
        chnStr += tmpNum == ZERO ? "" : tmpUnit;
        // 处理100001这种case,首次执行完毕chnStr:一十 此时tmpUnit为万但tmpNum为零,不会追加unit,需要特殊处理
        if (tmpNum == ZERO && specialUnit.indexOf(tmpUnit) !== -1) {
            // 截掉追加的零
            if (chnStr.slice(-1) == ZERO) {
                chnStr = chnStr.slice(0, chnStr.length - 1);
            }
            chnStr += tmpUnit;
        }
        chnIntStr = chnIntStr.slice(1);
    }
    if (chnStr) {
        // 去掉末尾的零
        if (chnStr.slice(-1) === ZERO) {
            chnStr = chnStr.slice(0, chnStr.length - 1);
        }
        // 特殊case
        if (chnStr.slice(0, 2) == "一十") {
            chnStr = chnStr.slice(1);
        }
    }
    if (chnDecimalStr) {
        chnStr += "点";
        while (chnDecimalStr) {
            chnStr += chnNumChar[+chnDecimalStr.slice(0, 1)];
            chnDecimalStr = chnDecimalStr.slice(1);
        }
    }
    return chnStr;
};

/******/ 	return __webpack_exports__;
/******/ })()
;
});