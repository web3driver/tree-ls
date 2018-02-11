const DEFAULT_IGNORE = require('./ignore');

/**
 * 检测目录或文件名是否在忽略列表中
 * @param {String} value 目录或者文件名
 */
function _testIgnore(value) {
    return DEFAULT_IGNORE.some(function (ignore) {
        return ignore === `${value}`
    });
}

function _deepCopy(srcObj, obj) {
    let _res = srcObj || {};
    Object.keys(obj).map(function (v) {
        if (_isObject(obj[v])) {
            _res[v] = _deepCopy(_res[v], obj[v])
        } else {
            _res[v] = obj[v]
        }
    })
    return _res
}

function _isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

module.exports = {
    testIgnore: _testIgnore,
    deepCopy: _deepCopy
}