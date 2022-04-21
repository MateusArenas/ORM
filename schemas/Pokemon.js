const { schema, model } = require('../ORM');

const PokemonSchema = schema.define('Pokemon', {
    name: {
        type: String,
        require: true
    }, 
    type: {
        type: String,
        require: true
    }, 
})

module.exports = model('Pokemon', PokemonSchema)