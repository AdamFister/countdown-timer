import { UPDATE_VARIABLE } from '../actions/updateVariable';

const movielistReducer = (state = {}, { type, payload }) => {
    console.log("reducer payload ", payload)
    switch (type) {
        case UPDATE_VARIABLE:
            return { 
                ...state,
                testVariable: !state.testVariable 
            }
        default:
            return state
    };
};

export default movielistReducer;