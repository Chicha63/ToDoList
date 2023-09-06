import React, { useContext } from "react";
import { useState, useEffect } from "react";
import api from '../api/axiosConfig';
import './Home.css'
import { Authcontext } from "../AuthContext";
import TaskModal from "./TaskModal";

const Home = () =>{
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchTasks = async () => {
      api.get('/api/tasks/get',
        ).then((res) => {
            setTasks(res.data);
            console.log(tasks)
            },fail => {
                console.log(fail);
                setTimeout(window.location.reload(true), 1000);
            })
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

  const handleTaskClick = (task) => {
    console.log("task clicked")
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
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
                <div onClick={() => handleTaskClick(task)}>
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
              <div onClick={() => handleTaskClick(task)}>
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
              onClick={() => handleTaskClick(task)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
      </div>
      <TaskModal task={selectedTask} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;    