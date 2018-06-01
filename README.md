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

Using Stencil version 0.9.7 produces an error when building stencil:

```shell
[ ERROR ]  typescript: ...nts/Phonegap/yoobic-ng-6/node_modules/@ionic/core/dist/types/utils/overlays.d.ts, line: 9
          Type ‘keyof B’ does not satisfy the constraint ‘string’. Type ‘string | number |
          symbol’ is not assignable to type ‘string’. Type ‘number’ is not assignable to
          type ‘string’.

     L8:  };
     L9:  ction createOverlay<T extends HTMLIonOverlayElement & Requires<keyof B>, B>(element: T, opts: B): Promise<T>;
    L10:  export declare function dismissOverlay(data: any, role: string | undefined, overlays: OverlayMap, id: number): Promise<void>;
```

This can be solved by removing `& Requires<keyof B>` from the L9 in the relevant file inside the `node_modules`.

Then the build will work but upon serving the app, nothing renders in the browser and an error is thrown on the console:

![NotSupportedError](/images/NotSupportedError.png?raw=true)

**Version Affected**: `MOBILE`

## Steps to Reproduce

1. Initialize the repo
2. Serve the mobile version of the app
3. Open **https://localhost:6003**
4. Open the console in the dev tools


## Expected Behavior

The app should render normally.

