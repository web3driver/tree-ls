const fs = require('fs');
const path = require('path');
const cwdpath = process.cwd();

const DEFAULT_IGNORE = [
    '/node_modules'
];

let DirNums = 0;
let FileNums = 0;

module.exports = function run() {
    let treeObj = genTreeObj(cwdpath)
    treeStrArr = ['.']
    genStr(treeObj)
    treeStrArr.push(`\n${DirNums} directories, ${FileNums} files`)
    let str = treeStrArr.join(`\n`)
    console.log(str)
}

function genTreeObj(basepath, depth = 0, isParentLast = false) {
    let res = {};
    let _depth = depth;
    let _order = 0;
    let _lists = fs.readdirSync(basepath);
    for (let i = 0; i < _lists.length; i++) {
        let v = _lists[i];

        let _isLast = i === _lists.length - 1 ? true : false;
        let stat = fs.statSync(path.join(basepath, v));
        let obj = {};
        if (stat.isDirectory()) {
            if (testIgnore(v, 'Directory')) continue;
            DirNums++;
            obj['_type'] = 'Directory';
            obj['_depth'] = _depth;
            obj['_order'] = _order++;
            obj['_isLast'] = _isLast;
            obj['_isParentLast'] = isParentLast;
            obj['_value'] = v;
            obj['_children'] = genTreeObj(path.join(basepath, v), _depth + 1, _isLast);
            res[v] = obj;
        }
        if (stat.isFile()) {
            if (testIgnore(v, 'File')) continue;
            FileNums++;
            obj['_type'] = 'File';
            obj['_ext'] = path.extname(v);
            obj['_depth'] = _depth;
            obj['_order'] = _order++;
            obj['_isLast'] = _isLast;
            obj['_isParentLast'] = isParentLast;
            obj['_value'] = v;
            res[path.basename(v, path.extname(v))] = obj;
        }
    }
    return res;
}

function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]'
}
function isObj(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
}
function testIgnore(value, type) {
    let testStr = type === 'Directory' ? `/${value}` : `${value}`;
    return DEFAULT_IGNORE.some(function (ignore) {
        return ignore === testStr
    });
}
function genStr(srcObj, parentIndent = '') {
    Object.keys(srcObj).map(function (v) {
        let obj = srcObj[v];
        let indent = '';
        if (obj._depth) {
            indent = obj._isParentLast ? `${parentIndent}    ` : `${parentIndent}│   `;
        }
        obj._isLast ? treeStrArr.push(`${indent}└── ${obj._value}`) : treeStrArr.push(`${indent}├── ${obj._value}`);
        if (obj._children) {
            genStr(obj._children, `${indent}`)
        }
    })
}