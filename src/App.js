import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './components/Router';
import reducers from './reducers';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle='light-content'
          />
          <Router />
        </View>
      </Provider>
    );
  }
}

export default App;
