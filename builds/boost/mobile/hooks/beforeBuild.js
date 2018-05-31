'use strict';

var rootdir = process.env.PWD || process.cwd();
var fs = require('fs-extra');
var path = require('path');
const log = require('npmlog');
log.heading = 'cordova_hooks';

log.verbose('before_build', 'add gradle.properties file');

let srcFile = path.join(rootdir, 'gradle.properties');
let targetDest = path.join(rootdir, 'platforms/android/gradle.properties');

fs.copySync(srcFile, targetDest);
