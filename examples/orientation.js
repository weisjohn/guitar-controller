var controllers = require('./index')();

if (!controllers[0]) throw new Error("No controller found");
var controller = controllers[0];

function log(val) {
    return function(arg) { console.log(val, typeof arg !== "undefined" ? arg : "") }
}

var _x = 0, _y = 0;

controller.on("x", function(x) {
    _x = x;
    console.log(_x + "," + _y);
});
controller.on("y", function(y) {
    _y = y;
    console.log(_x + "," + _y);
});

