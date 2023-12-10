/** @format */

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_USER_INFO':
			return action?.payload;
		case 'UPDATE_USER':
			return { ...state, ...action?.payload };
		default:
			return state;
	}
};

export default authReducer;
