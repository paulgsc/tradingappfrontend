import API from "../../../../api/django";

export const requestNewInviteLink = async (setLoading, token) => {
  try {
    if (!token) throw new Error("Authentication required");
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `emails/request_admin_invite/`;
    const response = await API.get(url, config);
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    return;
  }
};
