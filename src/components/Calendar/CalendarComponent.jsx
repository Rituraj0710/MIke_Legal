import React from 'react';
import { Calendar, Badge } from 'antd';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../../store/slices/tasksSlice';

const CalendarComponent = ({ onDateSelect }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const getListData = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    return tasks.filter(task => task.date === dateStr);
  };

  const cellRender = (value, info) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.id}>
            <Badge 
              color={getCategoryColor(item.category)} 
              text={item.title}
              className="text-xs"
            />
          </li>
        ))}
      </ul>
    );
  };

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

  const onSelect = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    dispatch(setSelectedDate(dateStr));
    if (onDateSelect) {
      onDateSelect(value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Calendar View</h3>
        <p className="text-sm text-gray-600">Click on any date to add or view tasks</p>
      </div>
      <Calendar 
        cellRender={cellRender}
        onSelect={onSelect}
        className="w-full"
      />
    </div>
  );
};

export default CalendarComponent;
