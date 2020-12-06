import {LOGIN, SET_ROLE, LOGOUT} from './action_types';

export default {
    login: (data) => ({
        type: LOGIN,
        params:{
            data,
        }
    }),
    logout: (data) => ({
        type: LOGOUT,
        params:{
            data,
        }
    }),
    setRole: (data) => ({
        type: SET_ROLE,
        data,
    })
};