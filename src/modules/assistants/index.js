import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

const Assistants = ({ store, Provider }) => {
  return (
    <View style={styles.container}>
      <Text>Testing!</Text>
    </View>
  );
};

export default Assistants;
