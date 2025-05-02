import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const today = new Date();

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const groupByList = tasks.reduce((acc, task) => {
    const list = task.list || "Uncategorized";
    if (!acc[list]) acc[list] = [];
    acc[list].push(task);
    return acc;
  }, {});

  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay(); 

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white text-black relative">
     
      <aside className="w-full md:w-64 bg-white p-4 border-b md:border-r md:border-b-0">
        <h2 className="text-xl font-bold mb-6">📋 Listify</h2>

       
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            {currentMonth} {currentYear}
          </p>
          <div className="grid grid-cols-7 gap-1 text-xs text-center mt-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="font-semibold">
                {d}
              </div>
            ))}
            {Array.from({ length: (firstDayOfMonth + 6) % 7 }).map((_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === today.getDate();
              return (
                <div
                  key={dayNum}
                  className={`p-1 rounded-full ${
                    isToday ? "bg-green-300 text-white font-bold" : ""
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="mb-4">
          <h3 className="text-sm text-gray-500">Tasks</h3>
          <div className="flex justify-between my-2 bg-gray-100 p-2 rounded">
            <span>Today</span>
            <span>{tasks.length}</span>
          </div>
        </div>

        
        <div>
          <h3 className="text-sm text-gray-500">Lists</h3>
          {Object.keys(groupByList).map((list) => (
            <div key={list} className="flex justify-between my-1">
              <span>{list}</span>
              <span>{groupByList[list].length}</span>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Today</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded"
          >
            Logout
          </button>
        </header>

     
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: task.color || "#f0f0f0" }}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={() => deleteTask(task._id)}
                />
                <span>{task.title}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      
      <button
        onClick={() => navigate("/tasks1")}
        className="fixed bottom-6 right-6 bg-white text-black border border-gray-300 w-12 h-12 text-xl rounded-full shadow hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}

