const BaseUrl = "https://hn.algolia.com/api/v1";

export const getSearchApi = (query, isSortedByDate) => {
  return isSortedByDate
    ? `${BaseUrl}/search_by_date?query=${query}`
    : `${BaseUrl}/search?query=${query}`;
};

export const getPostData = (postId) => {
  return `${BaseUrl}/items/${postId}`;
};
