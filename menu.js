import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text } from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
    paddingTop: 10,
    paddingLeft: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    marginTop: 3,
    backgroundColor: 'white',
  },
});

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Text onPress={() => onItemSelected('assistants')} style={styles.item}>
        Manage Assistants
      </Text>
      <View style={styles.separator} />
      <Text onPress={() => onItemSelected('report')} style={styles.item}>
        Generate report
      </Text>
      <View style={styles.separator} />
      <Text onPress={() => alert('For Salóme, with love \nVersion 0.1')} style={styles.item}>
        About
      </Text>
      <View style={styles.separator} />
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
