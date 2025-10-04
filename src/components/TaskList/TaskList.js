import React, { useState } from 'react';
import { List, Tag, Button, Empty, Popconfirm, message, Input, Select, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, setFilterCategory } from '../../store/slices/tasksSlice';
import dayjs from 'dayjs';

const TaskList = ({ selectedDate, onEditTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const filterCategory = useSelector(state => state.tasks.filterCategory);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks by selected date, category, and search term
  const filteredTasks = tasks.filter(task => {
    const dateMatch = task.date === selectedDate;
    const categoryMatch = filterCategory === 'all' || task.category === filterCategory;
    const searchMatch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return dateMatch && categoryMatch && searchMatch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      case 'issue':
        return 'red';
      case 'info':
        return 'blue';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'issue':
        return 'Issue';
      case 'info':
        return 'Info';
      default:
        return category;
    }
  };

  const handleDelete = (taskId) => {
    try {
      dispatch(deleteTask(taskId));
      message.success('Task deleted successfully!');
    } catch (error) {
      message.error('Failed to delete task. Please try again.');
    }
  };

  const handleCategoryFilter = (value) => {
    dispatch(setFilterCategory(value));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Tasks for {dayjs(selectedDate).format('MMMM DD, YYYY')}
          </h3>
          <div className="text-sm text-gray-500">
            {filteredTasks.length} tasks
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Select
              value={filterCategory}
              onChange={handleCategoryFilter}
              className="w-full h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Filter by category"
            >
              <Select.Option value="all">All Categories</Select.Option>
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="warning">Warning</Select.Option>
              <Select.Option value="issue">Issue</Select.Option>
              <Select.Option value="info">Info</Select.Option>
            </Select>
          </div>
        </div>

        <Empty
          description={
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">
                {searchTerm || filterCategory !== 'all' ? "🔍 No tasks found matching your criteria" : "📅 No tasks found for this date"}
              </div>
              <p className="text-gray-500 text-sm">
                {searchTerm || filterCategory !== 'all' ? "Try adjusting your search or filter" : "Click on the calendar to add a new task"}
              </p>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Tasks for {dayjs(selectedDate).format('MMMM DD, YYYY')}
        </h3>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {filteredTasks.length} tasks
        </div>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Search tasks..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <Select
            value={filterCategory}
            onChange={handleCategoryFilter}
            className="w-full h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Filter by category"
          >
            <Select.Option value="all">All Categories</Select.Option>
            <Select.Option value="success">Success</Select.Option>
            <Select.Option value="warning">Warning</Select.Option>
            <Select.Option value="issue">Issue</Select.Option>
            <Select.Option value="info">Info</Select.Option>
          </Select>
        </div>
      </div>
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-base">{task.title}</h4>
                  <Tag 
                    color={getCategoryColor(task.category)} 
                    className="ml-2 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {getCategoryLabel(task.category)}
                  </Tag>
                </div>
                
                {task.description && (
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{task.description}</p>
                )}
                
                <p className="text-xs text-gray-400">
                  Created: {dayjs(task.createdAt).format('MMM DD, YYYY HH:mm')}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => onEditTask(task)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg px-3 py-2 h-auto"
                >
                  <span className="hidden sm:inline ml-1">Edit</span>
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => handleDelete(task.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: "bg-red-600 hover:bg-red-700" }}
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg px-3 py-2 h-auto"
                  >
                    <span className="hidden sm:inline ml-1">Delete</span>
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
