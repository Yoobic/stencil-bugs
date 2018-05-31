fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

## Choose your installation method:

| Method                     | OS support                              | Description                                                                                                                           |
|----------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| [Homebrew](http://brew.sh) | macOS                                   | `brew cask install fastlane`                                                                                                          |
| Installer Script           | macOS                                   | [Download the zip file](https://download.fastlane.tools). Then double click on the `install` script (or run it in a terminal window). |
| RubyGems                   | macOS or Linux with Ruby 2.0.0 or above | `sudo gem install fastlane -NV`                                                                                                       |

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
### ios debugbuild
```
fastlane ios debugbuild
```
Build and code sign debug ipa
### ios build
```
fastlane ios build
```
Build and code sign release ipa
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
