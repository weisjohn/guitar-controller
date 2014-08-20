guitar-controller
==============

Interface to a
[Guitar Hero controller](http://www.amazon.com/Guitar-Hero-2-Controller-Xbox-360/dp/B000NUIYK0/ref=sr_1_1?s=videogames&ie=UTF8&qid=1408563315&sr=1-1&keywords=guitar+hero+controller+usb).
Forked from [@weisjohn](https://github.com/weisjohn)'s [nes-controller](https://github.com/weisjohn/nes-controller) module.

`npm install guitar-controller`

### usage

```
var controllers = require('guitar-controller')();
var player1 = controllers[0];

player1.on('pressGreen', function() {
    console.log('green was pressed');
});

player1.on('releaseGreen', function() {
    console.log('green was released');
});
```

See the [example.js](example.js) file for more detailed usage.

### API

#### Buttons:

 - `pressGreen`
 - `releaseGreen`
 - `pressRed`
 - `releaseRed`
 - `pressYellow`
 - `releaseYellow`
 - `pressBlue`
 - `releaseBlue`
 - `pressOrange`
 - `releaseOrange`
 - `pressStart`
 - `releaseStart`
 - `pressBack`
 - `releaseBack`
 - `pressUp`
 - `releaseUp`
 - `pressDown`
 - `releaseDown`
 - `pressLeft`
 - `releaseLeft`
 - `pressRight`
 - `releaseRight`

#### Ranges:

 - `X`
 - `Y`
 - `Whammy`

Range events receive a value. (These update extremely frequently, it may need to be normalized).


### others

If you have a Guitar Hero controller that isn't supported, pull requests are welcome.