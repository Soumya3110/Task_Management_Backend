import React, { useState, useContext } from 'react';
import { TaskContext } from './Context/task_context';
import del from "../Assets/Icon/delete.png";
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import './CreateTask.css';

const CreateTask = ({ closeModal }) => {
  const { addTask } = useContext(TaskContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState(null); // Initialize with null
  const [checklist, setChecklist] = useState([{ text: '', id: Date.now(), completed: false }]);

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handlePriorityClick = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handleAssignedToChange = (e) => {
    setAssignedTo(e.target.value);
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = value;
    setChecklist(newChecklist);
  };

  const handleChecklistCompletion = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setChecklist(newChecklist);
  };

  const handleChecklistKeyPress = (e, index) => {
    if (e.key === 'Enter' && checklist[index].text.trim() !== '') {
      addChecklistItem();
    }
  };

  const addChecklistItem = () => {
    setChecklist([...checklist, { text: '', id: Date.now(), completed: false }]);
  };

  const removeChecklistItem = (id) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleAddTask = () => {
    if (taskTitle.trim() && priority && checklist.length > 0) {
      const newTask = {
        title: taskTitle,
        priority,
        assignedTo,
        dueDate, // Save the selected due date
        checklist: checklist.filter(item => item.text.trim()),
      };
      addTask(newTask);
      closeModal();
    } else {
      alert('Please fill all required fields.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <label>Title <span className="required">*</span></label>
        <input
          type="text"
          placeholder="Enter Task Title"
          value={taskTitle}
          onChange={handleTaskTitleChange}
          required
        />

        <div className="priority-container">
          <label>Select Priority <span className="required">*</span></label>
          <div className={`priority-option ${priority === 'high' ? 'selected' : ''}`} onClick={() => handlePriorityClick('high')}>
            <span className="priority-circle high"></span>
            <p>HIGH PRIORITY</p>
          </div>
          <div className={`priority-option ${priority === 'medium' ? 'selected' : ''}`} onClick={() => handlePriorityClick('medium')}>
            <span className="priority-circle medium"></span>
            <p>MEDIUM PRIORITY</p>
          </div>
          <div className={`priority-option ${priority === 'low' ? 'selected' : ''}`} onClick={() => handlePriorityClick('low')}>
            <span className="priority-circle low"></span>
            <p>LOW PRIORITY</p>
          </div>
        </div>

        <label>Assign To</label>
        <input
          type="text"
          placeholder="Add an assignee"
          value={assignedTo}
          onChange={handleAssignedToChange}
        />

        <label>Checklist <span className="required">*</span></label>
        {checklist.map((item, index) => (
          <div key={item.id} className="checklist-item">
            {index === checklist.length - 1 ? (
              <input
                type="text"
                placeholder="+ Add New"
                value={item.text}
                onChange={(e) => handleChecklistChange(index, e.target.value)}
                onKeyPress={(e) => handleChecklistKeyPress(e, index)}
              />
            ) : (
              <div className='addchecklist'>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleChecklistCompletion(index)}
                />
                <span className={item.completed ? 'completed' : ''}>{item.text}</span>
                <img
                  className="delete-btn"
                  onClick={() => removeChecklistItem(item.id)} 
                  src={del} 
                  alt="delete"
                />
              </div>
            )}
          </div>
        ))}

       

        <div className="action-buttons">
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)} // Set due date on selection
          placeholderText="Select Due Date"
          className="date-picker-btn" // Custom class for styling
        />
          <input
            type="button"
            value="Cancel"
            onClick={closeModal}
            className="cancel-btn"
          />
          <input
            type="button"
            value="Save"
            onClick={handleAddTask}
            className="save-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
