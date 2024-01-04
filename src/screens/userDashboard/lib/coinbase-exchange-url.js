// Create a URL with query parameters
export const coinbaseAuthorizeUrl = (url, params) => {
  if (!url || !params) return "";

  const searchParams = new URLSearchParams(params);

  // Combine the base URL and query parameters
  const authorizeURL = `${url}?${searchParams.toString()}`;

  return authorizeURL;
};
