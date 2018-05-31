'use strict';
const path = require('path');
const electron = require('electron');
const fs = require('fs');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app;

function i18n() {
    if (fs.existsSync(path.join(__dirname, app.getLocale() + '.json'))) {
        loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, app.getLocale() + '.json'), 'utf8'));
    } else {
        loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8'));
    }
}

i18n.prototype.translate = function(phrase) {
    let translation = loadedLanguage[phrase];
    if (translation === undefined) {
        translation = phrase;
    }
    return translation;
};

module.exports = i18n;