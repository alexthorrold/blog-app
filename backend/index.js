import app from './app.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
})
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async (client) => {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    });
