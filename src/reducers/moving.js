/** @format */

const movingReducer = (state = {}, action) => {
	switch (action.type) {
		case 'START_DRAG':
			return { start: action?.payload };
		case 'DROP':
			return { ...state, end: action?.payload };
		case 'END':
			return {};
		default:
			return state;
	}
};

export default movingReducer;
