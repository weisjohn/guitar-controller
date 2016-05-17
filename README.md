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

Range events receive a value. For example:

```javascript
player1.on('x', function(val) {
    console.log(val);
});
```

### examples

1. Plug in the guitar's USB cable.
2. `node [script]` to test scripts in [examples](./examples) folder.
3. Click buttons on your remote and commence mad science.


### sample

Here's a [sample integration with baudio](https://www.instagram.com/p/r76CikGakh/). (NOTE: the lag is from spawning a child-process, not from the driver).

<video class="_c8hkj" poster="https://scontent-iad3-1.cdninstagram.com/t51.2885-15/e15/10611027_733367740062756_306429960_n.jpg?ig_cache_key=NzkxNDgxNDIwNzgzMTM1MDA5.2" src="https://scontent-iad3-1.cdninstagram.com/t50.2886-16/10627084_716851585030335_697839434_n.mp4" type="video/mp4" autoplay controls></video>

### contribution

If you have a Guitar Hero controller that isn't supported, plug your controller in and run [examples/explorer.js](./examples/explorer.js). Create an issue and paste in the console results. Pull requests welcome.
