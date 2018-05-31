'use strict';

var express = require('express');
var enforce = require('express-sslify');
var compression = require('compression');
var helmet = require('helmet');

var app = express();
if (process.env.FORCE_SSL === 'true') {
    app.use(enforce.HTTPS({ // eslint-disable-line new-cap
        trustProtoHeader: true
    }));
}

let excluded = ['/index.js', '/.gitignore', '/package.json', '/Procfile'];
app.use(helmet.contentSecurityPolicy({
    'directives': {
        'scriptSrc': [
            '\'self\'',
            'blob:',
            '\'unsafe-eval\'',
            '*.onesignal.com',
            'onesignal.com',
            '*.logrocket.com',
            '*.logrocket.io',
            'connect.facebook.net',
            'js.stripe.com',
            '*.intercom.io', '*.intercomcdn.com',
            'cdn.segment.com',
            'api.segment.io',
            'ajax.googleapis.com',
            'static.view-api.box.com',
            '*.mixpanel.com',
            '*.mxpnl.com',
            '*.fullstory.com',
            '*.hotjar.com',
            'yoobic.freshdesk.com',
            'api.mapbox.com',
            '*.amap.com',
            'codepush.azurewebsites.net',
            '\'sha256-JemOHbbf9fJxKOGyDZD127FlGFMccKIkGTfQ7I5laBs=\'',
            '\'sha256-7sf+daJDW7J8W6uQcO2MnNBNAPuc6uh5Tth/cAZ5M6M=\''
        ],

        'frame-ancestors': ['\'self\'']
    }
}));
app.use(helmet.frameguard({
    action: 'sameorigin'
}));
app.use('*', function (req, res, next) {
    if (excluded.indexOf(req.baseUrl) >= 0) {
        res.end();
    } else {
        next();
    }
});
app.use(compression());
app.use(express.static('.'));
app.listen(process.env.PORT || 3001);
