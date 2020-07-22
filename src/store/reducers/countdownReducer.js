import { UPDATE_VARIABLE } from '../actions/updateVariable';
import { UPDATE_TEST2 } from '../actions/updateTest2';

const countdownReducer = (state = {}, { type, testVariable, test2 }) => {
    console.log("type ", type)
    console.log("testVariable ", state.testVariable)
    console.log("test2 ", state.test2)
    switch (type) {
        case UPDATE_VARIABLE:
            return {
                ...state,
                testVariable: !state.testVariable
            }
        case UPDATE_TEST2:
            return {
                ...state,
                test2: "red"
            }
        default:
            return state
    };
};

export default countdownReducer;