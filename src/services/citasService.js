import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/citas';

export const citasService = {
  getAllCitas() {
    return axios.get(apiUrl, {
        headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
        },
      });
  },
  getCita(id) {
    return axios.get(`${apiUrl}/${id}`, {
        headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
        },
      });
  },
  createCita(citaData) {
    return axios.post(apiUrl, citaData, {
        headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
        },
      });
  },
  updateCita(id, citaData) {
    return axios.put(`${apiUrl}/${id}`, citaData, {
        headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
        },
      });
  },
  deleteCita(id) {
    return axios.delete(`${apiUrl}/${id}`, {
        headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
        },
      });
  }
};