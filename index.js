#!/usr/bin/env node
'use strict'

var os = require('os')
var net = require('net')
var ping = require('ping')
var socket = new net.Socket()
var ifaces = os.networkInterfaces()
var address = null
var input = process.argv[2]

if (input) {
	address = input
} else {
	for (var dev in ifaces) {
		ifaces[dev].forEach((details) => {
			if (details.family == 'IPv4') {
				address = details.address
			}
		})
	}

	console.log("Your host:" + address)
}

var mas = address.split('.')

var obj = address.match(/(192|[0-9]+)\.(168|[0-9]+)\.([0-9]+)\.([0-9]+)/gi)

if (mas.length == 4) {
	for (var i = 1; i < 255; i++) {
		var host = mas[0] + '.' + mas[1] + '.' + mas[2] + '.' + i

		ping.promise.probe(host)
			.then(function (res) {
				if (res.alive) {
					console.log("Host:" + res.host)
				}
			})	
	}
}