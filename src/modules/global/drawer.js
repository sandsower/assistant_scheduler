import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles/drawer';

class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  _openSearch() {
    this._toggleDrawer();
    this.props.navigator.showModal({
      screen: 'movieapp.Search',
      title: 'Search',
    });
  }

  _goToMovies() {
    this._toggleDrawer();
    this.props.navigator.popToRoot({
      screen: 'movieapp.Movies',
    });
  }

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true,
    });
  }

  render() {
    const iconSearch = (
      <Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />
    );
    const iconMovies = (
      <Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />
    );
    const iconTV = <Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />;
    return (
      <View style={styles.container}>
        <Text style={styles._version}>{/* 'v1.0.0' */}</Text>
      </View>
    );
  }
}

export default Drawer;
