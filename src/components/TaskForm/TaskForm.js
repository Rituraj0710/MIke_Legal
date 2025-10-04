import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const TaskForm = ({ visible, onCancel, onSubmit, initialValues, isEdit = false }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be less than 100 characters')
      .required('Title is required'),
    description: Yup.string()
      .max(500, 'Description must be less than 500 characters'),
    date: Yup.string().required('Date is required'),
    category: Yup.string().required('Category is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    date: dayjs().format('YYYY-MM-DD'),
    category: 'info',
    ...initialValues,
  };

  const categoryOptions = [
    { value: 'success', label: 'Success', color: 'green' },
    { value: 'warning', label: 'Warning', color: 'orange' },
    { value: 'issue', label: 'Issue', color: 'red' },
    { value: 'info', label: 'Info', color: 'blue' },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isEdit ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
          <span className="text-lg font-semibold text-gray-800">
            {isEdit ? 'Edit Task' : 'Add New Task'}
          </span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      className="rounded-xl"
      styles={{
        content: {
          borderRadius: '12px',
        },
        header: {
          borderBottom: '1px solid #f0f0f0',
          padding: '20px 24px',
        },
        body: {
          padding: '24px',
        }
      }}
    >
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
          <Form onFinish={handleSubmit} layout="vertical" className="space-y-6">
            <Form.Item
              label={<span className="text-gray-700 font-semibold">Title</span>}
              required
              validateStatus={errors.title && touched.title ? 'error' : ''}
              help={errors.title && touched.title ? errors.title : ''}
            >
              <Input
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                status={errors.title && touched.title ? 'error' : ''}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-semibold">Description</span>}
              validateStatus={errors.description && touched.description ? 'error' : ''}
              help={errors.description && touched.description ? errors.description : ''}
            >
              <TextArea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter task description (optional)"
                rows={4}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                status={errors.description && touched.description ? 'error' : ''}
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-semibold">Date</span>}
              required
              validateStatus={errors.date && touched.date ? 'error' : ''}
              help={errors.date && touched.date ? errors.date : ''}
            >
              <DatePicker
                value={dayjs(values.date)}
                onChange={(date) => setFieldValue('date', date ? date.format('YYYY-MM-DD') : '')}
                className="w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                format="YYYY-MM-DD"
                status={errors.date && touched.date ? 'error' : ''}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-semibold">Category</span>}
              required
              validateStatus={errors.category && touched.category ? 'error' : ''}
              help={errors.category && touched.category ? errors.category : ''}
            >
              <Select
                name="category"
                value={values.category}
                onChange={(value) => setFieldValue('category', value)}
                placeholder="Select category"
                className="w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                status={errors.category && touched.category ? 'error' : ''}
              >
                {categoryOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${option.color}-500`}></div>
                      <span className={`text-${option.color}-600 font-medium`}>{option.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <Button
                type="default"
                onClick={onCancel}
                className="px-8 py-3 h-auto rounded-lg font-medium border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="px-8 py-3 h-auto rounded-lg font-medium bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                loading={isSubmitting}
              >
                {isEdit ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default TaskForm;
