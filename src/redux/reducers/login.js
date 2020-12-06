import { LOGOUT } from '../actions/login/action_types';
export default (state = {
    token: null,
    login: false,
}, action) => {
    switch (action.type) {
        case LOGOUT: {
            window.localStorage.setItem('token', ``)
            window.localStorage.setItem('roles', ``)
            return {
                ...state,
                token: null
            };
        }
        default:
            return {
                ...state,
            };
    }
};