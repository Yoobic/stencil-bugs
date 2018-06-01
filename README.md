The aim of this repo is to help reproduce bugs that are affecting the development of our application but that seem to be unrelated to our code.

# Initializing the repo

To initialize the repo please run the following commands after cloning:

1. `npm install && npm run build:all`
2. `ng serve --project operations-mobile` --> serve mobile version of the app
3. `ng serve --project operations-web` --> serve the web version of the app

Note that there are two versions of the app in this repo, a mobile version and a web version (both are served on the browser). Some bugs are exclusively observed on one of the two versions - the version on which to reproduce the bug is always specified.

# Hide-Page Bug Report

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

**Version Affected**: MOBILE

This bug seems to arise when we programatically navigate to a page which has an `ion-router-outlet`. Upon navigation, the first page is blank because the component reprsenting the page has a `hide-page` class which sets it's opacity to 0. 

To simulate this, we have a login page (`packages/app/common-base/components/app-login/`) with an `ngOnInit` hook that navigates to the main menu after a small timeout using Angular's router. This bug only affects the mobile version of the application.

This bug also occurs intermitently when refreshing the page and emptying the cache (`hard reload` on Chrome). The last tab that the user is on will be blank upon refreshing as it also has the `hide-page` class.

## Steps to reproduce

 1. Initialize the repo
 2. Serve the mobile app `ng serve --project operations-mobile`
 3. Go to `https://localhost:6003/`
 4. The bug can be observed straight away on the first page of the menu (HOME tab)

## Expected Behavior

The first page should be visible and not hidden with CSS.