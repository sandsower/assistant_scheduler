import React, { Component, PropTypes } from 'react';
import { Text, View, Button, ScrollView, ToastAndroid, StyleSheet, AsyncStorage } from 'react-native';

import { AddButton } from '../global/addButton';
import { ASSISTANTS_KEY } from '../../constants/strings';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#00adf5',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assistant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: '#000000',
    margin: 5,
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
});

export default class Assistants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assistants: [],
    };
    this.loadAssistants();
  }

  onAddAssistant = () => {
    this.props.navigator.showLightBox({
      screen: 'Assistants.create', // unique ID registered with Navigation.registerScreen
      passProps: { onDismiss: this.onDismissAssistantCreate.bind(this) }, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: 'black', // tint color for the background, you can specify alpha here (optional)
      },
    });
  };

  onDismissAssistantCreate = () => {
    this.props.navigator.dismissLightBox();
    this.loadAssistants();
  };

  async loadAssistants() {
    try {
      const assistants = await AsyncStorage.getItem(ASSISTANTS_KEY);
      let parsedAssistants = [];
      if (assistants !== null) {
        parsedAssistants = JSON.parse(assistants);
      }
      this.setState({ assistants: parsedAssistants });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.state.assistants.map((item, index) => (
            <View key={item.creationDate} style={styles.assistant}>
              <Text>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Button
          onPress={() => {
            this.onAddAssistant();
          }}
          title="Add Assistant"
          style={styles.button}
        />
      </View>
    );
  }
}
