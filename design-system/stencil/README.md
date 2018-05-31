# Stencil Dev Essential Commands

## From Root

Below are the stencil related commands that you may run from root.

|Command|Description|Example|
|---|---|---|
|`NAME=<YourComponentName> npm run generate`| Generates a new stencil component with the specified name| `NAME=YooTest npm run generate`|

## From Target Directories

Below are all the commands that you can run from the `doc` and `stencil` targets. Note that **Watch** refers to whether or not the command will watch for file changes.

### Stencil

|Command|Description|Watch|
|---|---|---|
|`npm run serve`|builds stencil components into `dist/` folder and serves the doc and `www`|Yes|
|`npm run serve:es5`|same as above but generates an ES5 build |Yes|
|`npm run build`|builds stencil components into `dist/` folder|No|
|`npm run serve:doc`|serves the doc only|No|
|`npm run serve:nodoc`|builds stencil components into `dist/` and serves `www` folder|Yes|
|`npm run serve:fast`|builds stencil components into `dist/` folder and builds the doc before serving it directly with `browser-sync`|No|

### Doc

|Command|Description|Watch|
|---|---|---|
|`npm run build`|builds the doc and copies the static login page|No|
|`npm run serve`|builds the doc and copies the static login page|Yes|
|`npm run serve:nobuild`|serves doc directly from `dist/` folder without building|No|
|`npm run serve:fast`|builds the doc before serving it directly with `browser-sync`|No|
