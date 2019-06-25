const request = require('request');
const cheerio = require('cheerio');
const jsonFile = require('jsonfile');
const generals = require('./Generals')();
module.exports = function() {
    const Modules = {};
    let _modules = {
        "request": request,
        "cheerio": cheerio,
        "jsonFile": jsonFile,
        "generals": generals
    };

    Modules.get = function() {
        return _modules;
    };

    Modules.addModule = function(key, module) {
        _modules[key] = module;
    };

    return Modules;
};

