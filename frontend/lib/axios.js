import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"http://localhost:5000/api" ,  //base url for the api-common part for all the api ROUTES
  withCredentials: true,
});