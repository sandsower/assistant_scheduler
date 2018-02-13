import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import NavigationBar from 'react-native-navbar';

import CalendarItem from './components/calendar-item';
import Menu from './components/menu';
import AddButon from '../global/addButton';

export default class Scheduler extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Generate Report', // for a textual button, provide the button title (label)
        id: 'gen_report', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        showAsAction: 'always', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
      },
    ],
    leftButtons: [
      {
        id: 'accept', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        showAsAction: 'always', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'accept': // For now
        this.props.navigator.push({
          screen: 'Assistants', // unique ID registered with Navigation.registerScreen
          title: 'Manage assistants', // navigation bar title of the pushed screen (optional)
          passProps: {}, // Object that will be passed as props to the pushed screen (optional)
          animated: true, // does the push have transition animation or does it happen immediately (optional)
        });
        break;

      case 'gen_report':
        console.log('Generating!');
        break;

      default:
        console.log('huh?');
        break;
    }
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItemsForMonth.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
      </View>
    );
  };

  loadItemsForMonth(monthDate) {
    // Fills in 15 before and 85 after the checked date
    for (let i = 0; i < 10; i++) {
      const time = monthDate.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);

      // Retrieve entries here
      this.state.items[strTime] = [
        { type: 'ASSISTANT', name: 'Test 1', height: 50, date: strTime },
        { type: 'ASSISTANT', name: 'Test 2', height: 50, date: strTime },
        // { type: 'ASSISTANT', name: 'Test 3', height: 60, date: strTime },
      ];

      this.state.items[strTime].push({ type: 'ADD_EVENT', date: strTime });
    }
    //console.log(this.state.items);
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });
    this.setState({
      items: newItems,
    });
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  onAddPressed(date) {
    console.log(date);
  }

  renderItem(item) {
    if (item.type === 'ASSISTANT') {
      return (
        <View style={styles.item}>
          <CalendarItem height={item.height} name={item.name} />
        </View>
      );
    } else if (item.type === 'ADD_EVENT') {
      return (
        <View style={styles.add}>
          <AddButon date={item.date} onAddPressed={this.onAddPressed} />
        </View>
      );
    }
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <View style={styles.add}>
          <AddButon date={item.date} onAddPressed={this.onAddPressed} />
        </View>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  add: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
});
