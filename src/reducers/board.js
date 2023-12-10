/** @format */

const boardReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_BOARD_INFO':
			return action?.payload;
		case 'UPDATE_BOARD':
			return action?.payload;
		case 'DELETE_BOARD':
			return action?.payload;
		default:
			return state;
	}
};

export default boardReducer;
