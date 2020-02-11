const express = require('express');
const Projects = require('../data/db-helper');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            if(projects.length === 0) {
                res.status(404).json({message: 'No projects were found'})
            } else {
                res.status(200).json(projects);
            }
        })
        .catch(err => res.status(500).json({message: `An internal server error occured: ${err}`}))
})

router.post('/', (req, res) => {
    const newProject = req.body;
    if(!newProject.name) {
        res.status(400).json({message: 'Please provide a name field for the project'});
    } else {
        if(!newProject.completed) {
            newProject.completed = false;
        }
        Projects.addProject(newProject)
            .then(project => {
                res.status(201).json(project);
            })
            .catch(err => res.status(500).json({message: `An internal server error occured. ${err}. Try again later`}))
    }
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Projects.getProjectById(id)
        .then(project => {
            let [foundProject] = project;
            if(!foundProject) {
                res.status(404).json({message: 'Invalid project'});
            } else {
                res.status(200).json(foundProject);
            }
        })
})

module.exports = router;