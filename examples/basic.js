var guitar_controller = require('../index');
var controllers = guitar_controller();

if (!controllers[0]) throw new Error("No controller found");
var controller = controllers[0];

function log(val) {
    return function(arg) { console.log(val, typeof arg !== "undefined" ? arg : "") }
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
