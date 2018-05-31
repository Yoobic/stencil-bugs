[![Build Status](https://travis-ci.com/Yoobic/yoobic-ng-6.svg?token=Mzhp7AnZDFooLcSXNT9t&branch=master)](https://travis-ci.com/Yoobic/yoobic-ng-6)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/56c5bc8cb6814571bda9184e0f75edf1)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Yoobic/yoobic-ng-6&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://badge.fury.io/js/%40angular%2Fcore)
[![npm version](https://badge.fury.io/js/%40stencil%2Fcore.svg)](https://badge.fury.io/js/%40stencil%2Fcore)

# yoobic-ng-6

Angular 6 / Stencil version of Yoobic apps.

# Initialize the Repo:

```bash
npm run init
```

This will install the node_modules and then build the targets in the following order:
1. Stencil
2. Libs (common, translate, data-core, data-form, data-live)
3. App (app-common-base, app-common-mobile, app-common-web, app-data)

# Resetting the repo

To remove and reinstall the `node_modules` you can run the following command:

```bash
npm run reset:modules
```
# Update the packages

Manually update the root package.json and then run following command:

```bash
npm run update
```
# Building and Serving with `ng`:

The Angular CLI may be used to build and serve all the applications and libraries that are listed in the `angular.json` file. NPM scripts are used to automat
# Build a specific project: 
```bash
ng build --project <app-name>

// Example - build operations-mobile

ng build --project operations-mobile

// Example - build boost-web

ng build --project boost-web
```

For an AOT production build just add the --prod flag.

# Serve a specific project:
```bash
ng serve --project <app-name>

// Example - serve operations-web

ng serve --project operations-web
```
## Building Multiple Libraries

NPM scripts may be used to build multiple projects at the same time.

```bash
// Builds: shared/common, shared/translate, shared/data-core, shared/data-form, shared/data-live

npm run build:libs


// Builds: app/common-base, app/common-mobile, app/common-web, app/data

npm run build:app

// Build everything at once

npm run build:all
```

For an AOT production build just add `:prod`. For example `npm run build:app:prod`.

# Add a new library:

```npm run debug:device``` Build an mobile application to device. The default application is operations and the default platform is ios.

```APPLICATION=<application name> PLATFORM=<mobile platform> npm run debug:device``` For example: ```APPLICATION=boost PLATFORM=android npm run debug:device```
# Add a new library:
```ng generate library data-live```


Creates a new library and adds it to `angular.json`.
```
ng generate library <library-name>

// Example

ng generate library data-live

```

# Asset and i18n Management (copy tasks)

## Assets

Assets are organized at the root level. Design-system-related assets and any other assets common to all apps are found in `assets/app`. Each application then has it's specific assets which can be divided into `shared` (common to mobile and web targets), `mobile` (mobile only) and `web` (web only).

New assets should be added at the root and a copy task should be run to update the target assets:

```
    // copy operations-related assets to both mobile and web
    npm run copy:operations:assets

    // copy boost-related assets to both mobile and web
    npm run copy:boost:assets

    // copy all assets for all apps and targets
    npm run copy:assets:all
```
## i18n

Similarly to assets, i18n related `json` files are at the root level. Translations that are common to all apps are found in the `app` folder while app-specific translations are in their respective folders (`operations` and `boost`).

To concatenate all relevant `json` files and to copy them to the `assets` folder in each target run:

```
    npm run i18n:concat
```

# Release 
```npm run release```
```npm run release:doc```  This will release design system documentation to its heroku remote.
# Stencil Dev Essential Commands

All the stencil-related commands are run from the root of the repository.

To summarize, these are the main commands you will need:
- `NAME=<YourComponentName> npm run generate` - generates a component with the specified name (for example: `NAME=YooTest npm run generate`)
- `npm run build:stencil` - build stencil only
- `npm run build:doc` - build doc only
- `npm run dev:stencil` - build stencil and serve `www` only
- `npm run serve:doc` - build and serve the doc only
- `npm run dev:components` - build and serve both the doc and stencil concurrently
- `npm run lint:stencil` - lint the code in design-system/stencil
- `npm run test:stencil` - runs the stencil tests only

Below is an exhaustive list of all the stencil-related commands that can be used:

|Command|Description|Watches Changes|
|---|---|---|
|`npm run dev:components`|build and serve both the doc and stencil concurrently|Yes|
|`npm run dev:components:es5`|same as above but generates an ES5 build|Yes|
|`npm run build:stencil`|builds stencil components into `dist/` and `www` folders|No|
|`npm run build:stencil:es5`|same as above but generates an ES5 build|No|
|`npm run dev:stencil`|builds stencil components into `dist/` folder and serves the `www` folder|Yes|
|`npm run dev:stencil:es5`|same as above but generates an ES5 build |Yes|
|`npm run build:doc`|builds the doc and copies all relevant assets|No|
|`npm run serve:doc`|builds the doc and copies all relevant assets and serves it alone|Yes|
|`npm run serve:doc:nowatch`|builds the doc and copies all relevant assets and serves it alone|No|
|`npm run serve:stencil`|builds stencil, copies assets to `www` and lauches the stencil-dev-server|No|
|`npm run copy:to:www`|copy all the assets with correct paths into the `www` folder|No|
|`npm run clean:doc`|empty the `dist` folder in the doc|No|
|`npm run clean:www`|empty the `www` folder in stencil|No|
|`npm run lint:stencil`|lint the code in design-system/stencil|No|
|`npm run test:stencil`|runs the stencil tests only|No|
|`NAME=<YourComponentName> npm run generate:stencil`|generates a stencil component with the specified name|No|
|`NAME=<YourComponentName> npm run generate:stencil-form`|generates a stencil form component with the specified name|No|


### Miscelaneous

<!-- # Manual fix for ng-packagr
change strictMetadataEmit to false in 
yoobic-ng-6/node_modules/ng-packagr/lib/ts/conf/tsconfig.ngc.json -->
