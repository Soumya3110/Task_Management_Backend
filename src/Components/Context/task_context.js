import React, { createContext, useState } from 'react';

// Create the context
export const TaskContext = createContext();

// Create the provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const addTask = (newTask, column) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: [...prevTasks[column], newTask],
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
