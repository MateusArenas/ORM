const { schema, model } = require('../ORM');

const PokemonSchema = schema.define('Pokemon', {
    name: {// name = filed, type = tipo de dado, require = obrigatorio ter o campo
        type: String,
        require: true
    }, 
    type: {
        type: String,
        require: true
    }, 
})

module.exports = model('Pokemon', PokemonSchema)