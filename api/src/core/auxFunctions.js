let coreAuxFunction,
    validationJson = require("../conf/validation.json"),
    messageJson = require("../conf/message.json");

/**
 * Valida insert de registro
 * @param {*} jsonToInsert json que enviado para a inserção
 * @param {*} jsonName nome da entidade que estamos incluind
 */
let _validateFields = (jsonToInsert, jsonName) => {
    return new Promise((resolve, reject) => {
        try {
            let arrayJsonToValidate,
                fieldsNotValidate = [];

            switch (jsonName) {
                case "character":
                    arrayJsonToValidate = validationJson.character;
                    break;
            }

            var keys = Object.keys(arrayJsonToValidate);
            for (var i = 0; i < keys.length; i++) {
                if (arrayJsonToValidate[keys[i]] == true) {
                    if (jsonToInsert[keys[i]] == null || !jsonToInsert[keys[i]])
                        fieldsNotValidate.push(keys[i]);
                }
            }

            if (fieldsNotValidate.length > 0)
                resolve(fieldsNotValidate);

            resolve(true);
        } catch (error) {
            reject(false);
        }
    });
}

/**
 * método _getMessage
 * @param {*} operation numéro da operação sendo realizada
 * @param {*} fields campos que estão errados na validação
 * 
 * @returns mensagens obtidas durante o processo
 */
let _getMessage = (operation, fields) => {
    let msg = [],
        message,
        fieldsString = "";

    if (fields) {
        fields.forEach(element => { fieldsString = fieldsString + element + ", " });
        fieldsString = fieldsString.substring(0, fieldsString.length - 2);
        message = messageJson[operation] + " (" + fieldsString + ")";
    } else {
        message = messageJson[operation];
    }

    msg["message"] = message;

    return msg;
}

coreAuxFunction = {
    validateFields: _validateFields,
    getMessage: _getMessage,
}

module.exports = coreAuxFunction;