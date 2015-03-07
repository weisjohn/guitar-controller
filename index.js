
var usb = require('usb');

// Guitar Hero X-plorer:
// Product ID:   0x4748                           18248
// Vendor ID:    0x1430  (RedOctane)              
// Version:  31.22
// Serial Number:    0ADD7D8
// Speed:    Up to 12 Mb/sec
// Manufacturer: RedOctane Inc(c)2006 
// Location ID:  0x14100000 / 3
// Current Available (mA):   500
// Current Required (mA):    500


var definitions = {
    "buttons": {
        "green":    [3, 0x10],
        "red":      [3, 0x20],
        "yellow":   [3, 0x80],
        "blue":     [3, 0x40],
        "orange":   [3, 0x01],
        "back":     [2, 0x20],
        "start":    [2, 0x10],
        "up":       [2, 0x02],
        "down":     [2, 0x01],
        "left":     [2, 0x04],
        "right":    [2, 0x08],
        "xbox":     [3, 0x04]
    },
    "ranges": {
        "x":        4,
        "y":        5,
        "whammy":   10,
    }
}

function GuitarController(end) {

    var me = {};

    me.buttons = definitions.buttons;
    me.ranges = definitions.ranges;
    me.controlState = new Buffer(20);
    me.controlString = "";

    end.on("data", function(data) {

        // early bolt for optimization improvements
        if (data.toString('hex') == me.controlString) return;

        for (type in me.ranges) {
            var address = me.ranges[type];
            if (me.controlState[address] !== data[address]) {
                end.emit(type, data[address]);
            }
        }

        // check buttons
        for (key in me.buttons) {
            var address = me.buttons[key];
            var chunk = address[0];
            var mask = address[1];
            if (
                // check if different from controlState
                (me.controlState[chunk] & mask) !=
                (data[chunk] & mask)
            ) {

                if ((data[chunk] & mask) === mask) {
                    end.emit(key + ".press");
                } else {
                    end.emit(key + ".release");
                }
            }
        };

        // save state to compare against next frame, update cache
        data.copy(me.controlState);
        me.controlString = me.controlState.toString('hex');
    });
}

module.exports = function() {
    var controllers = [];

    usb.getDeviceList().forEach(function(device) {
        if (device.deviceDescriptor.idProduct !== 18248) return;
        device.__open();
        device.__claimInterface(0);
        device.open();
        device.interfaces.forEach(function(inter) {
            inter.claim();
            inter.endpoints.forEach(function(end) {
                if (end.direction !== "in") return;
                end.startPoll(7, end.descriptor.wMaxPacketSize);
                GuitarController(end);
                controllers.push(end);
            });
        });
    });

    return controllers;
}
