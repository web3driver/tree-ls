const cwdpath = process.cwd();


const treels = require('./treels');


function run() {
    let treeObj = treels.genTreeObjByReadFile(cwdpath)
    treels.print(treeObj);
}

module.exports = {
    run: run,
    print: treels.print,
    genTreeObjByReadFile: treels.genTreeObjByReadFile,
    genTreeObjByPathArr: treels.genTreeObjByPathArr
}
