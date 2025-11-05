import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";
import { getExpenses } from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchExpenses = async () => {
    const params = { startDate, endDate };
    const res = await getExpenses(params); 
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault(); 
    fetchExpenses();
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");

    const fetchAll = async () => {
      const res = await getExpenses({ startDate: "", endDate: "" });
      setExpenses(res.data);
    };
    fetchAll();
  };
  

  const refreshWithFilter = () => {
    fetchExpenses();
  };

  return (
    
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        maxWidth: "1400px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "sans-serif",
      }}
    >
        <h1
        style={{
          gridColumn: "1 / span 2",
          textAlign: "center",
          margin: 0,
          marginBottom: "1rem",
        }}
      >
        Expense Dashboard
      </h1>
      <div
        style={{
          gridColumn: "1 / span 2",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          alignItems: "center",
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          margin: "0 2rem", 
        }}
      >
        <form onSubmit={handleFilterSubmit} style={{ display: "contents" }}>
          <label style={{ fontWeight: "bold" }}>
            ตั้งแต่:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginLeft: "0.5rem", padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            ถึง:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginLeft: "0.5rem", padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}
            />
          </label>
          <button
            type="submit"
            style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#36a2eb", color: "white", cursor: "pointer", fontWeight: "bold" }}
          >
            ค้นหา
          </button>
        </form>
        <button
          onClick={handleClearFilter}
          style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "6px", backgroundColor: "white", cursor: "pointer" }}
        >
          ล้าง
        </button>
      </div>

      <div>
        <ExpenseForm onSuccess={refreshWithFilter} />
      </div>
      <div>
        <Dashboard expenses={expenses} />
      </div>

      <div
        style={{
          gridColumn: "1 / span 2",
        }}
      >
        <ExpenseList expenses={expenses} onUpdate={refreshWithFilter} />
      </div>
    </div>
  );
}

export default App;