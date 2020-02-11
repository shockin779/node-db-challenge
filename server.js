const express = require('express');
const server = express();
const resourcesRouter = require('./resources/resourcesRouter');
const projectsRouter = require('./projects/projectsRouter');
const tasksRouter = require('./tasks/tasksRouter');

server.use(express.json());

server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'API is up and running'});
})

module.exports = server;