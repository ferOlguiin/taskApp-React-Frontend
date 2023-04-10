import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL;

export const getUserRequest = async (fields) => await axios.post(`${url}/user`, fields, {
    withCredentials: true
});

export const getTaskRequest = async (email) => await axios.get(`${url}/allpost/` + email);
export const createTaskRequest = async (fields) => await axios.post(`${url}/post`, fields);
export const deleteTaskRequest = async (id) => await axios.delete(`${url}/post/` + id);
export const getOneTaskRequest = async (id) => await axios.get(`${url}/post/` + id);
export const editTaskRequest = async (fields, id) => await axios.put(`${url}/post/` + id, fields);