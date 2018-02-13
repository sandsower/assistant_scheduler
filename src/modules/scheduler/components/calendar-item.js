import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
});

const CalendarItem = ({ height, name }) => {
  return <Text style={[styles.item, { height }]}>{name}</Text>;
};

export default CalendarItem;
