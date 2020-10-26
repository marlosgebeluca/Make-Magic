var express = require('express'),
    router = express.Router(),
    charactersController = require('../controllers/charactersController'),
    core = require('../core/auxFunctions');

router.get('/', (req, res) => {
    charactersController.find(req).then(retorno => {
        res.status(200).send(retorno);
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.get('/:id', (req, res) => {
    charactersController.findByID(req).then(retorno => {
        res.status(200).send(retorno);
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.post('/', (req, res) => {
    charactersController.insert(req).then(retorno => {
        res.status(200).send(retorno);
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.put('/:id', (req, res) => {
    charactersController.update(req).then(retorno => {
        res.status(200).send(retorno);
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.delete('/:id', (req, res) => {
    charactersController.delete(req).then(retorno => {
        res.status(200).send(retorno);
    }).catch(error => {
        res.status(400).send(error);
    });
});

module.exports = router;