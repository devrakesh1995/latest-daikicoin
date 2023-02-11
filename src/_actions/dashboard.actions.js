import { dashboardConstants } from '../_constants';
import { dashboardService } from '../_services';
import { alertActions } from '.';

export const dashboardActions = {
    addAddress,
    getAddress,
    getClientProfile,
    updatepassword,
    saveEnqiry
};

function saveEnqiry(formData, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.saveEnqiry(formData)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.saveEnqiry && dashboard.saveEnqiry.message ? dashboard.saveEnqiry.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        // dispatch(this.getClientProfile());
                    }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.SUBMIT_ENQUIRY_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.SUBMIT_ENQUIRY_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.SUBMIT_ENQUIRY_FAILURE, error } }
}
function getClientProfile() {
    return dispatch => {
        dispatch(request());
        dashboardService.getClientProfile()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.CLIENT_PROFILE_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.CLIENT_PROFILE_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.CLIENT_PROFILE_FAILURE, error } }
}
function getAddress() {
    return dispatch => {
        dispatch(request());
        dashboardService.getAddress()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.GET_ADDRESS_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.GET_ADDRESS_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.GET_ADDRESS_FAILURE, error } }
}
function addAddress(data) {
    return dispatch => {
        dispatch(request());
        dashboardService.addAddress(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                    let message = dashboard && dashboard.addAddress && dashboard.addAddress.message ? dashboard.addAddress.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        dispatch(this.getAddress());
                    }, 500);
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.ADD_ADDRESS_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.ADD_ADDRESS_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.ADD_ADDRESS_FAILURE, error } }
}
function updatepassword(data, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.updatepassword(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.updatePassword && dashboard.updatePassword.message ? dashboard.updatePassword.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        dispatch(this.getClientProfile());
                    }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.SUBMIT_ENQUIRY_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.SUBMIT_ENQUIRY_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.SUBMIT_ENQUIRY_FAILURE, error } }
}

