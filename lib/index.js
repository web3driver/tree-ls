"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cwdpath = process.cwd();
var treels_1 = require("./treels");
exports.print = treels_1.print;
exports.genTreeObjByReadFile = treels_1.genTreeObjByReadFile;
exports.genTreeObjByPathArr = treels_1.genTreeObjByPathArr;
function run() {
    var treeObj = treels_1.genTreeObjByReadFile(cwdpath);
    treels_1.print(treeObj);
}
exports.run = run;
