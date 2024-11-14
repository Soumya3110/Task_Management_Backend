import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import drag and drop components
import CreateTask from '../Components/CreateTask'; // Import the CreateTask component
import './Board.css';

const Board = ({ initialTasks }) => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false); // State to manage modal visibility
  const [filter, setFilter] = useState('all'); // State for date-based filtering
  const [tasks, setTasks] = useState(initialTasks); // Tasks state initialized with initial tasks

  const openModal = () => setIsCreateTaskOpen(true); // Open the CreateTask modal
  const closeModal = () => setIsCreateTaskOpen(false); // Close the CreateTask modal

  // Function to check if task falls within the selected filter date range
  const filterTasksByDate = (task) => {
    const taskDate = new Date(task.createdDate);
    const now = new Date();

    switch (filter) {
      case 'today':
        return taskDate.toDateString() === now.toDateString();
      case 'thisWeek':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return taskDate >= startOfWeek;
      case 'thisMonth':
        return taskDate.getMonth() === new Date().getMonth() && taskDate.getFullYear() === new Date().getFullYear();
      default:
        return true; // Show all tasks if no filter is applied
    }
  };

  // Handle task movement between columns
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Do nothing if dropped outside the list or dropped in the same position
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Clone tasks to avoid direct state mutation
    const updatedTasks = { ...tasks };
    const sourceColumn = tasks[source.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    const destinationColumn = tasks[destination.droppableId];
    destinationColumn.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Welcome</h1>
        {/* Dropdown to filter by date */}
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>
      </div>

      <h3>Board</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {['backlog', 'todo', 'inProgress', 'done'].map((column) => (
            <Droppable droppableId={column} key={column}>
              {(provided) => (
                <div className="board-column" {...provided.droppableProps} ref={provided.innerRef}>
                  <h5>{column.charAt(0).toUpperCase() + column.slice(1)}</h5>
                  {column === 'todo' && (
                    <p className="add-task-btn" onClick={openModal}>
                      + 
                    </p>
                  )}
                  <div className="task-list">
                    {tasks[column]
                      .filter(task => filterTasksByDate(task))
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              className="task-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <p>{task.title}</p>
                              <small>Created on: {task.createdDate}</small>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* CreateTask Modal */}
      {isCreateTaskOpen && (
        <CreateTask closeModal={closeModal} /> // Pass closeModal to handle closing the modal
      )}
    </div>
  );
};

export default Board;
