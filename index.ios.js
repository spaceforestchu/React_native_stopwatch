import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds'

export default class stopwatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  }

  startStopButton = () => {

    let style = this.state.running ? styles.stopButton: styles.startButton;

    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleStartPress}
        style={[styles.button, style]}
        >
        <View>
          <Text>
            {this.state.running ? 'Stop' : 'Start'}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  handleStartPress = () => {

    if(this.state.running){
      clearInterval(this.interval)
      this.setState({
        running: false
      });
      return;
    }

    var startTime = new Date();
    this.setState({
      startTime: new Date()
    })

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    },30);

  }

  lapButton = () => {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor='gray'
        onPress={this.handleLapPress}
        >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    )
  }

  handleLapPress = () => {
    let lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  }

  laps = () => {
    return this.state.laps.map((time, index) => {
      return (
        <View style={[styles.lap, styles.solidLine]} key={index}>
          <Text style={styles.lapText}>
            Lap #{index + 1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
      )
    })
  }


  border = (color) => {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

          <View style={styles.footer}>
            {this.laps()}
          </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth:2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  },
  solidLine: {
    borderTopWidth: 1,
    borderTopColor: '#00CC00',
    borderBottomWidth: 1,
    borderBottomColor: '#00CC00',
    borderRightWidth: 1,
    borderRightColor: '#00CC00',
    borderLeftWidth: 1,
    borderLeftColor: '#00CC00',
    marginLeft: 20,
    marginRight: 20
  }
});


AppRegistry.registerComponent('stopwatch', () => stopwatch);
