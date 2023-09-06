import React from "react";
import "./TaskModal.css"

const TaskModal = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
    <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="modal-header">
        <h2>Task Details</h2>
        </div>
        <div className="modal-body">
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
            <p>Due at: {new Date(task.due_date).toLocaleString()}</p>
            <p>Status: {task.status}</p>
        </div>
        <div className="modal-footer">
        </div>
    </div>
    </div>
  );
};

export default TaskModal;
