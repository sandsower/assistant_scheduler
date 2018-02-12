import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

const CalendarItem = ({ height, name }) => {
  return (
    <Text style={[styles.item, { height }]}>
      <Text>{name}</Text>
    </Text>
  );
};

export default CalendarItem;
