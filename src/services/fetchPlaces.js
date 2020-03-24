import axios from "axios";

export const getPlacesByName = place => {
  return axios
    .get(`https://climatetree-api-gateway.azurewebsites.net/places/names/${place}`)
    .then(response => response.data);
};
