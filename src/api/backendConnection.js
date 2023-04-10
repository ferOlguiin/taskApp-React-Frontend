import axios from 'axios';

export const getUserRequest = async (fields) => await axios.post("http://localhost:3000/user", fields, {
    withCredentials: true
});

export const getTaskRequest = async (email) => await axios.get("http://localhost:3000/allpost/" + email);
export const createTaskRequest = async (fields) => await axios.post("http://localhost:3000/post", fields);
export const deleteTaskRequest = async (id) => await axios.delete("http://localhost:3000/post/" + id);
export const getOneTaskRequest = async (id) => await axios.get("http://localhost:3000/post/" + id);
export const editTaskRequest = async (fields, id) => await axios.put("http://localhost:3000/post/" + id, fields);