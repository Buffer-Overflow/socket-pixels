import React, {Component} from 'react'
import Radium from 'radium'
import Pixel from './Pixel'
import {SliderPicker} from 'react-color'

@Radium
export default class Grid extends Component {

  constructor() {
    super()
    this.state = {
      pixels: {},
      isColoring: false,
      selectedColor: '#000000'
    }
    this.onColorChange = this.onColorChange.bind(this)
  }

  componentWillMount() {
    this.socket = this.props.socket
    const {rows, columns} = this.props
    const pixels = {}

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      pixels[rowIndex] = {};
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        pixels[rowIndex][columnIndex] = {
          color: null
        }
      }
    }
    this.setState({pixels})
    this.listenToServerEvents()
  }

  dispatchServerEvent(e) {
    const eventData = e.data
    this.setState({selectedColor: eventData.selectedColor})
    switch (e.type) {
      case 'color':
        this.togglePixel(eventData.row, eventData.column, false)
      break;
    }
  }

  listenToServerEvents() {
    this.dispatchServerEvent = this.dispatchServerEvent.bind(this)
    this.socket.on('broadcast', this.dispatchServerEvent)
  }

  onMouseOut = (e) => {
    this.setState({isColoring: false})
  }

  //idea: check for e.nativeEvent.buttons == 1 || 2
  onPixelMouseDown = (e, row, column) => {
    this.setState({ isColoring: true })
    this.togglePixel(row, column)
  }

  onPixelMouseUp = (e, row, column) => {
    this.setState({isColoring: false})
  }

  onPixelMouseOver = (e, row, column) => {
    const {isColoring} = this.state
    if (isColoring) {
      this.togglePixel(row, column, true)
    }
  }

  sendTogglePixel(row, column, selectedColor) {
    this.socket.emit('message', {
      type: 'color',
      data: {row, column, selectedColor}
    })
  }

  togglePixel(row, column, send = true) {
    this.setState(({ pixels, selectedColor }, props) => ({
      pixels: {
        ...pixels,
        [row]: {
          ...pixels[row],
          [column]: {
            ...pixels[row][column],
            color: selectedColor
          }
        }
      }
    }))
    if (send) {
      this.sendTogglePixel(row, column, this.state.selectedColor)
    }
  }

  onColorChange(color) {
    this.setState({selectedColor: color && color.hex})
  }

  render() {
    const {pixels, selectedColor} = this.state
    const {rows, columns} = this.props

    return (
      <section>
        <SliderPicker color={selectedColor || '#eee'} onChangeComplete={this.onColorChange} />
        <section onMouseLeave={this.handleMouseLeave} style={[styles.matrix]}>
          {Object.keys(pixels).map((row) => (
            <section key={row} style={[styles.base]}>
              {Object.keys(pixels[row]).map((column) => (
                <Pixel
                  {...pixels[row][column]}
                  onMouseOut={(e) => this.onPixelMouseOut(e)}
                  onMouseDown={(e) => this.onPixelMouseDown(e, row, column)}
                  onMouseUp={(e) => this.onPixelMouseUp(e, row, column)}
                  onMouseOver={(e) => this.onPixelMouseOver(e, row, column)}
                  key={`pixel-${row}-${column}`}>
                </Pixel>
              ))}
            </section>
          ))}
        </section>
        <button onClick={() => this.onColorChange(null)} style={[styles.button]}>Erase</button>
      </section>
    )
  }
}

const styles = {
  base: {
    display: 'flex',
    flexFlow: 'row wrap',
    color: '#fff',
    cursor: 'pointer'
  },
  matrix: {
    marginTop: 10
  },
  button: {
    marginTop: 10
  }
}
