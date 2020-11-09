const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3080;

//Server
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});



