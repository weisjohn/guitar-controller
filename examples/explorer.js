var usb = require('usb');
var lo = _ = require('lodash');
var async = require('async');
var repl = require('repl');

var devices = [];

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

usb.setDebugLevel(1);

var i = 0;
_.each(usb.getDeviceList(), function(device) {

    console.log(device);

    if (device.deviceDescriptor.idProduct !== 18248) return; 
    devices.push(device);

    device.open();

    _.each(device.interfaces, function(inter) {
        inter.claim();

        _.each(inter.endpoints, function(end) {
            if (end.direction !== "in") return;
            end.startPoll(1, end.descriptor.wMaxPacketSize);
            // end.on('data', function(d) { console.log(d); });
        });

    });

});

var local = repl.start(" ಠ_ಠ > "); 
local.context.devices = devices;
