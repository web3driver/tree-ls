const cwdpath = process.cwd();

import { print, genTreeObjByReadFile, genTreeObjByPathArr } from './treels';


function run() {
    let treeObj = genTreeObjByReadFile(cwdpath)
    print(treeObj);
}

export {
    run,
    print,
    genTreeObjByReadFile,
    genTreeObjByPathArr
}
