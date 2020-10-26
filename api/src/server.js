const express = require('express');
const cors = require('cors');
const path = require('path');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./conf/swagger.json');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const charactersRoutes = require('./routes/charactersRoute.js');
app.use('/api/characters', charactersRoutes);

app.listen(3000);