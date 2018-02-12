/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/global/drawer';
import Scheduler from './modules/scheduler';
//import Assistants from './modules/assistants';

export function registerScreens(store, Provider) {
  console.log(Scheduler);
  Navigation.registerComponent('Scheduler', () => Scheduler, store, Provider);
  //Navigation.registerComponent('Assistants', () => Assistants, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
}
