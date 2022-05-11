import {Notify} from 'quasar'

export const useNotify = () => {

    const showError = function (message) {
        Notify.create({
            message,
            color: 'negative',
            actions: [
                {
                    label: 'Dismiss', color: 'white', handler: () => { /* ... */
                    }
                }
            ]
        })
    }

    const showSuccess = function (message) {
        Notify.create({
            message,
            color: 'positive',
            actions: [
                {
                    label: 'Ok', color: 'white', handler: () => { /* ... */
                    }
                }
            ]
        })
    }

    return {
        showError,
        showSuccess
    }

}