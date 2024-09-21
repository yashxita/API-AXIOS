import axios from "axios";
const API_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  fetchPosts: () => axios.get(`${API_URL}/posts`),
  fetchPost: (id: number) => axios.get(`${API_URL}/posts/${id}`),
  createPost: (post: any) => axios.post(`${API_URL}/posts`, post),
  updatePost: (id: number, post: any) => axios.put(`${API_URL}/posts/${id}`, post),
  deletePost: (id: number) => axios.delete(`${API_URL}/posts/${id}`)
};