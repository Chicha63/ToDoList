import React from "react";
import { useState } from "react";
import api from '../api/axiosConfig';
import "./styles/Inputs.css"
import { useNavigate } from "react-router-dom";

const AddTask = () =>{
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const currentDate = new Date().toISOString().split(".")[0];

  const navigate = useNavigate();
  
  const addTask = async() =>{
      try{
          const request = api.post("/api/tasks/add", {
            title:title,
            description:description,
            due_date:due_date,
            priority:priority,
            category:category,
            status:"Pending"
          },{
            headers:{
              Authorization:`Bearer ${sessionStorage.getItem("token")}`}
            })
            .then(console.log("success"),
            navigate("/home"));
        }catch(err){
            console.log(err);
        }
    }

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    return(
      <div>
      <div className="add-form">
      <div className="input-container">
      <div className="custom-input">
            <div><label className="custom-label">Title</label></div>
            <input className="custom-field" type="text" placeholder="Enter title"
              value={title}
              onChange={(event) => {
              setTitle(event.target.value);
              }}
            />
        </div>
        <div className="custom-input">
            <div><label className="custom-label">Description</label></div>
            <input className="custom-field" type="text" placeholder="Enter Description"
              value={description}
              onChange={(event) => {
              setDescription(event.target.value);
              }}
            />
        </div>
        <div className="custom-input">
            <div><label className="custom-label">Due Date</label></div>
            <input className="custom-field" type="datetime-local"
              value={due_date}
              min={currentDate}
              onChange={(event) => {
              setDue_date(event.target.value);
              }}
            />
        </div>
      </div>
      <div className="input-container" style={{paddingBottom:"29px", marginLeft:"15px"}}>
      <div className="custom-input">
            <div><label className="custom-label">Category</label></div>
            <input className="custom-field" type="text" placeholder="Enter Category"
              value={category}
              onChange={(event) => {
              setCategory(event.target.value);
              }}
            />
        </div>
        <div><label className="custom-label">Priority</label></div>
      <div style={{display:"inline-flex"}}>
          <div className="radio-container">
            <input
              type="radio"
              id="low"
              name="priority"
              value="Low"
              className="radio-input"
              checked={priority === "Low"}
              onChange={handlePriorityChange}
            />
            <span className="radio-indicator"></span>
            <label className="radio-label" htmlFor="low">
              Low
            </label>
          </div>
          <div className="radio-container">
            <input
              type="radio"
              id="medium"
              name="priority"
              value="Medium"
              className="radio-input"
              checked={priority === "Medium"}
              onChange={handlePriorityChange}
            />
            <span className="radio-indicator"></span>
            <label className="radio-label" htmlFor="medium">
              Medium
            </label>
          </div>
          <div className="radio-container">
            <input
              type="radio"
              id="high"
              name="priority"
              value="High"
              className="radio-input"
              checked={priority === "High"}
              onChange={handlePriorityChange}
            />
            <span className="radio-indicator"></span>
            <label className="radio-label" htmlFor="high">
              High
            </label>
          </div>
        </div>
       
      </div>
      </div>
        <div style={{display:"flex", justifyContent:"center"}}>
          <div><button type="submit" style={{marginRight:"20px"}} className="button" onClick={addTask}>Add task</button>  </div>
          <div><button type="submit" className="button" onClick={()=>navigate("/home")} style={{backgroundColor:"#007bff"}}>Cancel</button></div>
        </div>
      </div>
    )
}

export default AddTask;    