const express = require('express');
const Resources = require('../data/db-helper');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.getResources()
        .then(resources => {
            if(resources.length === 0) {
                res.status(404).json({message: 'No resources were found'})
            } else {
                res.status(200).json(resources);
            }
        })
        .catch(err => res.status(500).json({message: `An internal server error occured: ${err}`}))
})

router.post('/', (req, res) => {
    const newResource = req.body;
    if(!newResource.name) {
        res.status(400).json({message: 'Please provide a name field for the resource'});
    } else {
        Resources.addResource(newResource)
            .then(resource => {
                res.status(201).json(resource);
            })
            .catch(err => res.status(500).json({message: `An internal server error occured. ${err}. Try again later`}))
    }
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Resources.getResourceById(id)
        .then(resource => {
            let [foundResource] = resource;
            if(!foundResource) {
                res.status(404).json({message: 'Invalid resource'});
            } else {
                res.status(200).json(foundResource);
            }
        })
})

module.exports = router;