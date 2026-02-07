import axios from "@/api/axiosClient";

const adminApi = {
  // Writing Management
  addWriting: (data) => {
    return axios.post("/admin/createWriting", data);
  },
  getWritings: (params) => axios.get("/writing/getwritings", { params }),
  deleteWriting: (writingId) => {
    return axios.delete(`/admin/deleteWritingById/${writingId}`);
  },
  getWritingById: (writingId) => {
    return axios.get(`/admin/getWritingById/${writingId}`);
  },
  updateWritingById: (writingId, data) => {
    return axios.put(`/admin/updateWritingById/${writingId}`, data);
  },
  importWriting: (data) => {
    return axios.post("/admin/importWriting", data);
  },
  // Writing Mangagement
};

export default adminApi;
