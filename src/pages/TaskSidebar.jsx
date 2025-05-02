import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { MdChecklist } from "react-icons/md";

export default function TaskSidebar() {
  const [tasks, setTasks] = useState([]);
  const [listCounts, setListCounts] = useState({});
  const [todayCount, setTodayCount] = useState(0);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allTasks = response.data;
        setTasks(allTasks);

        const todayStr = today.toISOString().slice(0, 10);
        const todayTasks = allTasks.filter(
          (task) => task.dateCreated?.slice(0, 10) === todayStr
        );
        setTodayCount(todayTasks.length);

        const listCountObj = {};
        allTasks.forEach((task) => {
          const list = task.list || "Unlisted";
          listCountObj[list] = (listCountObj[list] || 0) + 1;
        });
        setListCounts(listCountObj);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);


  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentYear, today.getMonth(), 1).getDay();
    const weeks = [];
    let day = 1 - firstDay;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++, day++) {
        if (day < 1 || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
        }
      }
      weeks.push(week);
    }
    return weeks;
  };

  const calendar = generateCalendar();

  return (
    <div className="w-64 bg-white text-black p-4 text-sm">
      <div className="flex items-center space-x-2">
      <div className="bg-blue-600 text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">📅</div>
      <h2 className="text-4xl font-bold mb-4"> Listify</h2>
      </div>
      

      
      <div className="mb-4">
        <h3 className="text-center font-semibold">
          {currentMonth} {currentYear}
        </h3>
        <div className="grid grid-cols-7 text-center mt-2 text-gray-500">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center mt-1">
          {calendar.flat().map((day, idx) => (
            <div key={idx} className="py-1">
              {day ? (
                <div
                  className={`w-6 h-6 mx-auto rounded-full ${
                    day === currentDay ? "bg-green-500 text-white" : ""
                  }`}
                >
                  {day}
                </div>
              ) : (
                <div>&nbsp;</div>
              )}
            </div>
          ))}
        </div>
      </div>

 
      <div>
        <h3 className="text-sm text-gray-500">Tasks</h3>
        <p className="font-medium my-2">
          Today <span className="float-right">{todayCount}</span>
        </p>
      </div>

     
      <div>
        <h3 className="text-sm text-gray-500">Lists</h3>
        {Object.entries(listCounts).map(([list, count]) => (
          <p key={list} className="my-1">
            {list} <span className="float-right">{count}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
