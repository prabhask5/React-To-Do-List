import React, {useState} from 'react';
import '../Styles/NewTask.css';
import axios from 'axios';

const NewTask = ({getTaskData}) => {
    const [name, setName] = useState("");
    const handleSubmit = () => {
        if(name === "") return; //stops from adding task when add is pressed and input field is empty
        const data = {
            name,
        };
        setName("");
        axios.post('http://localhost:3002/addTask', data).then((response) => getTaskData());
    }

    return (
        <div className="new-task-wrapper">
            <input className="text-box" type="text" placeholder='Title...' value={name || ""} onChange={e => setName(e.target.value)} />
            <button className="add-button " onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
}

export default NewTask;