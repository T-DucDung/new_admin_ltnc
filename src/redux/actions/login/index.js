import {LOGIN, UPDATETOKEN, LOGOUT} from './action_types';

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
};