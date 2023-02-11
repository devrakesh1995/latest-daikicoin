import { CONST } from '../_config';
import { store } from '../_helpers/store';
import axios from 'axios';
import { log } from 'react-native-reanimated';
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log("responseresponseresponse  ",response.data.message);
    if (response.data.error) {
        const error = (response.data.error && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export const dashboardService = {
    getClientProfile,
    addAddress,
    logout,
    getAddress,
    updatepassword,
    saveEnqiry
};

async function logout() {

}
async function saveEnqiry(formData) {
    let { users } = store.getState()


    const options = {
        url: CONST.BACKEND_URL + `/createNotification`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(formData)
    };
    return axios(options)
        .then(data => {
            // console.log("saveEnqiry ", data.data);
            let bucketObj = {
                saveEnqiry: data.data
            }
            return bucketObj;
        });
}
async function getClientProfile() {


    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/overView`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        }
    };
    return axios(options)
        .then(data => {
            // console.log("getClientProfile ", data.data.data);
            let bucketObj = {
                clientProfile: data.data.data
            }
            return bucketObj;
        });
}
async function getAddress(data) {


    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/getAddress`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            // console.log("getAddress ", data.data.data);
            let bucketObj = {
                getAddress: data.data.data
            }
            return bucketObj;
        });
}
async function addAddress(data) {

    let { users } = store.getState();
    const options = {
        url: CONST.BACKEND_URL + `/addAddress`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    console.log("options  ", options);
    return axios(options)
        .then(data => {
            console.log("addAddress ", data.data);
            let bucketObj = {
                addAddress: data.data
            }
            return bucketObj;
        });
}

async function updatepassword(data) {
    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/updatepassword`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    // console.log("updatepassword====================== ", data);
    return axios(options)
        .then(data => {

            let bucketObj = {
                updatePassword: data.data
            }
            // console.log("ddddddddddddddddddddddddddd", data.data)
            return bucketObj;
        });
}
