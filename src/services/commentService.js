import api from "../api/axios";

export const postComments = async (id, userInput) => {
  const response = await api.post(`/posts/${id}/comments`, userInput);

  return response.data;
};

export const getComments = async (id) => {
  const response = await api.get(`/posts/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};
