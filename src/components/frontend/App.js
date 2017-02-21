import React, { Component } from 'react'
import io from 'socket.io-client'
import { Center } from './Flex'
import Grid from './editor/Grid';

const socket = io('http://localhost:8000')

export default class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Center>
        <Grid rows={24} columns={24} socket={socket} />
      </Center>
    )
  }
}
