
const mongoose = require("mongoose");

mongoose.connect(process.env.Mongo_Atlas, {
}).then(() => {
    console.log("Connection Succesful");
}).catch((err) => {
    console.log(`${err}`);
});
