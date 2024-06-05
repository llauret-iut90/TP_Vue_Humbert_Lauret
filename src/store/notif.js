export default {
    state: {
        isNotifMessage: false,
        notifMessage: '',
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
