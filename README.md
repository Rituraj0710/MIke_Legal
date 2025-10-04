# Task Manager App

A React application built with Ant Design for managing daily tasks with calendar interface and chart visualizations.

## Features

- 📅 **Calendar View**: Interactive calendar with task indicators
- ➕ **Add/Edit Tasks**: Form-based task creation and editing with validation
- 📋 **Task Listing**: View, edit, and delete tasks for selected dates
- 📊 **Chart Visualization**: Bar and pie charts for task analytics
- 🏷️ **Category System**: Organize tasks with color-coded categories
- 🔍 **Filtering**: Filter tasks by category with reset functionality
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** - Frontend framework
- **Ant Design** - UI component library
- **Redux Toolkit** - State management
- **Formik + Yup** - Form handling and validation
- **Chart.js** - Chart visualization
- **Tailwind CSS** - Styling
- **Day.js** - Date manipulation

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Calendar View
- Click on any date to add a new task
- Tasks are displayed as colored badges on calendar dates
- Click the "Add Task" button to create a task for today

### Task Management
- **Add Task**: Fill out the form with title, description, date, and category
- **Edit Task**: Click the edit button on any task in the task list
- **Delete Task**: Click the delete button and confirm deletion
- **Categories**: Choose from Success (green), Warning (orange), Issue (red), or Info (blue)

### Analytics
- View task distribution across categories
- Filter charts by specific categories
- Reset filters to view all tasks
- See summary statistics for each category

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   └── CalendarComponent.js
│   ├── TaskForm/
│   │   └── TaskForm.js
│   ├── TaskList/
│   │   └── TaskList.js
│   └── Charts/
│       └── TaskChart.js
├── store/
│   ├── store.js
│   └── slices/
│       └── tasksSlice.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## State Management

The app uses Redux Toolkit for state management with the following structure:

- **Tasks**: Array of task objects
- **Selected Date**: Currently selected calendar date
- **Filter Category**: Active category filter for charts and lists

## Task Object Structure

```javascript
{
  id: string,
  title: string,
  description: string,
  date: string (YYYY-MM-DD),
  category: 'success' | 'warning' | 'issue' | 'info',
  createdAt: string (ISO timestamp)
}
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
