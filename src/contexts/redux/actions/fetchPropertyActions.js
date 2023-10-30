import API from "../../../api/django";

export const fetchPropertyRows = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await API.get("data/property_list/", config);
  } catch (error) {}
};
