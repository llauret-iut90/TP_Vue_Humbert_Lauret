export default {
    state: {
        isNotifMessage: false,
        notifMessage: '',
    },
    getters: {
        isNotifMessage: state => state.isNotifMessage,
        notifMessage: state => state.notifMessage,
    },
    mutations: {
        pushNotifMessage(state, msg) {
            state.notifMessage = msg
            state.isNotifMessage = true
        },
        popNotifMessage(state) {
            state.isNotifMessage = false
        },
    },
}
