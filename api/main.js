const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter');

const app = express();
const PORT = 3080;

app.use(express.static('../front-app/template'));

app.get("/hallo", (req, res, next) => {
    console.log("NICE")
});

//Request Logger
app.use(morgan('combined'));

//Routers
//api
app.use('/api', apiRouter);

//Server
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});



