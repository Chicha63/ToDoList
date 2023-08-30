import React from "react";
import { useState, useEffect } from "react";
import api from '../api/axiosConfig';
import './Home.css'

const Home = () =>{
    const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/tasks/get");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateStatus = async (task, stat) => {
    try {
        const response = await api.put("/api/tasks/update",{
            id: task.id,
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            priority: task.priority,
            category: task.category,
            status: stat,
            created_at: task.created_at,
            updated_at: task.updated_at,
            user: task.user
        });
        fetchTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
  }

  const handleTaskClick = (taskId) => {
    console.log("Task clicked:", taskId);
  };

  return (
    <div className="task-board">
      <div className="column pending">
        <h3>Pending</h3>
        {tasks
          .filter((task) => task.status === "Pending")
          .map((task) => (
            <div
              className="task"
              key={task.id}
            >
                <div onClick={() => handleTaskClick(task.id)}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                </div>
              <button className="begin-button" onClick={()=>updateStatus(task, "In Progress")}>Begin</button>
            </div>
          ))}
      </div>
      <div className="column in-progress">
        <h3>In Progress</h3>
        {tasks
          .filter((task) => task.status === "In Progress")
          .map((task) => (
            <div
              className="task"
              key={task.id}
            >
              <div onClick={() => handleTaskClick(task.id)}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <button className="done-button" onClick={()=>updateStatus(task, "Done")}>Done</button>
            </div>
          ))}
      </div>
      <div className="column done">
        <h3>Done</h3>
        {tasks
          .filter((task) => task.status === "Done")
          .map((task) => (
            <div
              className="task"
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;    