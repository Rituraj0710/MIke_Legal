import React, { useMemo } from 'react';
import { Card, Select, Button, Row, Col, Statistic, Spin } from 'antd';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterCategory } from '../../store/slices/tasksSlice';
import dayjs from 'dayjs';

const TaskChart = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const filterCategory = useSelector(state => state.tasks.filterCategory);

  const categories = ['success', 'warning', 'issue', 'info'];
  const categoryLabels = {
    success: 'Success',
    warning: 'Warning',
    issue: 'Issue',
    info: 'Info',
  };

  const categoryColors = {
    success: '#52c41a',
    warning: '#faad14',
    issue: '#f5222d',
    info: '#1890ff',
  };

  // Memoized calculations for better performance
  const chartData = useMemo(() => {
    // Filter tasks based on category filter
    const filteredTasks = filterCategory === 'all' 
      ? tasks 
      : tasks.filter(task => task.category === filterCategory);

    // Calculate task counts per category
    const taskCounts = categories.map(category => 
      filteredTasks.filter(task => task.category === category).length
    );

    // Calculate tasks by date for line chart (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => 
      dayjs().subtract(i, 'day').format('YYYY-MM-DD')
    ).reverse();

    const tasksByDate = last7Days.map(date => 
      filteredTasks.filter(task => task.date === date).length
    );

    // Calculate completion rate (assuming tasks with 'success' category are completed)
    const completedTasks = filteredTasks.filter(task => task.category === 'success').length;
    const completionRate = filteredTasks.length > 0 ? (completedTasks / filteredTasks.length) * 100 : 0;

    return {
      taskCounts,
      tasksByDate,
      last7Days,
      completedTasks,
      completionRate,
      totalTasks: filteredTasks.length,
    };
  }, [tasks, filterCategory, categories]);

  const { taskCounts, tasksByDate, last7Days, completedTasks, completionRate, totalTasks } = chartData;

  // Prepare data for Recharts
  const barData = categories.map((cat, index) => ({
    category: categoryLabels[cat],
    count: taskCounts[index],
    color: categoryColors[cat]
  }));

  const pieData = categories.map((cat, index) => ({
    name: categoryLabels[cat],
    value: taskCounts[index],
    color: categoryColors[cat]
  }));

  const lineData = last7Days.map((date, index) => ({
    date: dayjs(date).format('MMM DD'),
    tasks: tasksByDate[index]
  }));

  // Custom colors for pie chart cells
  const COLORS = ['#52c41a', '#faad14', '#f5222d', '#1890ff'];

  const handleCategoryChange = (value) => {
    dispatch(setFilterCategory(value));
  };

  const handleResetFilter = () => {
    dispatch(setFilterCategory('all'));
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="text-sm font-semibold text-gray-700">
              Filter by Category:
            </label>
            <Select
              value={filterCategory}
              onChange={handleCategoryChange}
              className="w-full sm:w-48 h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Select category"
            >
              <Select.Option value="all">All Categories</Select.Option>
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="warning">Warning</Select.Option>
              <Select.Option value="issue">Issue</Select.Option>
              <Select.Option value="info">Info</Select.Option>
            </Select>
          </div>
          <Button 
            onClick={handleResetFilter} 
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border-gray-300 rounded-lg px-4 py-2 h-10"
          >
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Task Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
            <div className="text-sm text-blue-700 font-medium">Total Tasks</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-green-700 font-medium">Completed</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600">{completionRate.toFixed(1)}%</div>
            <div className="text-sm text-purple-700 font-medium">Completion Rate</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl text-center">
            <div className="text-sm font-bold text-orange-600 truncate">
              {filterCategory === 'all' ? 'All Categories' : categoryLabels[filterCategory]}
            </div>
            <div className="text-xs text-orange-700 font-medium">Active Filter</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bar Chart - Task Count by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="count" fill="#1890ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pie Chart - Task Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks Created Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #d9d9d9', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="#1890ff" 
                strokeWidth={2}
                dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1890ff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Category Breakdown</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={category} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div 
                className="w-6 h-6 mx-auto mb-3 rounded-full"
                style={{ backgroundColor: categoryColors[category] }}
              ></div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {taskCounts[index]}
              </div>
              <div className="text-sm text-gray-600 font-semibold mb-1">
                {categoryLabels[category]}
              </div>
              <div className="text-xs text-gray-500">
                {totalTasks > 0 ? ((taskCounts[index] / totalTasks) * 100).toFixed(1) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
