import { LOGGED, SET_ROLE } from '../actions/login/action_types';

export default (state = {
    login: true,
    role: []
}, action) => {
    switch (action.type) {
        case LOGGED:
            return {
                ...state,
                login: action.data,
            };
        case SET_ROLE:
            return{
                ...state,
                role: action.data, 
            }
        default:
            return {
                ...state,
            };
    }
};