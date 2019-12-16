var express = require('express');
var tasks = express.Router();

const task = require("../models/Task");

//get all tasks
tasks.get('/tasks', async(req,res) => {
    try {
        var tasks = await task.findAll();
        if(tasks) {
            res.json(tasks)
        }
    }
    catch (err) {
        res.send('error: ' + err)
    }
})

//Add task
tasks.post('/task', async(req, res) => {
    if(!req.body.task_name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        await task.create(req.body)
        .then(() => {
            res.send('Task Added')
        })
        .catch(err => {
            res.send("error: "+ err)
        })
    }
})

// delete task
tasks.delete('/task/:id', async (req, res) => {
    await task.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.send('Task Deleted')
    })
    .catch(err => {
        res.send('Error: ' + err)
    })
})

// update task
tasks.put('/task/:id', async (req, res) => {
    if (!req.body.task_name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        await task.update({
            task_name: req.body.task_name
        },
        {where: { id: req.params.id }}
        )
        .then(() => {
            res.send('Task Update')
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
    }
})
module.exports = tasks