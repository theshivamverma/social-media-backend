const mongoose = require("mongoose")

async function initializeDBConnection(){
    try {
        const response = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        if(response){
            console.log("DB Connected")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { initializeDBConnection }