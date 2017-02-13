const expect = require('chai').expect;
const io     = require('socket.io-client');
const SocketTester = require('socket-tester');

const app = require('socket-tester/testServer/index');

const socketUrl = 'http://localhost:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};

const socketTester = new SocketTester(io, socketUrl, options);

describe('Sockets', function () {
  it('should check if a function is called with a given value', function(done){
    let client1 = {
      on: {
        'message': socketTester.shouldBeCalledWith('test')
      },
      emit: {
        'join room': 'room'
      }
    };

    let client2 = {
      emit: {
        'join room': 'room',
        'message': 'test'
      }
    };

    socketTester.run([client1, client2], done);
  });
});