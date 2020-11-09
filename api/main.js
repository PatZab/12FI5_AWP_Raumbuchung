const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3080;


//Request Logger
app.use(morgan('tiny'));

app.get('/', (req, res, next) => {

});

//Server
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});



