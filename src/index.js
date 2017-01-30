/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'mobx-react/native'

import App from 'src/containers/App'
import GameStore from 'src/stores/game'

const gameStore = new GameStore()

export class Numberz extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Provider game={gameStore}>
          <App />
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Numberz
