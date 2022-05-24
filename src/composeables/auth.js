import {colorTrace, redirectToLogin, setCookie} from "../utils/myFunctions";
import router from "../router";
import {Dialog} from "quasar";

export const auth = () => {

    const checkUser = (api) => {
        api.get('https://ndo-portal.eprojecttrackers.com/check_user.php').then(d => {
            console.log(d);
        }).catch(error => {
            colorTrace(error.message, 'purple');
            redirectToLogin(error.message);
        })
    }
    return {checkUser};

}

export const setUserInitial = (response, mainStore) => {
    if (response.data.apiKey) {
        setCookie('apiKey', response.data.apiKey, 7);
        if (response.data.success) {
            Dialog.create({
                title: 'Success',
                message: 'You have successfully logged in',
                color: 'positive',
            });
            mainStore.loggedIn = true;
            mainStore.apiKey = response.data.apiKey;
            mainStore.user = response.data.user;
            router.push({name: 'Home'});
        } else {
            Dialog.create({
                title: 'Failed',
                message: 'Login failed',
                color: 'negative',
            });
        }
    }
}
