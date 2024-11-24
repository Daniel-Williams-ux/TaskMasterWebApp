import { useState } from "react";

const Dashboard = () => {
  // Placeholder tasks (mock data)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", priority: "High", dueDate: "2024-11-25" },
    { id: 2, title: "Build TaskMaster", priority: "Medium", dueDate: "2024-12-01" },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Dashboard</h2>

      {/* Add Task Button */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Task
        </button>
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
