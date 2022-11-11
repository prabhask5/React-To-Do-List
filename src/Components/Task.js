import React from 'react';
import '../Styles/Task.css'
import check from '../Media/checkMark.svg';
import xMark from '../Media/xMark.svg';
import axios from 'axios';

const Task = ({orderNum, id, taskName, isComplete, time, getTaskData,}) => {

    const toggleComplete = () => {
        const data = {
            isComplete: !isComplete,
        };
        axios.post(`http://localhost:3002/task/${id}/toggle`, data).then((response) => getTaskData());
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:3002/task/${id}/delete`).then((response) => getTaskData());
    }

    let color = ''; //allows for different colors for consecutive tasks
    if (isComplete && orderNum % 2 === 1) color = '#696969';
    else if (isComplete && orderNum % 2 === 0) color = '#808080';
    else if (orderNum % 2 === 1) color = '#F0F0F0';
    else color = '#E0E0E0';

    let checkFilter = 'none'; //changes check mark and x mark colors depending on whether task is completed
    let xFilter = 'none';
    if (isComplete) {
        checkFilter = 'invert(100%) sepia(0%) saturate(5414%) hue-rotate(238deg) brightness(133%) contrast(118%)';
        xFilter = checkFilter;
    }
    else if (orderNum % 2 === 1) checkFilter = 'invert(100%) sepia(3%) saturate(224%) hue-rotate(273deg) brightness(113%) contrast(88%)';
    else if (orderNum % 2 === 0) checkFilter = 'invert(96%) sepia(0%) saturate(1505%) hue-rotate(356deg) brightness(116%) contrast(76%)';

    const taskStyle = isComplete ? "line-through" : 'none'; //strikes-through task if completed

    return <div style={{backgroundColor: color}} className="task-wrapper">
        <img src={check} style={{filter: checkFilter}} id="check" alt="check mark" />
        <p style={{textDecoration: taskStyle}} className="task-button" onClick={toggleComplete}>{taskName}</p>
        <img src={xMark} id="xmark" alt="x mark" style={{filter: xFilter}} onClick={handleDelete}/>
    </div>
}

export default Task;