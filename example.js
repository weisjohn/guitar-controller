var controllers = require('./index')();

if (!controllers[0]) throw new Error("No controller found");
var controller = controllers[0];

function log(val) {
    return function(arg) { console.log(val, typeof arg !== "undefined" ? arg : "") }
}

var buttons = ["Green", "Red", "Yellow", "Blue", "Orange", "Start", "Back", "Up", "Down", "Left", "Right", "Xbox"]
buttons.forEach(function(button) {
    var press = button + ".press";
    var release = button + ".release";
    controller.on(press, log(press));
    controller.on(release, log(release));
});

controller.on("X", log("X"));
controller.on("Y", log("Y"));
controller.on("Whammy", log("Whammy"));
