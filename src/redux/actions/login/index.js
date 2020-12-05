import { LOGGED } from './action_types'

export default {
    loggedIn: (data) => ({
        type: LOGGED,
        params: {
            data,
        },
    }),
};