const assert = require('assert'),
    charactersController = require('../src/controllers/charactersController');

describe('Character', () => {
    describe('insert()', () => {
        it('Deve inserir um character', () => {
            let req = {
                body: {
                    "name": "TESTE",
                    "role": "TESTE",
                    "school": "TESTE",
                    "house": "5a05e2b252f721a3cf2ea33f",
                    "patronus": "TESTE"
                }
            }

            charactersController.insert(req).then(retorno => {
                return assert.equal(retorno.status, 'Sucess');
            });
        });
        it('Deve validar os campos do character', () => {
            let req = {
                body: {
                    "name": "",
                    "role": "",
                    "school": "",
                    "house": "",
                    "patronus": ""
                }
            }

            charactersController.insert(req).then(retorno => {
                return assert.equal(retorno.status, 'Error', retorno.message);
            }).catch(error => {
                return assert.equal(error.status, 'Error', error.message);
            });
        });
        it('Deve validar o campo house do character', () => {
            let req = {
                body: {
                    "name": "TESTE",
                    "role": "TESTE",
                    "school": "TESTE",
                    "house": "TESTE",
                    "patronus": "TESTE"
                }
            }

            charactersController.insert(req).then(retorno => {
                return assert.equal(retorno.status, 'Error', retorno.message);
            }).catch(error => {
                return assert.equal(error.status, 'Error', error.message);
            });
        });
    });

    describe('find()', () => {
        it('Deve busca todos os characters', () => {
            let req = {
                query: {
                    house: ""
                }
            };
            charactersController.find(req).then(retorno => {
                return assert.equal(retorno.status, 'Sucess');
            });
        });
        it('Deve busca todos os characters filtrando pela casa', () => {
            let req = {
                query: {
                    house: "5a05e2b252f721a3cf2ea33f"
                }
            };
            charactersController.find(req).then(retorno => {
                return assert.equal(retorno.status, 'Sucess');
            });
        });
    });

    describe('findById()', () => {
        it('Deve busca o character com o id informado', () => {
            let req = {
                params: {
                    id: "1"
                }
            };

            charactersController.findByID(req).then(retorno => {
                return assert.equal(retorno.status, 'Sucess');
            });
        });
    });

    describe('update()', () => {
        it('Deve atualizar um character', () => {
            let req = {
                body: {
                    "name": "TESTE",
                    "role": "TESTE",
                    "school": "TESTE",
                    "house": "5a05e2b252f721a3cf2ea33f",
                    "patronus": "TESTE"
                },
                params: {
                    id: 1
                }
            }

            charactersController.update(req).then(retorno => {
                return assert.equal(retorno.status, 'Sucess');
            });
        });
        it('Deve validar os campos do character a ser atualizado', () => {
            let req = {
                body: {
                    "name": "",
                    "role": "",
                    "school": "",
                    "house": "",
                    "patronus": ""
                },
                params: {
                    id: 1
                }
            }

            charactersController.update(req).then(retorno => {
                return assert.equal(retorno.status, 'Error', retorno.message);
            }).catch(error => {
                return assert.equal(error.status, 'Error', error.message);
            });
        });
        it('Deve validar o campo house do character a ser atualizado', () => {
            let req = {
                body: {
                    "name": "TESTE",
                    "role": "TESTE",
                    "school": "TESTE",
                    "house": "TESTE",
                    "patronus": "TESTE"
                },
                params: {
                    id: 1
                }
            }

            charactersController.update(req).then(retorno => {
                return assert.equal(retorno.status, 'Error', retorno.message);
            }).catch(error => {
                return assert.equal(error.status, 'Error', error.message);
            });
        });
    });

    describe('delete()', () => {
        it('Deve excluir um character', () => {
            let req = {
                params: {
                    id: 1
                }
            }

            charactersController.delete(req).then(retorno => {
                return assert.equal(retorno.status, 'Sucess');
            });
        });

    });
});