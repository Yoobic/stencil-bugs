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

Note that this bug could be linked to Chrome/Angular and seems to arise when running a Stencil build or making changes that cause an already served app to be rebuilt. If the application is already served and we build the `stencil` related libraries, this will cause the `body` tag in the Chrome Dev Tools (when inspecting) to be blocked and impossible to open as seen in the image below:

![Body Issue](/images/body_issue.png?raw=true)

This only seems to occur on the first rebuild after the app has been served.

## Steps to Reproduce

1. Initialize the repo
2. Serve the mobile app --> `ng serve --project operations-mobile`
3. Go to `https://localhost:6003/
4. Open the Chrome dev tools (everything works fine)
5. Build stencil - `npm run build:stencil`
6. Open the Chrome dev tools


## Expected Behavior

The Chrome Dev tools should not be affected by rebuilding the app.

