
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
        "green":    [4, 0x10],
        "red":      [3, 0x02],
        "yellow":   [4, 0x01],
        "blue":     [4, 0x02],
        "orange":   [4, 0x02],
        "select":   [4, 0x02],
        "start":    [4, 0x02],
    },
    "dpad" : {
        "EW" : 0,
        "NS" : 1
    }
}

function GuitarController(end) {

    var me = {};

    me.buttons = definitions.buttons;
    me.controlState = new Buffer(20);
    me.controlString = "";

    end.on("data", function(data) {

        // early bolt for optimization improvements
        if (data.toString('hex') == me.controlString) return;

        // check d-pad state
        // var analogEW = data[me.dpad.EW];
        // var analogNS = data[me.dpad.NS];

        // if (this.controlState[this.dpad.EW] != analogEW) {
        //     this.emit("analogEW", analogEW);
        //     this.emit("analog", [analogEW, analogNS]);
        // }
        // if (this.controlState[this.dpad.NS] != analogNS) {
        //     this.emit("analogNS", analogNS);
        //     this.emit("analog", [analogEW, analogNS]);
        // }

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
                    end.emit("press"+key);
                } else {
                    end.emit("release"+key);
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
        device.open();
        device.interfaces.forEach(function(inter) {
            inter.claim();
            inter.endpoints.forEach(function(end) {
                if (end.direction !== "in") return;
                end.startStream(7, end.descriptor.wMaxPacketSize);
                GuitarController(end);
                controllers.push(end);
            });
        });
    });

    return controllers;
}
