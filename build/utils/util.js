"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
var getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data
        };
    }
    ;
    return {
        success: true,
        data: data
    };
};
exports.getResponseData = getResponseData;
