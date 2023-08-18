import React from "react";
import { useState } from "react";
import api from '../api/axiosConfig';

const AddTask = () =>{
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [due_date, setDue_date] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const addTask = async() =>{
        try{
            const request = api.post("/api/tasks/add", {
                title:title,
                description:description,
                due_date:due_date,
                priority:priority,
                category:category,
                status:status
            })
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
        <h3>Create a task</h3>
        <div>
            <div><label>Title</label></div>
            <input type="text" placeholder="Enter title"
              value={title}
              onChange={(event) => {
              setTitle(event.target.value);
              }}
            />
        </div>
        <div>
            <div><label>Description</label></div>
            <input type="text" placeholder="Enter Description"
              value={description}
              onChange={(event) => {
              setDescription(event.target.value);
              }}
            />
        </div>
        <div>
            <div><label>Due Date</label></div>
            <input type="date"
              value={due_date}
              onChange={(event) => {
              setDue_date(event.target.value);
              }}
            />
        </div>
        <div>
            <div><label>Priority</label></div>
            <input type="radio" id="low" name="priority" value="Low" checked onChange={(event) => {
              setPriority(event.target.value);
              }}/>
            <label for="html">Low</label>
            <input type="radio" id="medium" name="priority" value="Medium" onChange={(event) => {
              setPriority(event.target.value);
              }}/>
            <label for="css">Medium</label>
            <input type="radio" id="high" name="priority" value="High" onChange={(event) => {
              setPriority(event.target.value);
              }}/>
            <label for="javascript">High</label>
        </div>
        <div>
            <div><label>Category</label></div>
            <input type="text" placeholder="Enter Category"
              value={category}
              onChange={(event) => {
              setCategory(event.target.value);
              }}
            />
        </div>
        <div>
            <div><label>Status</label></div>
            <input type="text" placeholder="Enter Status"
              value={status}
              onChange={(event) => {
              setStatus(event.target.value);
              }}
            />
        </div>
        <button type="submit" onClick={addTask}>Add task</button>
    </div>
    )
}

export default AddTask;    