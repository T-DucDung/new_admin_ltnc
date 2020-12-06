import { LOGGED, SET_ROLE } from './action_types'

export default {
    loggedIn: (data) => ({
        type: LOGGED,
        params: {
            data,
        },
    }),
    setRole: (data) => ({
        type: SET_ROLE,
        data,
    })
};