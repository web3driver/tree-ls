import { IGNORE as DEFAULT_IGNORE } from './ignore';

/**
 * 检测目录或文件名是否在忽略列表中
 * @param {String} value 目录或者文件名
 */
function testIgnore(value: string) {
    return DEFAULT_IGNORE.some(function (ignore) {
        return ignore === `${value}`
    });
}

function deepCopy(srcObj: object, obj: object) {
    let _res = srcObj || {};
    Object.keys(obj).map(function (v) {
        if (isObject(obj[v])) {
            _res[v] = deepCopy(_res[v], obj[v])
        } else {
            _res[v] = obj[v]
        }
    })
    return _res
}

function isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export {
    testIgnore,
    deepCopy
}