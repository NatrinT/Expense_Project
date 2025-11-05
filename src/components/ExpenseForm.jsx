import React, { useState } from "react";
import { createExpense } from "../services/api";

const categoryOptions = [
  "ค่าเดินทาง",
  "ค่าของกิน",
  "ค่าของจิปาทะ",
  "ค่าของใช้ในบ้าน",
];

const ExpenseForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense(form);
    setForm({ category: "", amount: "", description: "" });
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input
        placeholder="หมวดหมู่ (เลือกหรือพิมพ์)" 
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        list="category-options" 
        style={{
          padding: "12px 15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "1rem",
          fontFamily: "sans-serif",
        }}
      />
      <datalist id="category-options">
        {categoryOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>

      <input
        placeholder="จำนวนเงิน"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
        style={{
          padding: "12px 15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "1rem",
          fontFamily: "sans-serif",
        }}
      />
      <input
        placeholder="รายละเอียด"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{
          padding: "12px 15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "1rem",
          fontFamily: "sans-serif",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px 15px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#4caf50",
          color: "white",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "0.5rem",
        }}
      >
        บันทึก
      </button>
    </form>
  );
};

export default ExpenseForm;