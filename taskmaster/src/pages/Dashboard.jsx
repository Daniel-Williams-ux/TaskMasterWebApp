import { useState, useEffect } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // Initial state for tasks

  // Fetch tasks from backend on load
  console.log("API URL:", import.meta.env.VITE_API_URL);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data); // Update the state with the fetched tasks
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "Low", dueDate: "" });
  const [taskToEdit, setTaskToEdit] = useState(null); // Track task being edited

  // Function to handle task addition and editing
  const handleAddTask = async () => {
    if (taskToEdit) {
      // Update the task via the backend
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error("Failed to update task");

        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      // Add a new task via the backend
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error("Failed to add task");

        const createdTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, createdTask]); // Add the new task to the list
      } catch (error) {
        console.error(error);
      }
    }

    // Reset modal and form
    setNewTask({ title: "", priority: "Low", dueDate: "" });
    setIsModalOpen(false);
    setTaskToEdit(null); // Reset edit state
  };

  // Function to handle task deletion
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update the local state
    } catch (error) {
      console.error(error);
    }
  };

  // Add Search Functionality
  const [searchQuery, setSearchQuery] = useState("");

  // Add Priority Filter State
  const [filterPriority, setFilterPriority] = useState("All");

  // Filter Tasks Based on the Search Query
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Dashboard</h2>

      {/* Add Task Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>

        <div className="flex gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 rounded px-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
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
                <button
                  onClick={() => {
                    setTaskToEdit(task);
                    setNewTask(task); // Populate modal fields
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No tasks available.</p>
        )}
      </div>

      {/* Modal for Adding Tasks */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">
              {taskToEdit ? "Edit Task" : "Add New Task"}
            </h3>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Task Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTaskToEdit(null); // Reset edit state
                  setNewTask({ title: "", priority: "Low", dueDate: "" }); // Reset form
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {taskToEdit ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;