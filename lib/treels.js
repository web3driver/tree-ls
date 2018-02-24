"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var util = require('./util');
var DirNums = 0;
var FileNums = 0;
var treeStrArr = ['.'];
/**
 * 根据文件路径数组生成tree对象
 * @param {Array} arr 文件路径数组
 */
function genTreeObjByPathArr(arr) {
    return arr.map(function (v) {
        return pathToTreeObj(v);
    }).reduce(function (a, b) {
        return util.deepCopy(a, b);
    });
}
exports.genTreeObjByPathArr = genTreeObjByPathArr;
/**
 * 单条路径转tree对象
 * @param {String} pathStr 路径字符串
 */
function pathToTreeObj(pathStr) {
    var _pathArr = pathStr.split('/');
    var _length = _pathArr.length;
    var _file = _pathArr[_length - 1];
    var res = {};
    res[_file] = {
        "_type": "File",
        "_ext": path.extname(_file),
        "_value": _file
    };
    return _pathArr.slice(0, _length - 1).concat(res).reduceRight(function (a, b) {
        var obj = {};
        obj[b] = {
            "_type": "Directory",
            "_value": chalk.blueBright(b),
            "_children": a
        };
        return obj;
    });
}
/**
 * 直接读取文件目录并生成tree对象
 * @param {String} basepath 基础路径
 */
function genTreeObjByReadFile(basepath) {
    var res = {};
    var _lists = fs.readdirSync(basepath);
    for (var i = 0; i < _lists.length; i++) {
        var v = _lists[i];
        if (util.testIgnore(v))
            continue;
        var stat = fs.statSync(path.join(basepath, v));
        var obj = {};
        if (stat.isDirectory()) {
            obj['_type'] = 'Directory';
            obj['_value'] = chalk.blueBright(v);
            obj['_children'] = genTreeObjByReadFile(path.join(basepath, v));
            res[v] = obj;
        }
        if (stat.isFile()) {
            obj['_type'] = 'File';
            obj['_ext'] = path.extname(v);
            obj['_value'] = v;
            res[v] = obj;
        }
    }
    return res;
}
exports.genTreeObjByReadFile = genTreeObjByReadFile;
/**
 * 根据tree对象生成待打印字符串
 * @param {TreeObj} srcObj 树对象
 * @param {String} parentIndent 父节点的indent
 * @param {Boolean} isParentLast 父节点是否是最后一个节点
 */
function genStr(srcObj, parentIndent, isParentLast) {
    if (parentIndent === void 0) { parentIndent = ''; }
    if (isParentLast === void 0) { isParentLast = null; }
    var keyArr = Object.keys(srcObj);
    for (var i = 0; i < keyArr.length; i++) {
        var obj = srcObj[keyArr[i]];
        var isLast = !!(i === keyArr.length - 1);
        var indent = '';
        if (obj._type === 'Directory')
            DirNums++;
        if (obj._type === 'File')
            FileNums++;
        if (isParentLast !== null) {
            indent = isParentLast ? parentIndent + "    " : parentIndent + "\u2502   ";
        }
        isLast ? treeStrArr.push(indent + "\u2514\u2500\u2500 " + obj._value) : treeStrArr.push(indent + "\u251C\u2500\u2500 " + obj._value);
        if (obj._children) {
            genStr(obj._children, "" + indent, isLast);
        }
    }
}
function print(treeObj) {
    genStr(treeObj);
    treeStrArr.push("\n" + DirNums + " directories, " + FileNums + " files");
    var str = treeStrArr.join("\n");
    console.log(str);
}
exports.print = print;
