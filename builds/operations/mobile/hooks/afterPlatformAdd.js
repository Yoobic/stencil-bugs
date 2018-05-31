'use strict';

global.Promise = require('bluebird');
var fs = require('fs-extra');
const log = require('npmlog');
log.heading = 'cordova_hooks';
var path = require('path');

const tasks = [];

var rootdir = process.env.PWD || process.cwd();

log.verbose('after_platform_add', 'Deleting android-support-v4.jar');
const filesToDelete = [
  path.join(rootdir, 'platforms/android/libs/android-support-v4.jar'),
  path.join(rootdir, 'platforms/android/app/libs/android-support-v4.jar') // cordova-android@>=7.0.0 location
];

filesToDelete.forEach((p) => {
  // tasks.push(() => fs.remove(p));
  tasks.push(() => fs.removeSync(p));
});

// Promise.reduce(tasks, (promise, next) => next(), Promise.resolve());
tasks.reduce((acc, next) => next(), true);