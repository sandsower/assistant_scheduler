import React, { Component, PropTypes } from 'react';
import { TextInput, View, Button, AsyncStorage, Dimensions, Text, StyleSheet } from 'react-native';
import { ASSISTANTS_KEY } from '../../../constants/strings';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    marginTop: 8,
  },
  button: {
    flex: 3,
    backgroundColor: '#00adf5',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default class CreateAssistants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Name',
    };
  }

  async create() {
    try {
      const assistants = await AsyncStorage.getItem(ASSISTANTS_KEY);
      let parsedAssistants = [];
      if (assistants !== null) {
        parsedAssistants = JSON.parse(assistants);
      }
      parsedAssistants.push({
        name: this.state.text,
        creationDate: new Date().getTime(),
        updateDate: new Date().getTime(),
      });
      await AsyncStorage.setItem(ASSISTANTS_KEY, JSON.stringify(parsedAssistants));
      this.props.onDismiss();
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 8 }}>
          <Text style={styles.title}>{this.props.title}</Text>
          <TextInput
            style={styles.name}
            onFocus={() => this.setState({ text: '' })}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            onPress={() => {
              this.create();
            }}
            title="Add Assistant"
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}
