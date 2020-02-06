import axios from "axios";

export const getPlacesByName = async () => {
  return axios
    .get("http://localhost:8080/names/man")
    .then(response => response.data);
};
