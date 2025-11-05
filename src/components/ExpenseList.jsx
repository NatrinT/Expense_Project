import React from "react";
import { deleteExpense } from "../services/api";

const ExpenseList = ({ expenses, onUpdate }) => {
  const handleDelete = async (id) => {
    await deleteExpense(id);
    onUpdate();
  };

  const styles = {
    container: {
      margin: "2rem auto",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
      backgroundColor: "#ffffff",
      fontFamily: "sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "1.5rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse", 
      textAlign: "left",
    },
    th: {
      backgroundColor: "#f9f9f9", 
      padding: "12px 15px",
      borderBottom: "2px solid #ddd", 
      color: "#555",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #eee",
    },
    lastRowTd: {
      padding: "12px 15px",
      borderBottom: "none",
    },
    deleteButton: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#ff4d4d", 
      color: "white",
      fontSize: "0.9rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>รายการค่าใช้จ่าย</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>หมวดหมู่</th>
            <th style={styles.th}>จำนวนเงิน</th>
            <th style={styles.th}>รายละเอียด</th>
            <th style={styles.th}>วันที่</th>
            <th style={styles.th}>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((ex, index) => (
            <tr key={ex._id}>

              <td style={index === expenses.length - 1 ? styles.lastRowTd : styles.td}>
                {ex.category}
              </td>
              <td style={index === expenses.length - 1 ? styles.lastRowTd : styles.td}>
                {ex.amount}
              </td>
              <td style={index === expenses.length - 1 ? styles.lastRowTd : styles.td}>
                {ex.description}
              </td>
              <td style={index === expenses.length - 1 ? styles.lastRowTd : styles.td}>
                {new Date(ex.date).toLocaleDateString()}
              </td>
              <td style={index === expenses.length - 1 ? styles.lastRowTd : styles.td}>
                <button
                  onClick={() => handleDelete(ex._id)}
                  style={styles.deleteButton}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;