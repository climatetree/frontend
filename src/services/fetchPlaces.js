import axios from "axios";

export const getPlacesByName = place => {
  return axios
    .get(`http://localhost:8080/names/${place}`)
    .then(response => response.data);
};
