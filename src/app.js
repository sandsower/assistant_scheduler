import React, { Component } from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: 'white',
  navBarTextColor: 'black',
  navBarButtonColor: 'black',
};

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Scheduler',
    title: 'Scheduler',
    navigatorStyle,
  },
  drawer: {
    left: {
      screen: 'Drawer',
    },
  },
});
