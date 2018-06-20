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


**Version Affected**: `MOBILE`

Bug description here

Item Sliding can't not be swipped if the is an ion-refresher in the ion-content when you are at the top (not started to scroll).

## Steps to Reproduce

Steps to reproduce the behaviour here (subdivide by version if necessary)

Go on the first tab and try to scroll the items -> You can't if you don't scroll a little bit.
Go on the last tab and try to scroll the items -> You can.

Diff: There is an ion-refresher in the ion-content of the first one.

Pages: storemanager-store-page & storemanager-home-page


## Expected Behavior

Expected behavior here (subdivide by version if necessary)

You can slide the item sliding even when you use a ion-refresher.

