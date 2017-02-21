'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const chalk = require('chalk')
const minimist = require('minimist')
const argv = require('minimist')(process.argv.slice(2));

class Server {

  constructor() {
    this.port = 8000
    this.setEnvironment()
    this.initExpressApp()
    this.listenForConnections()
  }

  setEnvironment() {
    if (!argv.e) {
      argv.e = 'dev'
    }
    console.log(chalk.blue(
      `☆ Running server in ${argv.e} mode`
    ));
  }

  initExpressApp() {
    app.use(express.static(__dirname + argv.e == 'prod' ? '/../dist' : '/../static'));

    app.get('/', function(req, res) {
      res.sendFile(__dirname + '/index.html');
    });
  }

  listenForConnections() {
    this.onListen = this.onListen.bind(this)
    server.listen(this.port, this.onListen);
  }

  printServerMessage(message) {
    console.log(chalk.blue('☆ ' + message));
  }

  printClientMessage(message) {
    console.log(chalk.green('⚡ ' + message));
  }

  onListen() {
    this.printServerMessage('listening on localhost:8000')
    io.on('connection', (client) => {
      this.printClientMessage('Client connected')
      client.on('disconnect', () => {
        this.printClientMessage('Client disconnected')
      });
      client.on('message', (data) => {
        this.printServerMessage(`Message received with data: ${JSON.stringify(data)}`)
        //client.emit('broadcast', data);
        client.broadcast.emit('broadcast', data);
      });
    });
  }

}

module.exports = Server;
