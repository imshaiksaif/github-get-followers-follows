const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const routes = require('./routes');

require('dotenv').config();

const corsOptions = {
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

//routes
app.use('/', routes);

const notFound = (req, res, next) => {
 res.status(404).json({success: false, msg: "Not Found"})
};

app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
})