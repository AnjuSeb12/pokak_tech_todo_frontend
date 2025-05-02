
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { MdEmojiEmotions } from "react-icons/md";

export default function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    color: "",
    tags: [],
    list: "",
    repeat: { cycle: "Daily", days: [] },
  });
  const navigate = useNavigate();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const colors = [
    "#C6F6D5", "#FAF089", "#BEE3F8", "#FBB6CE",
    "#FBD38D", "#D6BCFA", "#FED7D7", "#E2E8F0",
    "#68D391", "#81E6D9", "#A3BFFA", "#D53F8C", "#E53E3E", "#EDF2F7"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("/api/tasks", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task created successfully!");
      setForm({ title: "", description: "", color: "", tags: [], list: "", repeat: { cycle: "Daily", days: [] } });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message);
      alert("Failed to create task.");
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white rounded-xl shadow p-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          New Task <MdEmojiEmotions className="text-2xl" />
        </h2>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          View Your Task
        </button>

      </div>



      <input type="text" placeholder="Name your new task" className="w-full border rounded p-2 mb-3" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Describe your new task" className="w-full border rounded p-2 mb-3" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div className="mb-4">
        <p className="font-semibold mb-2">Card Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <div key={c} onClick={() => setForm({ ...form, color: c })} className={`w-6 h-6 rounded-full cursor-pointer border-2 ${form.color === c ? "border-black" : "border-transparent"}`} style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold mb-1">Repeat</p>
          <select className="border p-2 rounded w-full" value={form.repeat.cycle} onChange={(e) => setForm({ ...form, repeat: { ...form.repeat, cycle: e.target.value } })}>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {daysOfWeek.map((day) => (
              <button key={day} type="button" className={`border px-3 py-1 rounded ${form.repeat.days.includes(day) ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => {
                const days = form.repeat.days.includes(day) ? form.repeat.days.filter((d) => d !== day) : [...form.repeat.days, day];
                setForm({ ...form, repeat: { ...form.repeat, days } });
              }}>{day}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold mb-1">Set a tag for your task</p>
          <input type="text" placeholder="e.g., Daily Routine, Work" className="border p-2 rounded w-full" onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(tag => tag.trim()) })} />
        </div>
      </div>

      <input type="text" placeholder="List (e.g., Study Routine)" className="w-full border p-2 rounded mb-16" value={form.list} onChange={(e) => setForm({ ...form, list: e.target.value })} />

      <button type="submit" onClick={handleSubmit} className="fixed bottom-4 right-4 bg-white border-2 border-black w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition">
        ✓
      </button>
    </div>
  );
}
