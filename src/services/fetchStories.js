import axios from "axios";

const BASE_URL = "http://localhost:3000/stories";

export const fetchStories = async (category, term) => {
  let response = await axios.get(`${BASE_URL}/${category}/${term}`);

  return response.data;
};

// export const fetchStoriedBasedOnPlaceId = async placeId => {
//   let response = await axios.get(
//     `${BASE_URL_FOR_SEARCH_BY_PLACE_ID}/${placeId}`
//   );

//   return response.data;
// };
