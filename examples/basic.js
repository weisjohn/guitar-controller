var controllers = require('../index')();

if (!controllers[0]) throw new Error("No controller found");
var controller = controllers[0];

function log(val) {
    return function(arg) { console.log(val, typeof arg !== "undefined" ? arg : "") }
}

var buttons = ["green", "red", "yellow", "blue", "orange", "start", "back", "up", "down", "left", "right", "xbox"]
buttons.forEach(function(button) {
    var press = button + ".press";
    var release = button + ".release";
    controller.on(press, log(press));
    controller.on(release, log(release));
});

controller.on("x", log("x"));
controller.on("y", log("y"));
controller.on("whammy", log("whammy"));
