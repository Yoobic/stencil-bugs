The aim of this repo is to help reproduce bugs that are affecting the development of our application but that seem to be unrelated to our code.

# Initializing the repo

To initialize the repo please run the following commands after cloning:

1. `npm install && npm run build:all`
2. `ng serve --project operations-mobile` 

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

In this example, we have a <yoo-readonly> component with two Props : `readonly` and `isReadonly`.
`readonly` prop cannot be passed, from Angular to a Stencil component. Whereas `isReadonly` is passed properly.

**Version Affected**: `MOBILE`

## Steps to Reproduce

- Go on the first tab
- You will see the text bellow <br/>
readonly value : undefined <br/>
isReadonly value : true <br/>

readonly value : undefined <br/>
isReadonly value : false <br/>

Pages: storemanager-home-page


## Expected Behavior

The text should be like this: <br/>
readonly value : true <br/>
isReadonly value : true <br/>

readonly value : false <br/>
isReadonly value : false <br/>
