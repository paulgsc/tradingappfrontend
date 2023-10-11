import API from "../../../api/django";
import { getCsrfToken } from "../../../lib/utils";
import {
  adminAddDeviceIPAddressFailed,
  adminAddDeviceIPAddressSuccess,
  adminAddSheetsCronJobFailed,
  adminAddSheetsCronJobSuccess,
  adminEditCronJobFailed,
  adminEditCronJobSuccess,
  adminSendNewAdminInviteFailed,
  adminSendNewAdminInviteSuccessful,
  adminSetActivePropertyFailed,
  adminSetActivePropertySuccess,
  adminStageActivePropertyFailed,
  adminStageActivePropertySuccess,
  adminStartUpdate,
  adminUpdateSettingsFailed,
  adminUpdateSettingsSuccess,
  userCreateAdminAccountFailed,
  userCreateAdminAccountSuccessful,
} from "../../../reducers/adminActionsReducers";

export const updateConfigurationsSettings =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch(adminStartUpdate());

      const path = "admin/site-settings/update/";

      const {
        userAuth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await API.put(path, formData, config);

      dispatch(adminUpdateSettingsSuccess(response.data));
    } catch (error) {
      dispatch(adminUpdateSettingsFailed(error.message));
    }
  };

export const addIPAddress = (ipAddresses) => async (dispatch, getState) => {
  try {
    dispatch(adminStartUpdate());

    const {
      userAuth: { userInfo: { token = "" } = {} },
    } = getState();

    const path = "admin/update-allowed-ips/";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = {
      allowed_ip_addresses: ipAddresses.split(","),
    };

    const response = await API.put(path, formData, config);

    dispatch(adminAddDeviceIPAddressSuccess(response.data));
  } catch (error) {
    dispatch(adminAddDeviceIPAddressFailed(error.message));
  }
};

export const stageNewActivePropertyId = (propertyId) => (dispatch) => {
  try {
    dispatch(adminStartUpdate());

    dispatch(
      adminStageActivePropertySuccess({
        propertyId: propertyId,
        setToActive: true,
      })
    );
  } catch (error) {
    dispatch(adminStageActivePropertyFailed(error.message));
  }
};

export const setActiveProperty = () => async (dispatch, getState) => {
  try {
    dispatch(adminStartUpdate());

    const {
      userAuth: { userInfo: { token = "" } = {} },
      adminActions: {
        tradingActions: { propertyId },
      },
    } = getState();

    const path = `admin/properties/${propertyId}/update-active/`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": getCsrfToken(),
      },
    };

    const requestData = {};

    const response = await API.put(
      path,
      requestData, // Pass the request data as the second argument
      { ...config } // Merge the config with the request data using spread operator
    );

    dispatch(adminSetActivePropertySuccess(response.data));
  } catch (error) {
    dispatch(adminSetActivePropertyFailed(error.message));
  }
};

export const addGsheetCronJob = (data) => async (dispatch, getState) => {
  try {
    dispatch(adminStartUpdate());

    const {
      userAuth: { userInfo: { token = "" } = {} },
    } = getState();

    const path = "admin/add/sheet/cron/";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.post(path, data, config);
    dispatch(adminAddSheetsCronJobSuccess(response.data));
  } catch (error) {
    let errorMsg = "An error occurred"; // Default error message
    if (error.response && error.response.data) {
      if (typeof error.response.data === "object") {
        // If response data is an object, stringify it
        errorMsg = JSON.stringify(error.response.data);
      } else {
        // If response data is not an object, use it as is
        errorMsg = error.response.data;
      }
    } else if (error.message) {
      // If there's an error message, use it
      errorMsg = error.message;
    }

    // Dispatch the action with the error message
    dispatch(adminAddSheetsCronJobFailed(errorMsg));
  }
};

export const editCronJob =
  (data, queryParams, refetch) => async (dispatch, getState) => {
    try {
      dispatch(adminStartUpdate({ updating: data }));

      const {
        userAuth: { userInfo: { token = "" } = {} },
      } = getState();

      const path = "admin/edit_cron_job/";
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: queryParams,
      };
      const response = await API.post(path, data, config);
      dispatch(adminEditCronJobSuccess(response.data));
      refetch();
    } catch (error) {
      dispatch(
        adminEditCronJobFailed({
          message: error.message,
          ...data,
        })
      );
    }
  };

export const sendNewAdminInviteEmail =
  (formdata) => async (dispatch, getState) => {
    try {
      dispatch(adminStartUpdate());

      const {
        userAuth: { userInfo: { token = "" } = {} },
      } = getState();

      const path = "admin/send_admin_invite/";
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await API.post(path, formdata, config);

      dispatch(adminSendNewAdminInviteSuccessful(response.data));
    } catch (error) {
      dispatch(adminSendNewAdminInviteFailed(error.message));
    }
  };

export const createAdminUser = (formdata) => async (dispatch, getState) => {
  try {
    dispatch(adminStartUpdate());

    const {
      userAuth: { userInfo: { token = "" } = {} },
    } = getState();

    const path = "admin/create_admin/";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.post(path, formdata, config);

    dispatch(userCreateAdminAccountSuccessful(response.data));
  } catch (error) {
    dispatch(userCreateAdminAccountFailed(error.message));
  }
};
