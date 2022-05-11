import {defineStore} from "pinia";

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        loggedIn: false,
        apiKey: null,
        user: null,
    })
});