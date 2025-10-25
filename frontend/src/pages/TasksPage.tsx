import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  coreValueBadge?: string;
  assignedTo: any[];
  createdBy: any;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      await api.post('/tasks', newTask);
      setShowModal(false);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: 'todo' | 'doing' | 'done') => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const columns: { status: 'todo' | 'doing' | 'done'; title: string; color: string }[] = [
    { status: 'todo', title: 'To Do', color: 'bg-gray-200' },
    { status: 'doing', title: 'In Progress', color: 'bg-blue-200' },
    { status: 'done', title: 'Done', color: 'bg-green-200' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Task Board 📋</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          + New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = tasks.filter(task => task.status === column.status);
          
          return (
            <div key={column.status} className="bg-white rounded-xl p-4 shadow-lg">
              <div className={`${column.color} rounded-lg p-3 mb-4`}>
                <h2 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                  {column.title}
                  <span className="bg-white rounded-full px-2 py-1 text-sm">
                    {columnTasks.length}
                  </span>
                </h2>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {columnTasks.map((task, index) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{task.title}</h3>
                      <span className={`${getPriorityColor(task.priority)} w-3 h-3 rounded-full`} title={task.priority}></span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    {task.dueDate && (
                      <p className="text-xs text-gray-500 mb-2">
                        📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}

                    {task.coreValueBadge && (
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mb-2">
                        {task.coreValueBadge}
                      </span>
                    )}

                    <div className="flex gap-2 flex-wrap mt-3">
                      {column.status !== 'todo' && (
                        <button
                          onClick={() => updateTaskStatus(task._id, 'todo')}
                          className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          ← To Do
                        </button>
                      )}
                      {column.status !== 'doing' && (
                        <button
                          onClick={() => updateTaskStatus(task._id, 'doing')}
                          className="text-xs px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded"
                        >
                          ⏩ In Progress
                        </button>
                      )}
                      {column.status !== 'done' && (
                        <button
                          onClick={() => updateTaskStatus(task._id, 'done')}
                          className="text-xs px-2 py-1 bg-green-200 hover:bg-green-300 rounded"
                        >
                          ✓ Done
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-xs px-2 py-1 bg-red-200 hover:bg-red-300 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}

                {columnTasks.length === 0 && (
                  <p className="text-center text-gray-400 py-8">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={createTask}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Create Task
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
