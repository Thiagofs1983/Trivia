import { combineReducers } from 'redux';
import user from './user';
import settingReducer from './settings';

const rootReducer = combineReducers({ player: user, settingReducer });

export default rootReducer;
