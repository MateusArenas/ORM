const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const schema = {
    data: [],
    fields: {},
    async define (row, fields) {
        this.fields = fields;
        try {
            const storage = path.resolve(__dirname, '..', 'db', row);

            const files = await fs.promises.readdir(storage);

            this.data = await Promise.all(files?.map(async file => {
                const response = await fs.promises.readFile(path.resolve(storage, file), 'utf8')
                return JSON.parse(response.toString())
            }))

            return this.data;
        } catch (err) {}
    },
    async create (row, data) {
        try {
                
            Object.keys(data)?.forEach(key => {
                if (!Object.keys(this.fields)?.find(fieldKey => fieldKey === key)) {
                    console.log("field error.");
                    throw new Error('all')
                }

                if (!Object.keys(this.fields)?.find(fieldKey => this.fields[fieldKey]?.type(data?.[key]) === data?.[key])) {
                    console.log("type error.");
                    throw new Error('all')
                }
            })

            const local = path.resolve(__dirname, '..', 'db', row);
            
            if (!fs.existsSync(local)) { fs.mkdirSync(local); }
            
            const id = crypto.randomBytes(16).toString("hex");
            
            const jsonContent = JSON.stringify({ _id: id, ...data })
            
            const dir = path.resolve(local, `${id}.json`);

            await fs.promises.writeFile(dir, jsonContent, 'utf8');
            // console.log("JSON file has been saved.");

            this.data.push(JSON.parse(jsonContent))
            
            return JSON.parse(jsonContent)
        } catch (err) {
            console.log("An error occured while writing JSON Object to File.");
            console.log(err);
        }

    },
    async updateById (row, id, data) {
        try {
            Object.keys(data)?.forEach(key => {
                if (!Object.keys(this.fields)?.find(fieldKey => fieldKey === key)) {
                    console.log("field error.");
                    throw new Error('all')
                }

                if (!Object.keys(this.fields)?.find(fieldKey => this.fields[fieldKey]?.type(data?.[key]) === data?.[key])) {
                    console.log("type error.");
                    throw new Error('all')
                }
            })

            const local = path.resolve(__dirname, '..', 'db', row);
            
            if (!fs.existsSync(local)){ fs.mkdirSync(local); }
            
            const dir = path.resolve(local, `${id}.json`);
        
            const response = await fs.promises.readFile(dir, 'utf8');
            
            const old = JSON.parse(response.toString())

            console.log({ old });

            const jsonContent = JSON.stringify({ _id: id, ...old, ...data })

            await fs.promises.writeFile(dir, jsonContent, 'utf8');
            // console.log("JSON file has been saved.");

            this.data = this.data?.map(item => item?._id === id ? JSON.parse(jsonContent) : item )
            
            return JSON.parse(jsonContent)
        } catch (err) {
            console.log("An error occured while writing JSON Object to File.");
            console.log(err);
        }

    },
    async removeById (row, id) {
        const storage = path.resolve(__dirname, '..', 'db', row);
        
        if (!fs.existsSync(storage)){
            fs.mkdirSync(storage);
        }
        
        const dir = path.resolve(storage, `${id}.json`);

        try {
            const response = await fs.promises.readFile(dir, 'utf8');

            await fs.promises.unlink(dir)

            // console.log("JSON file has been removed.");

            this.data = this.data?.filter(item => item?._id !== id)
            
            return JSON.parse(response.toString())
        } catch (err) {
            console.log("An error occured while writing JSON Object to File.");
            console.log(err);
        }

    },
}

module.exports = schema;

// fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });

// fs.readFile('user.json', 'utf-8', (err, data) => {
//     if (err) {
//         throw err;
//     }

//     // parse JSON object
//     const user = JSON.parse(data.toString());

//     // print JSON object
//     console.log(user);
// });