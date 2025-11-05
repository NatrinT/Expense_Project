import axios from "axios";

// 💡 แบบใหม่ (Dynamic)
// Vercel จะใส่ค่าจริงให้ตอน build
// ถ้าไม่เจอมันจะใช้ localhost (ตอน dev)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/expenses";

export const getExpenses = (params) => axios.get(API_URL, { params });
export const createExpense = (data) => axios.post(API_URL, data);
export const updateExpense = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);