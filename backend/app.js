import express from 'express';
import cors from 'cors';

import blogsRoutes from './api/routes/blog-routes.js';
import HttpError from './api/models/http-error.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/blogs', blogsRoutes);
// app.use('/api/v1/users', usersRoutes);

app.use((req, res, next) => {
    throw new HttpError('Not found.', 404);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error has occurred' });
});

export default app;
