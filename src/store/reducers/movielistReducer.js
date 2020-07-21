import { UPDATE_VARIABLE } from '../actions/updateVariable';

const movielistReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_VARIABLE:
            return { testVariable: payload }
        default:
            return state
    };
};

export default movielistReducer;