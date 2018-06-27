The aim of this repo is to help reproduce bugs that are affecting the development of our application but that seem to be unrelated to our code.

# Initializing the repo

To initialize the repo please run the following commands after cloning:

1. `npm install && npm run build:all`
2. `ng serve --project operations-mobile` --> serve mobile version of the app (**https://localhost:6003**)
3. `ng serve --project operations-web` --> serve the web version of the app (**https://localhost:6004**)

Note that there are two versions of the app in this repo, a mobile version and a web version (both are served on a browser). Some bugs are exclusively observed on one of the two versions - the version on which to reproduce the bug is always specified.


# Bug Report

`ionic info` output:

```
@ionic/cli-utils: 2.0.0-rc.6
ionic (Ionic CLI): 4.0.0-rc.6

System:
- NodeJS: v8.9.4
- npm: 6.1.0
- OS: macOS High Sierra
```


## Bug Description

file Transfer plugin does not work. 


**Version Affected**: `MOBILE`

Bug description here

## Steps to Reproduce

Steps: 
Build the app and serve it: `npm install && npm run build:all && $(npm bin)/ng serve --project operatoins-mobile`
Click on download on the home page and see the error.

NB: The error is inside the plugin, I have provided random value to the function and this does not affect it. 

The problem occur with `FileTransfer.prototype.create()` inside there is a call to `new FileTransfertObject()` and inside the `checkAvailability` function is not defined.

Note: the service file transfer is called inside app/utils and use in the page storemanager-home-page


## Expected Behavior

Expected behavior here (subdivide by version if necessary)

You can slide the item sliding even when you use a ion-refresher.

