import http from "./http";

const cleanParams = (params = {}) => {
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null && value !== "" && value !== "all",
  );
  return Object.fromEntries(entries);
};

const getAll = (filters) => http.get("/employees", { params: cleanParams(filters) });

const getById = (id) => http.get(`/employees/${id}`);

const create = (data) => http.post("/employees", data);

const update = (id, data) => http.put(`/employees/${id}`, data);

const remove = (id) => http.delete(`/employees/${id}`);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
