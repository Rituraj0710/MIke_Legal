import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout, Tabs, Typography, message, Spin, Alert } from 'antd';
import { CalendarOutlined, BarChartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import store from './store/store.jsx';
import CalendarComponent from './components/Calendar/CalendarComponent.jsx';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import TaskChart from './components/Charts/TaskChart.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, setSelectedDate } from './store/slices/tasksSlice';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title } = Typography;

const AppContent = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.tasks.selectedDate);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date.format('YYYY-MM-DD')));
    setIsModalVisible(true);
    setEditingTask(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    try {
      if (editingTask) {
        dispatch(editTask({ ...values, id: editingTask.id }));
        message.success('Task updated successfully!');
      } else {
        dispatch(addTask(values));
        message.success('Task added successfully!');
      }
      setIsModalVisible(false);
      setEditingTask(null);
      resetForm();
    } catch (error) {
      message.error('Failed to save task. Please try again.');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const tabItems = [
    {
      key: 'calendar',
      label: (
        <span>
          <CalendarOutlined />
          Calendar & Tasks
        </span>
      ),
      children: (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <Title level={3} className="mb-0">
              Task Calendar
            </Title>
            <motion.button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>+</span>
              <span>Add Task</span>
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <motion.div 
              className="order-2 xl:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CalendarComponent onDateSelect={handleDateSelect} />
            </motion.div>
            <motion.div 
              className="order-1 xl:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TaskList 
                selectedDate={selectedDate} 
                onEditTask={handleEditTask}
              />
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      key: 'charts',
      label: (
        <span>
          <BarChartOutlined />
          Analytics & Charts
        </span>
      ),
      children: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TaskChart />
        </motion.div>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-lg border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto space-y-2 sm:space-y-0">
          <Title level={2} className="mb-0 text-blue-600 text-xl sm:text-2xl font-bold">
            MikeLegal Task Manager
          </Title>
          <div className="text-sm text-gray-600 font-medium">
            Manage your daily tasks efficiently
          </div>
        </div>
      </Header>
      
      <Content className="p-4 md:p-6">
        <Tabs
          defaultActiveKey="calendar"
          items={tabItems}
          size="large"
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        />
      </Content>

      <TaskForm
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onSubmit={handleFormSubmit}
        initialValues={editingTask}
        isEdit={!!editingTask}
      />
    </Layout>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
