const Pokemon = require("./schemas/Pokemon");

async function main () {
    // const pokemon = await Pokemon.findOne({ name: 'newtwo' });

    // console.log({ pokemon });

    // const up = await Pokemon.updateById(pokemon?._id, { type: 'eletric' }); 

    await Pokemon.create({ name: 'geneilsom', type: 'power' });

    // await Pokemon.removeById(pokemon?._id);

    // console.log({ pokemon, up })
}

main()