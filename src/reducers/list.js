/** @format */

const boardReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_LIST_INFO':
			return action?.payload;
		default:
			return state;
	}
};

export default boardReducer;
