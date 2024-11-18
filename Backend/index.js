const express=require('express');
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT || 3000;
require('./db/index');
const UserRouter=require('./routes/UserRouter');
const ProductRouter=require('./routes/ProductRouter');
const swaggerUi=require('swagger-ui-express');
const swaggerSpec=require('./swaggerConfig');

const app=express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/user',UserRouter);
app.use('/api/v1/products',ProductRouter);

//set up Swagger UI
app.use('/api/v1/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.listen(PORT,()=>{
    console.log(`App is listening at http://localhost:${PORT}`);
})