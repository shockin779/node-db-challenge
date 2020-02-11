const express = require('express');
const Tasks = require('../data/db-helper');
const router = express.Router();

router.get('/', (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            if(tasks.length === 0) {
                res.status(404).json({message: 'No tasks were found'})
            } else {
                res.status(200).json(tasks);
            }
        })
        .catch(err => res.status(500).json({message: `An internal server error occured: ${err}`}))
})

router.post('/', (req, res) => {
    const newTask = req.body;
    if(!newTask.description || !newTask.project_id) {
        res.status(400).json({message: 'Please provide a description field for the task and a project_id'});
    } else {
        if(!newTask.completed) {
            newTask.completed = false;
        }
        Tasks.getProjectById(newTask.project_id)
            .then(project => {
                if(!project) {
                    res.status(400).json({message: `No project with id ${newTask.project_id} was found. Please supply a valid project id`})
                }
                Tasks.addTask(newTask)
                .then(project => {
                    res.status(201).json(project);
                })
                .catch(err => res.status(500).json({message: `An internal server error occured. ${err}. Try again later`}))
            })
            .catch(err => res.status(500).json({message: `An internal server error occured: ${err}`}))
    }
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Tasks.getTaskById(id)
        .then(task => {
            let [foundTask] = task;
            if(!foundTask) {
                res.status(404).json({message: 'Invalid task'});
            } else {
                res.status(200).json(foundTask);
            }
        })
})

module.exports = router;