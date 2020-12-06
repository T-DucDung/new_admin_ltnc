import { LOGOUT, SET_ROLE } from '../actions/login/action_types';

export default (state = {
    token: null,
    login: false,
    role: [],
}, action) => {
    switch (action.type) {
        case LOGOUT: {
            window.localStorage.setItem('roles', ``)
            return {
                ...state,
                token: null
            };
        }
        case SET_ROLE:{
            return{
                ...state,
                role: action.data, 
            }
        }
        default:
            return {
                ...state,
            };
    }
};