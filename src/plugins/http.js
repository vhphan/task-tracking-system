import axios from 'axios';
import {Notify} from "quasar";
import {colorTrace} from "../utils/myFunctions";


const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://ndo-portal.eprojecttrackers.com' : `https://${window.location.hostname}`;

const liveServer = import.meta.env.VITE_NODE_SERVER;
const devServer = import.meta.env.VITE_NODE_DEV_SERVER;

const BASE_URL_NODE = process.env.NODE_ENV === 'development' ? `${devServer}/node/tts` : `${liveServer}/node/tts`;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function createInstance(baseURL) {
    console.log(baseURL);
    console.log(getCookie('apiKey'));

    let headers = {
        'Content-Type': 'application/json',
    };
    if (process.env.NODE_ENV === 'development') {
        headers = {
            ...headers,
            ...{
                api: getCookie('apiKey'),
                Username: import.meta.env.VITE_USER_NAME,
            },

        }
    } else if (baseURL === BASE_URL_NODE) {
        headers = {...headers, Api: getCookie('apiKey'), Username: `${getCookie('Name')}`}
    }
    return axios.create({
        baseURL,
        headers,
    });
}

const addInterceptor = (instance) => {
    instance.interceptors.request.use((config) => {
        console.log(config);
        if (!config.headers.api || config.headers.api !== getCookie('apiKey')) {
            config.headers.api = getCookie('apiKey');
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const errObj = error.toJSON();
        colorTrace('from axios.js', 'red');
        colorTrace(error, 'red');
        Notify.create({
            message: errObj.message,
            type: 'negative',
            position: 'center',
        })
        const {response} = error;
        if (!response) return Promise.reject(error);

        const errorMessage = response.data?.message || error.statusText;
        Notify.create({
            message: errorMessage,
            type: 'negative',
            position: 'center',
        })
        if ([401, 403].includes(response.status)) {
            // redirectToLogin(error.message);
            Notify.create({
                message: 'You may be logged out!',
                type: 'negative',
                position: 'bottom'
            })
        }
        if (response.status !== 200) {
            Notify.create({
                message: `Something went wrong. Status code ${response.status} ${response.statusText}`,
                type: 'negative',
                position: 'bottom'
            })
        }

        return Promise.reject(error);
    });
    return instance;
}

const api = addInterceptor(createInstance(BASE_URL));

const apiNode = addInterceptor(createInstance(BASE_URL_NODE));
// const apiNode = createInstance(BASE_URL_NODE);

export {api, apiNode, BASE_URL_NODE};