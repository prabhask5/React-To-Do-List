import React, {useState, useEffect} from 'react';
import '../Styles/Feed.css';
import Task from './Task';
import NewTask from './NewTask';
import axios from 'axios';

const Feed = () => {
    const [data, setData] = useState();
    const [filterState, setFilterState] = useState(0); //0 is all, 1 is unfinished, 2 is completed

    const getTaskData =  () => {
        if(filterState === 0) getAllTaskData();
        else if(filterState === 1) getUnfinishedTaskData();
        else if(filterState === 2) getCompletedTaskData();
    };

    const getAllTaskData = () => {
        axios.get('http://localhost:3002/allTasks')
        .then((data) => setData(data.data))
        .catch((error) => console.log(error));
    };

    const getUnfinishedTaskData = () => {
        axios.get('http://localhost:3002/unfinishedTasks')
        .then((data) => setData(data.data))
        .catch((error) => console.log(error));
    };

    const getCompletedTaskData = () => {
        axios.get('http://localhost:3002/completedTasks')
        .then((data) => setData(data.data))
        .catch((error) => console.log(error));
    };

    const handleSort = (sortType) => {
        const data = {
            sortType: sortType,
        };
        axios.post('http://localhost:3002/sort', data)
        .then((response) => getTaskData())
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterState]);

    let orderNum = 1; //allows different colors for consecutive tasks

    let viewTitle = "" //displays current filter view
    if(filterState === 0) viewTitle = "All Tasks";
    else if(filterState === 1) viewTitle = "Unfinished Tasks";
    else if(filterState === 2) viewTitle = "Completed Tasks";

    return (
        <div className="feed-wrapper">
            <div className="feed-header">
                <h1 className="title" id="feed-title">My To Do List</h1>
                <NewTask getTaskData={getTaskData}/>
                <div className="button-wrapper">
                    {filterState === 0 || filterState === 1 ?
                        <button className="change-button" id="left-box" onClick={() => {setFilterState(2);}}>View Completed Tasks</button>
                    :
                        <button className="change-button" id="left-box" onClick={() => {setFilterState(0);}}>View All Tasks</button>
                    }
                    <h1 className="title">Current View: {viewTitle}</h1>
                    {filterState === 0 || filterState === 2 ?
                        <button className="change-button" id="right-box" onClick={() => {setFilterState(1);}}>View Unfinished Tasks</button>
                    :
                        <button className="change-button" id="right-box" onClick={() => {setFilterState(0);}}>View All Tasks</button>
                    }
                </div>
                <div className="button-wrapper">
                    <button className="change-button" id="left-box" onClick={() => {handleSort(0);}}>Sort Early to Late</button>
                    <button className="change-button" id="right-box" onClick={() => {handleSort(1);}}>Sort Late to Early</button>
                </div>
            </div>
            {
                data && data.map(d => <Task orderNum={orderNum++} id={d.id} taskName={d.taskName} isComplete={d.isComplete} time={d.time} getTaskData={getTaskData}/>)
            }
        </div>
    );
}

export default Feed;