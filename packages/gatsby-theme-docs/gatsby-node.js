const path = require('path')
const fs = require("fs")
const mkdirp = require("mkdirp")
const withDefaults = require('./utils/default-options')

// using a node-hook called onPreBootstrap, which will get us into the Gatsby API
// inside this, using gatsby store which is info about running program.
// option will be theme options
exports.onPreBootstrap = ({store}, options) => {
    const {program} = store.getState();
    const {contentPath} = withDefaults(options);
    const dir = path.join(program.directory, contentPath);
    if(!fs.existsSync(dir)) {
        // create the dir
        // it should happen before moving to next API, that why using sync
        mkdirp.sync(dir);
    }
}