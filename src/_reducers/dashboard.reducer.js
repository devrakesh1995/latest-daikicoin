import {
  dashboardConstants
} from '../_constants';

export function dashboard(state = {}, action) {

  switch (action.type) {

    case dashboardConstants.SUBMIT_ENQUIRY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.SUBMIT_ENQUIRY_SUCCESS:
      return {
        ...state,
        submitEnquirySuccess: true
      };
    case dashboardConstants.SUBMIT_ENQUIRY_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case dashboardConstants.CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        submitEnquirySuccess: false,
        clientProfileSuccess: false,
        makeDailyHappinessSuccess: false,
        clientProfile: action.dashboard.clientProfile,
        getEmployeeTrackerSuccess: false,
        startActivitySuccess: false,
        getExploreTrackSuccess: false
      };
    case dashboardConstants.CLIENT_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case dashboardConstants.GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        addedSuccessfully: false,
        addressList: action.dashboard.getAddress,
      };
    case dashboardConstants.GET_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case dashboardConstants.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addedSuccessfully: true,
      };
    case dashboardConstants.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.error
      };


    default:
      return state
  }
}