# ChromaOS Lock Screen

ChromaOS Lock Screen made for AngularJS by Finn Winchester.

[Online demo](https://finnwinchester.github.io/ChromaOS-Lock-screen/).

### Installation
Via Bower
```
bower install chromaos-lock-screen --save
```

## Get started

Include files in your ```index.html```:
```
<script src="bower_components/chromaos-lock-screen/dist/js/ChromaOSLockScreen.min.js"></script>
<link href="bower_components/chromaos-lock-screen/dist/css/ChromaOSLockScreen.min.css" rel="stylesheet" />
```

Add ```ChromaOSLockScreen``` to your AngularJS project:
```
angular.module('YourProject', ['ChromaOSLockScreen']);
```

## Usage

### Use the directive
1. Add ```ChromaOSLockScreenService``` service to your AngularJS controller.
2. Execute ```ChromaOSLockScreenService.$lock();``` to lock the screen.
3. Execute ```ChromaOSLockScreenService.$unlock();``` to unlock the screen.

## SDK

### Create custom lock screen's content
By default the lock screen will a default lock screen content, with 2 buttons to show unlock correctly effect and wrong unlock effect. If you want to create your own content just call the ```$lock``` function with parameters.

1. **template**: _String_. Template to compile and render.
2. **args**: _JSON_. Extra args to send to your compiled and rendered content (like a directive).
