const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
require('./db/index');
const UserRouter = require('./routes/UserRouter');
const ProductRouter = require('./routes/ProductRouter');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/products', ProductRouter);

// Serve Swagger UI
app.use(
    '/api/v1/docs',
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: { url: '/swagger.json' }, // URL of the swagger.json file
    })
  );
  

app.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger.json'));
  });

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
