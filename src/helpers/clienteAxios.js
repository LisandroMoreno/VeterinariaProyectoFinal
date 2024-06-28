import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token"));

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_DEPLOY}/api`,
});

export const config = {
  headers: {
    "Content-Type": "application/json",
    auth: `Bearer ${token}`,
  },
};

export const configImg = {
  headers: {
    "content-type": "multipart/form-data",
    auth: `Bearer ${token}`,
  },
};

export default clienteAxios;
