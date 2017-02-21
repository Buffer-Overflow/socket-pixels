'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const chalk = require('chalk')
const minimist = require('minimist')
const argv = require('minimist')(process.argv.slice(2));

if (!argv.e) {
  argv.e = 'dev'
}

console.log(chalk.blue(
  `☆ Running server in ${argv.e} mode`
));

app.use(express.static(__dirname + argv.e == 'prod' ? '/../dist' : '/../static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8000, () => {

  console.log(chalk.blue(
    '☆ listening on localhost:8000'
  ));

  io.on('connection', (client) => {
    console.log(chalk.green(
      '⚡ Client connected'
    ));

    client.on('disconnect', () => {
      console.log(chalk.red(
        '⚡ Client disconnected'
      ));
    });

    client.on('message', (data) => {
      console.log(chalk.blue(
        '☆ Message received with data:', JSON.stringify(data)
      ));
      client.emit('broadcast', data);
      client.broadcast.emit('broadcast', data);
    });

  });

});
