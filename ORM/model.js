const schema = require("./schema");

function model (row, myschema) {
    
    return {
        create: async (data) => {
            const storage = await myschema;
            console.log({ storage });

            return await schema.create(row, data)
        },
        find: async (where) => {
            const storage = await myschema;
            return storage?.filter(item => {
                return Object?.keys(where)
                ?.map(key => item?.[key] === where?.[key])
                ?.reduce((acc, val) => acc&&val, true)
            })
        },
        findOne: async (where) => {
            const storage = await myschema;
            return storage?.find(item => {
                return Object?.keys(where)
                ?.map(key => item?.[key] === where?.[key])
                ?.reduce((acc, val) => acc&&val, true)
            })
        },
        updateById: async (id, data) => await schema.updateById(row, id, data),
        removeById: async (id) => await schema.removeById(row, id),

    }
}

module.exports = model;