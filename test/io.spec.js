var cfg = require('../cfg').cfg();
var io = require('socket.io-client');
var expect = require('expect.js');
var assert = require('assert');

var httpLoc = cfg.url+':' + cfg.port
console.log(httpLoc)
describe('io/sio module tests', function() {

    var socket;

    beforeEach(function(done) {
        // Setup
        socket = io.connect(httpLoc, {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });
        socket.on('connect', function() {
            console.log('connected...');
            done();
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        })
    });

    afterEach(function(done) {
        if(socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            console.log('no connection to break...');
        }
        done();
    });

    describe('socket.io-client to localhost:5000', function() {

        it('emit-switchLid & message = on-itemChanged message', function(done) {
            var mes = {};
            mes.mess =  'my dog has fleas';
            socket.emit('switchLid','uli');
            socket.emit('message', mes);
            console.log('switched lid and emitted message')
            socket.on('itemChanged', function(data){
                console.log(data)
                expect(data.mess).to.be.equal(mes.mess);
                done();
            });
        });
        it('another emit-switchLid & message = on-itemChanged message', function(done) {
            var mes = {};
            mes.mess =  'my cat is mean';
            socket.emit('switchLid','mabibi');
            socket.emit('message', mes);
            console.log('switched lid and emitted message')
            socket.on('itemChanged', function(data){
                console.log(data)
                expect(data.mess).to.be.equal(mes.mess);
                done();
            });
        });

        it('message from client in room is replied with message to room', function(done) {
            var mes = {};
            mes.mess =  'my frog has cats';
            socket.emit('switchLid','mabibi');
            socket.emit('message to room', mes);
            console.log('switched lid and emitted message')
            socket.on('roomMessage', function(data){
                console.log(data)
                expect(data.mess).to.be.equal(mes.mess);
                done();
            });
        });

    });

});