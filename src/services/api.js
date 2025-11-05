import axios from "axios";

// 💡 1. Vite ใช้ 'import.meta.env.VITE_...'
//    และชื่อตัวแปรต้องขึ้นต้นด้วย VITE_
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/expenses";

export const getExpenses = (params) => axios.get(API_URL, { params });
export const createExpense = (data) => axios.post(API_URL, data);
export const updateExpense = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);