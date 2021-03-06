import React, { Component, PropTypes } from 'react';
import { TextInput, View, Button, AsyncStorage, Dimensions, Text, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { ASSISTANTS_KEY } from '../../../constants/strings';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.5,
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
  pickTimeButton: {
    backgroundColor: '#00adf5',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
  },
  name: {
    height: 40,
  },
  selectAssistant: {
    height: 40,
  },
  selectAssistantFont: {
    fontSize: 15,
  },
});

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assistants: [],
      assistant: '',
      description: 'Description',
      title: 'Create Event',
      isDateTimePickerVisible: false,
      dateTimePicking: '',
      startTime: 'Start Time',
      endTime: 'End Time',
    };
    this.loadAssistants();
  }

  async loadAssistants() {
    try {
      const assistants = await AsyncStorage.getItem(ASSISTANTS_KEY);
      let parsedAssistants = [];
      if (assistants !== null) {
        const tempAssistants = JSON.parse(assistants);
        tempAssistants.forEach(assistant => {
          console.log('Check assistant: ' + assistant.name);
          parsedAssistants.push(assistant.name);
        });
      }
      console.log('Parsed assistants! ' + JSON.stringify(parsedAssistants));
      this.setState({ assistants: parsedAssistants });
    } catch (error) {
      console.log(error.message);
    }
  }

  async create() {
    try {
      const events = await AsyncStorage.getItem(this.props.date);
      let parsedEvents = [];
      if (parsedEvents !== null) {
        parsedEvents = JSON.parse(events);
      }
      parsedEvents.push({
        assistant: this.state.assistant,
        description: this.state.description,
        creationDate: new Date().getTime(),
        updateDate: new Date().getTime(),
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      });
      await AsyncStorage.setItem(this.props.date, JSON.stringify(parsedEvents));
      this.props.onDismiss(this.props.date, parsedEvents);
    } catch (error) {
      console.log(error.message);
    }
  }

  adjustFrame(frame) {
    frame.top = Dimensions.get('window').height * 0.4;
    frame.left = Dimensions.get('window').width * 0.17;
    return frame;
  }

  _showDateTimePicker = time => this.setState({ isDateTimePickerVisible: true, dateTimePicking: time });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ [this.state.dateTimePicking]: date.toLocaleTimeString('en-US', { hour12: false }) });
    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 6 }}>
          <Text style={styles.title}>{this.props.title}</Text>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode="time"
            datePickerModeAndroid="spinner"
          />
          <ModalDropdown
            style={styles.selectAssistant}
            options={this.state.assistants}
            textStyle={styles.selectAssistantFont}
            adjustFrame={this.adjustFrame.bind(this)}
          />
          <TextInput
            style={styles.name}
            onFocus={() => this.setState({ description: '' })}
            onChangeText={description => this.setState({ description })}
            value={this.state.description}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}
        >
          <Button
            onPress={() => {
              this._showDateTimePicker('startTime');
            }}
            title={this.state.startTime}
            style={styles.pickTimeButton}
          />
          <Button
            onPress={() => {
              this._showDateTimePicker('endTime');
            }}
            title={this.state.endTime}
            style={styles.pickTimeButton}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            onPress={() => {
              this.create();
            }}
            title="Create event"
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}
