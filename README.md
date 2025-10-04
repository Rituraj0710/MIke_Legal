# MikeLegal Task Manager Dashboard

A modern, responsive React application for managing daily tasks with calendar integration and analytics visualization.

## 🚀 Features

### 📅 Calendar View
- Interactive calendar using Ant Design's Calendar component
- Click on any date to add/view/edit tasks
- Visual indicators for tasks on calendar dates
- Day.js integration for date handling and formatting

### 📝 Task Management
- **Add/Edit Tasks**: Comprehensive form with Formik + Yup validation
- **Task Categories**: Four categories with color coding:
  - 🟢 Success (Green)
  - 🟠 Warning (Orange) 
  - 🔴 Issue (Red)
  - 🔵 Info (Blue)
- **Task Fields**:
  - Title (required, 3-100 characters)
  - Description (optional, max 500 characters)
  - Date (auto-filled from calendar selection)
  - Category (dropdown selection)

### 📊 Analytics & Charts
- **Interactive Charts** using Recharts:
  - Bar Chart: Task count by category
  - Pie Chart: Task distribution percentage
  - Line Chart: Tasks created over time (last 7 days)
- **Category Filtering**: Filter charts by category with Apply/Reset buttons
- **Statistics Dashboard**: Total tasks, completion rate, and category breakdown

### 🎨 User Experience
- **Professional Design**: Ant Design + Tailwind CSS styling
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Real-time Updates**: Immediate UI updates with Redux state management
- **Data Persistence**: All data saved in localStorage

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **UI Library**: Ant Design 5.12.8
- **Styling**: Tailwind CSS 3.3.6
- **State Management**: Redux Toolkit + React Redux
- **Form Handling**: Formik + Yup validation
- **Charts**: Recharts
- **Date Handling**: Day.js
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   └── CalendarComponent.js
│   ├── Charts/
│   │   └── TaskChart.js
│   ├── TaskForm/
│   │   └── TaskForm.js
│   └── TaskList/
│       └── TaskList.js
├── store/
│   ├── slices/
│   │   └── tasksSlice.js
│   └── store.js
├── App.js
├── index.js
└── index.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mikelegal-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 💡 Usage

### Adding Tasks
1. Click on any date in the calendar
2. Fill out the task form with title, description, and category
3. Click "Add Task" to save

### Managing Tasks
- **Edit**: Click the edit button on any task
- **Delete**: Click the delete button and confirm
- **Filter**: Use the category filter dropdown in the task list
- **Search**: Use the search box to find specific tasks

### Viewing Analytics
1. Navigate to the "Analytics & Charts" tab
2. Use category filters to analyze specific task types
3. View comprehensive statistics and visualizations

## 🔧 Key Features Implementation

### Redux State Management
- Centralized state management with Redux Toolkit
- Automatic localStorage persistence
- Optimistic updates for smooth UX

### Form Validation
- Yup schema validation for all form fields
- Real-time validation feedback
- Professional error messaging

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements

### Performance Optimization
- Memoized calculations for chart data
- Efficient re-rendering with React best practices
- Optimized bundle size with Vite

## 🎯 Future Enhancements

- [ ] Task completion status tracking
- [ ] Due date reminders
- [ ] Task priority levels
- [ ] Export/Import functionality
- [ ] Team collaboration features
- [ ] Dark mode theme
- [ ] Task templates
- [ ] Advanced filtering options

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ for efficient task management**