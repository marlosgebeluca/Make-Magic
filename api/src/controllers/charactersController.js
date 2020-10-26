const axios = require('axios');

let charactersController,
    core = require('../core/auxFunctions'),
    config = require('../conf/config.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

let _find = (req) => {
    try {
        let house = (req.query.house) ? { house: req.query.house } : '';
        return new Promise((resolve, reject) => {

            if (house) {
                resolve({
                    status: core.getMessage("2").message,
                    characters: db.get('characters').filter(house).value()
                });
            } else {
                resolve({
                    status: core.getMessage("2").message,
                    characters: db.get('characters').value()
                });
            }
        });
    } catch (error) {
        reject({
            status: core.getMessage("1").message,
            message: core.getMessage("204").message
        });
    }
}

let _findByID = (req) => {
    try {
        let filter = { id: req.params.id };

        return new Promise((resolve, reject) => {
            resolve({
                status: core.getMessage("2").message,
                character: db.get('characters').filter(filter).value()
            });
        });
    } catch (error) {
        reject({
            status: core.getMessage("1").message,
            message: core.getMessage("205").message
        });
    }
}

let _insert = (req) => {
    try {
        const character = req.body;
        return new Promise((resolve, reject) => {
            core.validateFields(character, "character").then(validateResponse => {
                if (validateResponse === true) {
                    _isValidHouse(character.house).then(validateHouseResponse => {
                        if (validateHouseResponse === true) {
                            const id = db.get('indexcharacters').map('index').value();
                            const newId = (Number(id) + 1).toString();

                            db.get('indexcharacters')
                                .find()
                                .assign({ index: newId })
                                .write();

                            db.get('characters')
                                .push({ id: newId, ...character })
                                .write();

                            resolve({
                                status: core.getMessage("2").message,
                                message: core.getMessage("200").message
                            });
                        } else {
                            reject({
                                status: core.getMessage("1").message,
                                message: core.getMessage("203").message
                            })
                        }
                    });
                } else {
                    reject({
                        status: core.getMessage("1").message,
                        message: core.getMessage("100", validateResponse).message
                    });
                }
            }).catch(erro => {
                reject({
                    status: core.getMessage("1").message,
                    message: erro.message
                });
            });
        });
    } catch (error) {
        reject({
            status: core.getMessage("1").message,
            message: core.getMessage("206").message
        });
    }
}

let _update = (req) => {
    try {


        let character = req.body;
        let id = req.params.id;

        return new Promise((resolve, reject) => {
            core.validateFields(character, "character").then(validateResponse => {
                if (validateResponse === true) {
                    _isValidHouse(character.house).then(validateHouseResponse => {
                        if (validateHouseResponse === true) {
                            db.get('characters')
                                .find({ "id": id })
                                .assign(character)
                                .write();

                            resolve({
                                status: core.getMessage("2").message,
                                message: core.getMessage("201").message
                            });
                        }
                    });
                } else {
                    reject({
                        status: core.getMessage("1").message,
                        message: core.getMessage("100", validateResponse).message
                    });
                }
            }).catch(erro => {
                reject({
                    status: core.getMessage("1").message,
                    message: erro.message
                });
            });
        });
    } catch (error) {
        reject({
            status: core.getMessage("1").message,
            message: core.getMessage("207").message
        });
    }
}

let _delete = (req) => {
    try {
        var id = req.params.id;
        return new Promise((resolve, reject) => {
            _findByID(req).then(findByIDResponse => {
                if (findByIDResponse.character.length > 0) {
                    db.get('characters')
                        .remove({ "id": id })
                        .write();

                    resolve({
                        status: core.getMessage("2").message,
                        message: core.getMessage("202").message
                    });
                } else {
                    resolve({
                        status: core.getMessage("2").message,
                        message: core.getMessage("209").message
                    });
                }
            }).catch(error => {
                reject({
                    status: core.getMessage("2").message,
                    message: "EITA"
                });
            });
        });
    } catch (error) {
        reject({
            status: core.getMessage("1").message,
            message: core.getMessage("208").message
        });
    }
}

let _isValidHouse = (idHouse) => {
    return new Promise((resolve, reject) => {
        axios.get(config.potterApiUrL + 'houses?key=' + config.potterApiKey)
            .then(function(housesResponse) {
                let houses = housesResponse.data;

                houses.forEach(house => {
                    if (house._id == idHouse) {
                        resolve(true);
                        return;
                    }
                });

                resolve(false);
            }).catch(erro => {
                reject(erro);
            });
    });
}

charactersController = {
    find: _find,
    findByID: _findByID,
    insert: _insert,
    update: _update,
    delete: _delete,
}

module.exports = charactersController;