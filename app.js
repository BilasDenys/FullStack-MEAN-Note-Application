const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes')


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

module.exports = app;
