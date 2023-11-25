require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
require('./src/DataBase/connection');
const category_route = require('./src/Routes/categoryRoutes')
const product_route = require('./src/Routes/productRoutes')

app.get('/',(req,res)=>{
    res.send("App Running");
});

app.use('/api/category',category_route)
app.use('/api/product',product_route)

app.listen(PORT,()=>{
    console.log(`Server Running at Port ${PORT}`)
});