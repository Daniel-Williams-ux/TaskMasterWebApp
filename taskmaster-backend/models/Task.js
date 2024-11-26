const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  dueDate: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);