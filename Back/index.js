require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const router = require('./app/router');
const app = express();

const expressJSDocSwagger = require('express-jsdoc-swagger');
const options = {
    info: {
        version: '1.0.0',
        title: 'Arcadian Game Zone',
        description: 'Documentation of the Arcadian Game Zone API'
    },
    filesPattern: '*.js',
    baseDir: './app/router/API/',
    swaggerUIPath: '/api-docs'
};

expressJSDocSwagger(app)(options);

app.use(cors({
    origin: '*',
    credentials: true,
  }));

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(router);

const path = require('path')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../my-app/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../my-app/build/index.html'))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});