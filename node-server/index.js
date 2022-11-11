/* eslint-disable eqeqeq */
const express = require('express')
const port = 3002
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let currId = 5;

//dummy database for simple data stored in this project
let data = [];

app.get('/allTasks', (req, res) => {
    res.send(data);
});

app.get('/unfinishedTasks', (req, res) => {
    let ret = data.filter(d => !d.isComplete)
    res.send(ret);
});

app.post('/sort', (req, res) => {
    if(req.body.sortType == 0) data.sort((a, b) => {
        let keyA = a.time,
        keyB = b.time;
        if(keyA < keyB) return -1;
        if(keyB < keyA) return 1;
        return 0;
    });
    else data.sort((a, b) => {
        let keyA = a.time,
        keyB = b.time;
        if(keyA < keyB) return 1;
        if(keyB < keyA) return -1;
        return 0;
    });
    res.send(data);
});

app.get('/completedTasks', (req, res) => {
    let ret = data.filter(d => d.isComplete)
    res.send(ret);
});

app.post('/addTask', (req, res) => {
    const newTask = {id: currId, taskName: req.body.name, isComplete: false, time: new Date()};
    currId++;
    if(data.length == 0) data = [...data, newTask];
    else{
        for(var j = data.length - 1; j >= 0; j--){
            if(!data[j].isComplete){
                if(j == data.length - 1) data = [...data, newTask];
                else data.splice(j + 1, 0, newTask);
                break;
            } else if(j === 0) data = [newTask, ...data];
        }
    }
    res.send(newTask);
});

app.post('/task/:taskId/toggle', (req, res) => {
    const taskId = req.params.taskId;
    for(var i = 0; i < data.length; i++){
        const d = data[i];
        if(d.id == taskId){
            d.isComplete = req.body.isComplete;
            const element = data.splice(i, 1);
            if(req.body.isComplete === true){
                data = [...data, element[0]];
            } else{
                if (i === 0) data = [element[0], ...data];
                for(var j = i - 1; j >= 0; j--){
                    if(!data[j].isComplete){
                        data.splice(j + 1, 0, element[0]);
                        break;
                    } else if(j === 0) data = [element[0], ...data];
                }
            }
            break;
        }
    }
    res.send(taskId);
});

app.delete('/task/:taskId/delete', (req, res) => {
    const taskId = req.params.taskId;
    for(var i = 0; i < data.length; i++){
        const d = data[i];
        if(d.id == taskId){
            data.splice(i, 1);
            break;
        }
    }
    res.send(taskId);
});

app.listen(port, () => {
  console.log(`Todo List Server listening at http://localhost:${port}`)
})
