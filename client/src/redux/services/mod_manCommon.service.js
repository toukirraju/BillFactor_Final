import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:4000/api/common/";

//////////////////// BIll ///////////////////////
const createBill = (bill) => {
  return axios
    .post(API_URL + "bill/createBill", bill, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAllBill = () => {
  return axios
    .get(API_URL + `bill`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyBill = ({ month, year }) => {
  return axios
    .get(API_URL + `bill/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//////////////////// TempBIll ///////////////////////
const getTempBill = (renterId) => {
  return axios
    .get(API_URL + `bill/tempbill/${renterId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const mod_manCommonService = {
  //////////////////// BIll ///////////////////////
  createBill,
  getAllBill,
  getMonthlyBill,
  //////////////////// TempBIll ///////////////////////
  getTempBill,
};

export default mod_manCommonService;
