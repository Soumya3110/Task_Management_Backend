// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterAndLogin from './Pages/RegisterAndLogin';
import { TaskProvider } from './Components/Context/task_context';
import TaskDashboard from './Pages/TaskDashboard';



const App = () => {
  return (
    <TaskProvider>
    <Router>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route path="/taskdashboard" element={<TaskDashboard/>} />
        
     
      </Routes>
    </Router>
    </TaskProvider>
  );
};

export default App;
