import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = ({ expenses }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    const chart = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels: Object.keys(grouped),
        datasets: [
          {
            data: Object.values(grouped),
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#4caf50",
              "#9c27b0",
              "#ff9800",
              "#795548", 
            ],
            borderColor: "#ffffff", 
            borderWidth: 2, 
          },
        ],
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: "bottom", 
            labels: {
              padding: 20, 
              font: {
                size: 14,
              },
            },
          },
        },
        hoverOffset: 10,
      },
    });

    return () => chart.destroy();
  }, [expenses]);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "1.5rem",
          fontFamily: "sans-serif",
        }}
      >
        สรุปค่าใช้จ่ายรายหมวดหมู่
      </h2>
      
      <div style={{ position: "relative", height: "400px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Dashboard;