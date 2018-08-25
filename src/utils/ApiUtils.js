/* global fetch */
import axios from 'axios'

export const callApi = async (url, method = "get", data = null, options = {}, returnPromise = false) => {
    let config = options !== null && typeof options === 'object' ? options : {};

    config.url = url;
    config.method = method;

    if(data !== null) {
        config.data = data;
    }

    if(!config.params) {
        config.params = {};
    }

    if(returnPromise) {
        return axios(config);
    } else {
        return axios(config)
        .then(
            response => (
                response.data.response === "success" ?
                response.data.data :
                Promise.reject({status: 200, message: response.data.message})),
            error => {
                if(!isCancelError(error)) {
                    return Promise.reject({status: error.response.status, message: error.message});
                } else {
                    return Promise.reject(error);
                }
            }

        );
    }
};

export const isCancelError = (error) => axios.isCancel(error);

export const getCancelToken = () => {
    const CancelToken = axios.CancelToken;
    let cancelCallback;
    let cancelTokenSource = new CancelToken((c) => {
        // An executor function receives a cancel function as a parameter
        cancelCallback = c;
    });

    return {
        token: cancelTokenSource,
        callback: cancelCallback
    };
};