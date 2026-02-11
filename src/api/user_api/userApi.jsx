import axios from "@/api/axiosClient";

const userApi = {
  // Writing Management
  getallWritings: (data) => {
    return axios.get("/writing/getwritings", { params: data });
  },
  getWritingById: (id) => {
    return axios.get(`/writing/getWritingById/${id}`);
  },
  getResult: (data) => {
    return axios.post("/writing/getresult", data);
  },
  getvocabularyandstructure: (data) => {
    return axios.post("/writing/getvocabularyandstructure", data);
  },
  getUpgradeWriting: (data) => {
    return axios.post("/writing/upgradewriting", data);
  },
  // Writing Mangagement
};

export default userApi;
