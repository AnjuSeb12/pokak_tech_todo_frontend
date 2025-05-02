import React from 'react'
import TaskSidebar from '../pages/TaskSidebar'
import TaskForm from '../pages/TaskForm'

const TaskPage1 = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
    <TaskSidebar />
    <div className="flex-1 bg-white text-black p-10">
      <TaskForm />
    </div>
  </div>
  )
}

export default TaskPage1