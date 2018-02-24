"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ignore_1 = require("./ignore");
/**
 * 检测目录或文件名是否在忽略列表中
 * @param {String} value 目录或者文件名
 */
function testIgnore(value) {
    return ignore_1.IGNORE.some(function (ignore) {
        return ignore === "" + value;
    });
}
exports.testIgnore = testIgnore;
function deepCopy(srcObj, obj) {
    var _res = srcObj || {};
    Object.keys(obj).map(function (v) {
        if (isObject(obj[v])) {
            _res[v] = deepCopy(_res[v], obj[v]);
        }
        else {
            _res[v] = obj[v];
        }
    });
    return _res;
}
exports.deepCopy = deepCopy;
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
