/** @format */

const boardsReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_BOARDS':
			return action?.payload;
		default:
			return state;
	}
};

export default boardsReducer;
