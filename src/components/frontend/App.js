import React, { Component } from 'react'
import io from 'socket.io-client'
import { Center } from './Flex'

let socket = io('http://localhost:8000')
console.log(socket)

export default class App extends Component {
  constructor () {
    super()
  }

  componentDidMount() {
    console.log('listen...')
    socket.on('broadcast', (message) => {
      console.log('broadcast message', message)
    })
    socket.emit('message', 'this is a test');
  }

  render () {
    return (
      <Center>
        <h1>Hello world</h1>
      </Center>
    )
  }
}
