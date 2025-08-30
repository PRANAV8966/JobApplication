const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./src/config/server-config.js');
const apiRoutes = require('./src/routes/index.js');
console.log(apiRoutes);

const startServer = async () => {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors());

    app.use('/api', apiRoutes);

    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'view', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`server running on PORT: ${PORT}`);
    });
}

startServer();