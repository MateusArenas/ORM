module.exports = {
    required(fields, data) {
        return new Promise((resolve, reject) => {
            if (!Object.keys(fields)
                ?.filter(fieldKey => fields[fieldKey]?.require)
                ?.map(fieldKey => Object.keys(data)?.includes(fieldKey))
                ?.reduce((acc, val) => acc&val, true)
            ) {
                reject(new Error("field require."))
            }
            resolve(true)
        })
    }
};
