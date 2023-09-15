import React, { useState } from "react";
import "./TaskModal.css"
import "./Inputs.css"
import api from '../api/axiosConfig';

const TaskModal = ({ task, isOpen, onClose, displayEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const updateTask = async (task) => {
    try {
        const response = await api.put("/api/tasks/update",{headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}},{
            id: task.id,
            title: editedTask.title,
            description: editedTask.description,
            due_date: editedTask.due_date,
            priority: editedTask.priority,
            category: editedTask.category,
            status: task.status,
            created_at: task.created_at,
            updated_at: task.updated_at,
            user: task.user
        },{headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}});
      } catch (error) {
        console.error("Error updating task:", error);
      }
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTask(task);
    setIsEditing(false);
    onClose();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        {
          isEditing ? (<span className="close-button" style={{display:"none"}} onClick={onClose}>
          &times;
        </span>):(<span className="close-button" onClick={onClose}>
          &times;
        </span>)
        }
        <div className="modal-header">
          <h2>Task Details</h2>
        </div>
        <div className="modal-body">
          {isEditing ? (
            <>
              <div className="input-container">
                <label className="custom-label">Title</label>
                <input
                  type="text"
                  className="custom-field"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
              </div>
              <div className="input-container">
                <label className="custom-label">Description</label>
                <input
                  type="text"
                  className="custom-field"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-container">
                <label className="custom-label">Due Date</label>
                <input
                  type="datetime-local"
                  className="custom-field"
                  value={editedTask.due_date}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      due_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-container">
                <label className="custom-label">Category</label>
                <input
                  type="text"
                  className="custom-field"
                  value={editedTask.category}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <button style={{marginRight:'80px', marginTop:'20px'}} className="button" onClick={handleSaveClick}>
                Save
              </button>
              <button style={{backgroundColor:"#007bff"}}  className="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
              <p>Due at: {new Date(task.due_date).toLocaleString()}</p>
              <p>Status: {task.status}</p>
              {displayEdit && (
                <button style={{width:"100px", backgroundColor:"#ffc107" }} className="button" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </>
          )}
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default TaskModal;
