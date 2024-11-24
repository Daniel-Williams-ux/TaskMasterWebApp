import { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", priority: "High", dueDate: "2024-11-25" },
    { id: 2, title: "Build TaskMaster", priority: "Medium", dueDate: "2024-12-01" },
  ]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "Low", dueDate: "" });

  // Function to handle task addition
  const handleAddTask = () => {
    if (taskToEdit) {
      // Update the existing task
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      setTaskToEdit(null); // Reset edit state
    } else {
      // Add a new task
      const updatedTasks = [
        ...tasks,
        { id: tasks.length + 1, ...newTask }, // Add new task with unique ID
      ];
      setTasks(updatedTasks);
    }
  
    // Reset modal and form
    setNewTask({ title: "", priority: "Low", dueDate: "" });
    setIsModalOpen(false);
  };
  

  //Add a function to handle task deletion
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Add a function to handle edit deletion
  const [taskToEdit, setTaskToEdit] = useState(null);

  //Add Search Functionality
  const [searchQuery, setSearchQuery] = useState("");

  //Filter Tasks Based on the Search Query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  


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
        <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 rounded px-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
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
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;