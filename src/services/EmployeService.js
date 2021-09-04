import http from "../http-common";

const getAll = () => {
  return http.get("/employes");
};

const get = (id) => {
  return http.get(`/employes/${id}`);
};

const create = (data) => {
  return http.post("/employes", data);
};

const update = (id, data) => {
  return http.put(`/employes/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/employes/${id}`);
};

const removeAll = () => {
  return http.delete(`/employes`);
};

const findByNom = (nom) => {
  return http.get(`/employes?nom=${nom}`);
};

const EmployeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNom,
};

export default EmployeService;