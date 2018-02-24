const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const util = require('./util');

let DirNums = 0;
let FileNums = 0;
let treeStrArr = ['.']

/**
 * 根据文件路径数组生成tree对象
 * @param {Array} arr 文件路径数组 
 */
function genTreeObjByPathArr(arr: Array<string>) {
    return arr.map(function (v) {
        return pathToTreeObj(v)
    }).reduce(function (a, b) {
        return util.deepCopy(a, b)
    });
}

/**
 * 单条路径转tree对象
 * @param {String} pathStr 路径字符串
 */
function pathToTreeObj(pathStr: string) {
    let _pathArr: any[] = pathStr.split('/');
    let _length = _pathArr.length;
    let _file = _pathArr[_length - 1];
    let res = {};
    res[_file] = {
        "_type": "File",
        "_ext": path.extname(_file),
        "_value": _file
    }
    return _pathArr.slice(0, _length - 1).concat(res).reduceRight(function (a, b) {
        let obj = {};
        obj[b] = {
            "_type": "Directory",
            "_value": chalk.blueBright(b),
            "_children": a
        };
        return obj
    });
}

/**
 * 直接读取文件目录并生成tree对象
 * @param {String} basepath 基础路径
 */
function genTreeObjByReadFile(basepath: string) {
    let res = {};
    let _lists = fs.readdirSync(basepath);
    for (let i = 0; i < _lists.length; i++) {
        let v = _lists[i];

        if (util.testIgnore(v)) continue;

        let stat = fs.statSync(path.join(basepath, v));
        let obj = {};
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

/**
 * 根据tree对象生成待打印字符串
 * @param {TreeObj} srcObj 树对象
 * @param {String} parentIndent 父节点的indent
 * @param {Boolean} isParentLast 父节点是否是最后一个节点
 */
function genStr(srcObj: object, parentIndent: string = '', isParentLast: null | boolean = null) {
    let keyArr = Object.keys(srcObj);
    for (let i = 0; i < keyArr.length; i++) {
        let obj = srcObj[keyArr[i]];
        let isLast = !!(i === keyArr.length - 1);
        let indent = '';
        if (obj._type === 'Directory') DirNums++;
        if (obj._type === 'File') FileNums++;
        if (isParentLast !== null) {
            indent = isParentLast ? `${parentIndent}    ` : `${parentIndent}│   `;
        }
        isLast ? treeStrArr.push(`${indent}└── ${obj._value}`) : treeStrArr.push(`${indent}├── ${obj._value}`);
        if (obj._children) {
            genStr(obj._children, `${indent}`, isLast)
        }
    }
}

function print(treeObj) {
    genStr(treeObj);
    treeStrArr.push(`\n${DirNums} directories, ${FileNums} files`)
    let str = treeStrArr.join(`\n`)
    console.log(str)
}

export {
    print,
    genTreeObjByReadFile,
    genTreeObjByPathArr
}