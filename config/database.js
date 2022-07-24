const mongoose = require('mongoose');
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
module.exports = async ()=> {
    try {
        await mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`,{
            useNewUrlParser: true,
        });
        console.log("\u001b[" + 34 + "m" + `Connected to Database` + "\u001b[0m");
    } catch (error) {
        console.log(`Database connection error: ${error.message}`)
        process.exit(1);
    }
};