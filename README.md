guitar-controller
==============

Interface to a
[Guitar Hero controller](http://www.amazon.com/Guitar-Hero-2-Controller-Xbox-360/dp/B000NUIYK0/ref=sr_1_1?s=videogames&ie=UTF8&qid=1408563315&sr=1-1&keywords=guitar+hero+controller+usb).

### usage

```
var controllers = require('guitar-controller')();
var player1 = controllers[0];

player1.on('green.press', function() {
    console.log('green was pressed');
});

player1.on('green.release', function() {
    console.log('green was released');
});
```

See the [example.js](example.js) file for more detailed usage.

### API

##### Buttons:

The controller has the following buttons:

 - green
 - red
 - yellow
 - blue
 - orange
 - start
 - back
 - up
 - down
 - left
 - right
 - xbox

For each button, a `press` and `release` event exist:

 - `green.press`
 - `green.release`
 - `red.press`
 - `red.release`
 - `yellow.press`
 - `yellow.release`
 - `blue.press`
 - `blue.release`
 - `orange.press`
 - `orange.release`
 - `start.press`
 - `start.release`
 - `back.press`
 - `back.release`
 - `up.press`
 - `up.release`
 - `down.press`
 - `down.release`
 - `left.press`
 - `left.release`
 - `right.press`
 - `right.release`
 - `xbox.press`
 - `xbox.release`


##### Ranges:

 - `x`
 - `y`
 - `whammy`

Range events receive a value. (These update extremely frequently, it may need to be normalized).

For example:

```javascript
player1.on('x', function(val) {
    console.log(val);
});
```

### examples

1. Plug in the guitar's USB cable.
2. `node [script]` to test scripts in [examples](./examples) folder.
3. Click buttons on your remote and commence mad science.


### contribution

If you have a Guitar Hero controller that isn't supported, pull requests are welcome.
