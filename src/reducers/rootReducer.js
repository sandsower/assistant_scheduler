import { combineReducers } from 'redux';
import scheduler from '../modules/scheduler/scheduler.reducer';

const rootReducer = combineReducers({
  scheduler,
});

export default rootReducer;
