import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:4000/api/public/";

//////////////////// ProfileDetails ///////////////////////
const getProfileDetails = (renterId) => {
  return axios
    .get(API_URL + `profile/${renterId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const publicService = {
  getProfileDetails,
};

export default publicService;
