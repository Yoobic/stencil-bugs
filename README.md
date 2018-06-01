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

When using the `IonModalController` to open a component as a modal, if the component has an `ion-content` inside of it all the `*ngIf` statements inside of it break. Any *ngIf controlled code outside the `ion-content` works as expected. Upon inspecting the DOM the following appears:

[[images/ngIf_broken]]

Removing the `ion-content` and replacing it with a `<div>` fixes the issue. When inspecting the DOM, we can see that the `*ngIf` controlled code works correctly. Inspecting the DOM, we can see that the statement is broken.

[[images/ngIf_Working_Profile]]


## Steps to Reproduce

1. Initialize the repo
2. Serve the mobile app --> `ng serve --project operations-mobile`
3. Go to `https://localhost:6003/
4. Navigate to the `News Feed` tab
5. Press the button to open the modal - this will open the faulty modal
6. Close the modal.
7. Click on the circle on the top left of the `ion-toolbar` to open a working version of the modal (without `ion-content`)


## Expected Behavior

*ngIf statements should work normally inside `ion-content` when opened in a modal.

