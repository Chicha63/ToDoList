import React, { useContext } from "react";
import { useState, useEffect } from "react";
import api from '../api/axiosConfig';
import './styles/Home.css'
import { Authcontext } from "../AuthContext";
import TaskModal from "./TaskModal";

const Home = () =>{
    const auth = useContext(Authcontext);
    
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDisplayed, setDisplayed] = useState(false);

    const deleteTask = async (taskId) => {
        try {
            const response = await api.post(`/api/tasks/delete/${taskId}`,{},
            {
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("token")}`
                }
            });
            auth.fetchTasks();
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
  
    const updateStatus = async (task, stat) => {
        try {
            const response = await api.put("/api/tasks/update",
            {
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
            },
            {
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("token")}`
                }
            });

            auth.fetchTasks();
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    const handleTaskClick = (task, displayEdit) => {
        console.log("task clicked")
        setSelectedTask(task);
        setIsModalOpen(true);
        setDisplayed(displayEdit)
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
        auth.fetchTasks();
    };
  
    useEffect(() => {
        auth.fetchTasks();
    }, []);
  
    return (
        <div className="task-board">
            <div className="column pending">
                <h3>Pending</h3>
                {auth.tasks
                    .filter((task) => task.status === "Pending" && new Date(task.due_date) > new Date())
                    .map((task) => (
                        <div
                            className="task"
                            key={task.id}
                            style={{
                                borderColor: task.priority === "High" ? "red" : (task.priority === "Medium" ? "yellow" : "inherit"),
                            }}
                        >
                            <div onClick={() => handleTaskClick(task, true)}>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                            </div>
                            
                            <button
                                className="begin-button"
                                onClick={() => updateStatus(task, "In Progress")}
                            >
                                Begin
                            </button>
                            <span 
                                className="delete-button" 
                                onClick={() => deleteTask(task.id)}
                            >
                                &#128465;
                            </span>
                        </div>
                    ))}
            </div>
            <div className="column in-progress">
                <h3>In Progress</h3>
                {auth.tasks
                    .filter((task) => task.status === "In Progress" && (new Date(task.due_date) > new Date()))
                    .map((task) => (
                        <div
                            className="task"
                            key={task.id}
                            style={{
                                borderColor: task.priority === "High" ? "red" : (task.priority === "Medium" ? "yellow" : "inherit"),
                            }}
                        >
                            <div onClick={() => handleTaskClick(task, true)}>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                            </div>
                            <button
                                className="done-button"
                                onClick={() => updateStatus(task, "Done")}
                            >
                                Done
                            </button>
                            <span 
                                className="delete-button" 
                                onClick={() => deleteTask(task.id)}
                            >
                                &#128465;
                            </span>
                        </div>
                    ))}
            </div>
            <div className="column done">
                <h3>Done</h3>
                {auth.tasks
                    .filter((task) => task.status === "Done")
                    .map((task) => (
                        <div
                            className="task"
                            key={task.id}
                            onClick={() => handleTaskClick(task, false)}
                            style={{
                                borderColor: task.priority === "High" ? "red" : (task.priority === "Medium" ? "yellow" : "inherit"),
                            }}
                        >
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            
                        </div>
                    ))}
            </div>
            <div className="column due">
                <h3>Due</h3>
                {auth.tasks
                    .filter((task) => new Date(task.due_date) < new Date() && task.status != "Done")
                    .map((task) => (
                        <div
                            className="task"
                            key={task.id}
                            onClick={() => handleTaskClick(task, false)}
                            style={{
                                borderColor: task.priority === "High" ? "red" : (task.priority === "Medium" ? "yellow" : "inherit"),
                            }}
                        >
                            <div>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                            </div>
                            <button style={{backgroundColor: "red"}}
                                className="done-button"
                                onClick={() => updateStatus(task, "Done")}
                            >
                                Mark as done
                            </button>
                            <span 
                                className="delete-button" 
                                onClick={() => deleteTask(task.id)}
                            >
                                &#128465;
                            </span>
                        </div>
                    ))}
            </div>
            <TaskModal task={selectedTask} isOpen={isModalOpen} onClose={closeModal} displayEdit={isDisplayed}/>
        </div>
    );
};

export default Home;