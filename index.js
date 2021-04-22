const app = require('./app')
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('PORT') || 5000;

async  function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`);
        })
    } catch (e) {
        console.log('server error ', e.message)
        process.exit();
    }
}

start();


