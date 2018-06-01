The aim of this repo is to help reproduce bugs that are affecting the development of our application but that seem to be unrelated to our code.

# Initializing the repo

To initialize the repo please run the following commands after cloning:

Note that we cannot fully initialize the repo in this case since the build breaks as part of the bug being reported.

1. `npm install && npm run build:libs && npm run build:app`
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

If we upgrade the version of `ng-packgr` to 3.0.0. we can no longer build the application.

The following error appears when building the `operations-common-mobile` library:

![ngPackgrBug]((/images/ngPackagr3.png?raw=true))

**Version Affected**: `MOBILE AND WEB`

## Steps to Reproduce

Attempt to build operations-related libraries - `npm run build:operations` 

Seems to be related to this: https://stackoverflow.com/questions/50405930/aot-angular-6-directive-somecomponent-expected-0-arguments-but-got-1-for.

The faulty pattern is found in the ionic angular code [here](https://github.com/ionic-team/ionic/blob/master/angular/src/directives/navigation/tab-delegate.ts)

## Expected Behavior

Should build normally.

