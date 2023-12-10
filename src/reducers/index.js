/** @format */

import { combineReducers } from 'redux';
import boardsReducer from './boards';
import boardReducer from './board';
import authReducer from './auth';

export default combineReducers({
	boards: boardsReducer,
	board: boardReducer,
	auth: authReducer,
});
