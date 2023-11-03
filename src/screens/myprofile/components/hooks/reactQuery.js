import API from "../../../../api/django";

export const fetchAdminInviteToken = async (token, redirect) => {
  if (!token) throw new Error("Authentication required");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `admin/get_admin_invite_token/?redirect_url=${redirect}`;
  const response = await API.get(url, config);
  return response.data;
};
