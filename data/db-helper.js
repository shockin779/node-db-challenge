const db = require('./db-config');

module.exports = {
    getResources,
    getResourceById,
    getProjects,
    getProjectById,
    getTasks,
    getTaskById,
    addProject,
    addTask,
    addResource,
    getTasksForProject,
    getResourceForProject
};

function getResources() {
    return db('resources');
}

function getResourceById(id) {
    return db('resources').where({id: id})
}

function getProjects() {
    return db('projects');
}

function getProjectById(id) {
    return db('projects').where({id: id})
}

function getTasks() {
    return db('tasks AS t')
        .join('projects AS p', 'p.id', '=', 't.project_id')
        .select('t.id', 't.description AS Task Description', 't.completed', 'p.name AS Project Name', 'p.description AS Project Description');
}

function getTaskById(id) {
    return db('tasks').where({id: id})
}

async function addProject(newProject) {
    const [id] = await db('projects').insert(newProject);

    return getProjectById(id);
}

async function addTask(newTask) {
    const [id] = await db('tasks').insert(newTask);
    return getTaskById(id);
}

async function addResource(newResource) {
    const [id] = await db('resources').insert(newResource);

    return getResourceById(id);
}

function getTasksForProject(projectId) {
    return db('tasks').where({project_id: projectId})
        .select('id', 'description', 'notes', 'completed');
}

function getResourceForProject(projectId) {
    return db('projects_resources AS pr')
        .join('resources AS r', 'pr.resource_id', '=', 'r.id')
        .where({project_id: projectId})
        .select('r.id', 'r.name', 'r.description')
}