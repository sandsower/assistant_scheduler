import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import NavigationBar from 'react-native-navbar';
import SideMenu from 'react-native-side-menu';

import CalendarItem from './calendar-item';
import Menu from './menu';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
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

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <NavigationBar
            title={{
              title: 'Planner',
            }}
            rightButton={{
              title: 'Generate post',
              handler: () => alert('Generated!'),
            }}
            leftButton={{
              title: 'Menu',
              handler: () => {
                this.toggleMenu();
              },
            }}
          />
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItemsForMonth.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
          />
        </View>
      </SideMenu>
    );
  }

  loadItemsForMonth(monthDate) {
    // Fills in 15 before and 85 after the checked date
    for (let i = 0; i < 10; i++) {
      const time = monthDate.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);

      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [{ name: 'Test', height: 20 }];
      }
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

  renderItem(item) {
    return <CalendarItem height={item.height} name={item.name} />;
  }

  renderEmptyDate() {
    return <View style={styles.emptyDate} />;
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
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
});
