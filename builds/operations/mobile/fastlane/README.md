fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios createNewApp
```
fastlane ios createNewApp
```
Create a new app in the iTunes connect
### ios certificates
```
fastlane ios certificates
```
Fetch code sign profiles and certs
### ios newCerts
```
fastlane ios newCerts
```
Create new code sign profiles and certs for new devices
### ios build
```
fastlane ios build
```
Build and code sign ipa
### ios uploadRelease
```
fastlane ios uploadRelease
```
Upload a new version to the App Store
### ios testfairySlack
```
fastlane ios testfairySlack
```
Testfairy upload notification

----

## Android
### android signApk
```
fastlane android signApk
```
Code sign android apk
### android uploadRelease
```
fastlane android uploadRelease
```
Upload a new version to the Google Play
### android testfairySlack
```
fastlane android testfairySlack
```
Testfairy upload notification

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
