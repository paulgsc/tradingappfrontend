import API from "../../../../../api/django";

export const fetchOrders = async (token, pageParam) => {
  if (!token) throw new Error("Authentication Required");
  if (!pageParam) throw new Error("Invalid page");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.get(
    `users/orders/history?page=${pageParam}&page_size=10`,
    config
  );
  return response.data;
};

export const fetchOTransfers = async (token, pageParam) => {
  if (!token) throw new Error("Authentication Required");
  if (!pageParam) throw new Error("Invalid page");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.get(
    `users/banking/transfer_history/?page=${pageParam}&page_size=10`,
    config
  );
  return response.data;
};
