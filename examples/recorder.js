var guitar_controller = require("../index");
var controllers = require('../index')();

if (!controllers[0]) throw new Error("No controller found");
var controller = controllers[0];

var tmp = require('tmp');
var file = tmp.fileSync({ prefix: "guitar-controller-", postfix: ".log" });
console.log("\nsaving to", file.name, '\n');

var fs = require('fs');
var wstream = fs.createWriteStream(file.name);

// all events happen from a relative start
var start = Date.now();

// log returns a function that writes an event to the file
const log = name => arg => {
  var event = { time: Date.now() - start, name };
  if (arg) event.value = arg;
  wstream.write(`${JSON.stringify(event)}\n`)
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
