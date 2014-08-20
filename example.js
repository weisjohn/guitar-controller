var controllers = require('./index')();



if (!controllers[0]) throw new Error("No controller found");
var controller = controllers[0];

function log(val) {
    return function(arg) { console.log(val, typeof arg !== "undefined" ? arg : "") }
}

var buttons = ["Green", "Red", "Yellow", "Blue", "Orange", "Start", "Back", "Up", "Down", "Left", "Right", "Xbox"]
buttons.forEach(function(button) {
    controller.on("press" + button, log("pressed " + button));
    controller.on("release" + button, log("release " + button));
});

controller.on("X", log("X"));
controller.on("Y", log("Y"));
controller.on("Whammy", log("Whammy"));
