import { Notify } from 'quasar'
export const useNotify = ()=>{

    const showError =  function(message) {
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

    return {
        showError
    }

}