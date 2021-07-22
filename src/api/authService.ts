import axios from "axios";

const API_URL = "https://60f94e4bee56ef0017975d22.mockapi.io/";

export const getAllEmployees = () => {
  return axios.get(API_URL + "employees");
};

export const addNewEmployee = (name: string) => {
  return axios.post(API_URL + `employees`, { name });
};

export const deleteEmployee = (id: Number) => {
  return axios.delete(API_URL + `employees/${id}`);
};

export const updateEmployeeState = (id: Number, stateName: string) => {
  return axios.put(API_URL + `employees/${id}`, { state: stateName });
};
