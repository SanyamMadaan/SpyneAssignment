const express=require('express');
require('dotenv').config();
const PORT=process.env.PORT || 3000;
require('./db/index');
const UserRouter=require('./routes/UserRouter');
const ProductRouter=require('./routes/ProductRouter');

const app=express();

app.use(express.json());
app.use('/api/v1/user',UserRouter);
app.use('/api/v1/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`App is listening at http://localhost:${PORT}`);
})