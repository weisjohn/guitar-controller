var guitar_controller = require("../index");

var fs = require("fs");
var readline = require("readline");

// toggle-able printing of full eevent
var debug = process.env.DEBUG;

// assume filename is last arg
var filename = process.argv[process.argv.length - 1];
console.log('\nreading from', filename);

const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
});

// fake controller
var EventEmitter = require("events");
var controller = new EventEmitter();

// file read into array (node streams probably can do better?)
var events = [];
var done = false;
readInterface.on("line", function(line) {
    events.push(JSON.parse(line));
});
readInterface.on('close', function() {
    done = true;
});

// timing loop to handle events
var start = Date.now();
function loop() {
    var event = events[0];
    if (!event || !event.time) {
        if (done) return;
        return setImmediate(loop);
    }
    if ((Date.now() - start) > event.time) {
        if (debug) console.log(event);
        controller.emit(event.name, event.value);
        events.shift();
    }
    setImmediate(loop);
}
setImmediate(loop);

// log returns a function that writes an event to the file
const log = name => arg => {
  console.log(name, typeof arg !== "undefined" ? arg : "");
}

Object.keys(guitar_controller.buttons).forEach(function(button) {
  var press = button + ".press";
  var release = button + ".release";
  controller.on(press, log(press));
  controller.on(release, log(release));
});

Object.keys(guitar_controller.ranges).forEach(function(range) {
  controller.on(range, log(range));
});
