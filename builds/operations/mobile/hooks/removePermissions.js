'use strict';
var fs = require('fs');
var path = require('path');
var rootdir = "";
var manifestFile = path.join(rootdir, "platforms/android/app/src/main/AndroidManifest.xml");

// fs.readFile(manifestFile, "utf8", function (err, data) {
//     if (err)
//         return console.log(err);

//     var result = data;
//     result = result.replace('<uses-feature android:name="android.hardware.location.gps"/>', '<uses-feature android:name="android.hardware.location.gps" android:required="false"/>');

//     fs.writeFile(manifestFile, result, "utf8", function (err) {
//         if (err)
//             return console.log(err);
//     });
// });